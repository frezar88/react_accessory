import './styles/App.scss';
import CardsList from "./components/CardsList";
import React, {useEffect, useState} from "react";
import {getAccessories} from "./axios/requests";
import MyButton from "./components/UI/MyButton";
import MySelect from "./components/UI/MySelect";
import MyModal from "./components/UI/MyModal/MyModal";


function App() {
    const [counterSalle, setCounterSalle] = useState(0)
    const [accData, setAccData] = useState()
    const [selectedSort, setSelectedSort] = useState('');
    const [selectedAcc, setSelectedAcc] = useState([])

    const [modalState, setModalState] = useState(false)

    const [selectBrandStateOptions, setSelectBrandStateOptions] = useState([])
    const [selectModelStateOptions, setSelectModelStateOptions] = useState([])

    const [selectBrandState, setSelectBrandState] = useState()
    const [selectModelState, setSelectModelState] = useState()


    const sortPosts = (sort) => {
        setSelectedSort(sort);
        setAccData([...accData].sort((a, b) => {
            if (sort === 'ascendingPrice') {
                return +a['accessoryPriceProductDiscount'].replace(/\s/g, '') - +b['accessoryPriceProductDiscount'].replace(/\s/g, '');
            } else {
                return +b['accessoryPriceProductDiscount'].replace(/\s/g, '') - +a['accessoryPriceProductDiscount'].replace(/\s/g, '');
            }
        }));
    }


    useEffect(() => {
        let brandSet = new Set()
        let modelSet = new Set()
        getAccessories().then((data) => {
            data.data.data.forEach((el) => {
                brandSet.add(el['brandName'])
                modelSet.add(el['modelName'])
            })
            let arrBrandSet = [...brandSet]
            let arrModelSet = [...modelSet]
            let optionsBrand = []
            let optionsModel = []

            arrBrandSet.forEach((el) => {
                optionsBrand.push({value: el, name: el})
            })

            arrModelSet.forEach((el) => {
                optionsModel.push({value: el, name: el})
            })
            setSelectBrandStateOptions(optionsBrand)
            setSelectModelStateOptions(optionsModel)
            setAccData(data.data.data)
        })
    }, [])


    const collectSelectedAcc = (e) => {
        if (e.target.checked) {
            let obj = {'id': e.target.attributes['id'].value, 'name': e.target.attributes['data-name'].value}
            setSelectedAcc([...selectedAcc, obj])
        } else {
            setSelectedAcc([...selectedAcc].filter(item => item.id !== e.target.attributes['id'].value))
        }
    }

    const changeCounter = (e) => {
        if (e.target.checked) {
            setCounterSalle(counterSalle + 1)
        } else {
            setCounterSalle(counterSalle - 1)
        }
    }

    const clickMyButton = (e) => {
        setModalState(true)
    }

    const formChange = (e) => {
        collectSelectedAcc(e)
        changeCounter(e)
    }


    console.log(accData)
    useEffect(()=>{
        console.log(selectBrandState)
    },[selectBrandState])
    return (
        <div className="App">
            {
                modalState
                    ? <MyModal selectedAcc={selectedAcc} modalState={modalState} setState={setModalState}/>
                    : ''
            }

            <div className="selectGroup"
                 style={{display: "flex", flexWrap: "wrap", alignItems: 'center', justifyContent: 'space-between'}}>
                <div>
                    <MySelect
                        value={selectBrandState}
                        onChange={(value) => setSelectBrandState(value)}
                        defaultValue="Бренд"
                        options={[{'value': 'Все', name: 'Все'}, ...selectBrandStateOptions]}

                    />
                    <MySelect
                        value={selectModelState}
                        onChange={(value) => setSelectModelState(value)}
                        defaultValue="Модель"
                        options={[{'value': 'Все', name: 'Все'}, ...selectModelStateOptions]}
                    />
                    <MySelect
                        value={selectedSort}
                        onChange={sortPosts}
                        defaultValue="Сортировка по"
                        options={[
                            {value: 'ascendingPrice', name: 'По возрастанию цены'},
                            {value: 'descendingPrice', name: 'По убыванию цены'}
                        ]}
                    />
                </div>
                <MyButton style={{
                    display: window.innerWidth < 789 && !counterSalle ? 'none' : 'flex',
                    pointerEvents: counterSalle ? '' : 'none',
                    opacity: counterSalle ? '' : '0.2'
                }} onClick={clickMyButton}>Корзина {counterSalle ? '(' + counterSalle + ')' : ''} </MyButton>
            </div>
            <form onChange={formChange}>
                {
                    accData
                        ? <CardsList
                            data={
                                accData.filter((item) => selectBrandState && selectBrandState!=='Все' ? item['brandName'] === selectBrandState : item)
                                    .filter((item) => selectModelState && selectModelState!=='Все' ? item['modelName'] === selectModelState : item)
                        }
                        />
                        : ''
                }
                <div className={'stupid'}>
                    <h5>Выберите любой из аксессуаров</h5>
                </div>

            </form>
        </div>
    );
}

export default App;
