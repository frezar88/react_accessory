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
    const [cardsEdit, setCardsEdit] = useState();
    const [selectedAcc, setSelectedAcc] = useState([])

    const [modalState, setModalState] = useState(false)




    const sortPosts = (sort) => {
        setSelectedSort(sort);
        setCardsEdit([...accData].sort((a, b) => {
            let discountA = 100 - +Math.round(a['accessoryPriceProductDiscount'].replace(/\s/g, '') / a['accessoryPriceProduct'].replace(/\s/g, '') * 100)
            let discountB = 100 - +Math.round(b['accessoryPriceProductDiscount'].replace(/\s/g, '') / b['accessoryPriceProduct'].replace(/\s/g, '') * 100)
            if (sort === 'ascendingDisc') {
                return discountA - discountB;
            }
            if (sort === 'descendingDisc'){
                return discountB - discountA;
            }
            if (sort === 'ascendingPrice'){
                return +a['accessoryPriceProductDiscount'] - +b['accessoryPriceProductDiscount'];
            }
            if (sort === 'descendingPrice'){
                return +b['accessoryPriceProductDiscount'] - +a['accessoryPriceProductDiscount'];
            }

        }));
    }


    useEffect(() => {
        const url = new URL(window.location.href)
        const model = url.searchParams.get('model')
        const brand = url.searchParams.get('brand')
        getAccessories(model, brand).then((data) => {
            setAccData(data.data['accessories'].sort((a, b) => {
                let discountA = 100 - +Math.round(a['accessoryPriceProductDiscount'].replace(/\s/g, '') / a['accessoryPriceProduct'].replace(/\s/g, '') * 100)
                let discountB = 100 - +Math.round(b['accessoryPriceProductDiscount'].replace(/\s/g, '') / b['accessoryPriceProduct'].replace(/\s/g, '') * 100)
                return discountB - discountA;
            }))
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
        // alert('1')
    }

    const formChange = (e) => {
        collectSelectedAcc(e)
        changeCounter(e)
    }
    return (
        <div className="App">
            <div className="selectGroup"
                 style={{display: "flex", flexWrap: "wrap", alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{
                    display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%',maxWidth:'1520px',
                    margin:'0 auto'
                }} >
                    <div className={'wrapper__for_other'} >
                        <MySelect
                            value={selectedSort}
                            onChange={sortPosts}
                            defaultValue="Сортировка"

                            options={[
                                {value: 'ascendingDisc', name: 'По возрастанию скидки'},
                                {value: 'descendingDisc', name: 'По убыванию скидки'},
                                {value: 'ascendingPrice', name: 'По возрастанию цены'},
                                {value: 'descendingPrice', name: 'По убыванию цены'},
                            ]}
                        />
                        <a  href="/all-brand">Другие акксесуары</a>
                    </div>

                    <MyButton style={{
                        display: window.innerWidth < 789 && !counterSalle ? 'none' : 'flex',
                        pointerEvents: counterSalle ? '' : 'none',
                        opacity: counterSalle ? '' : '0.2'
                    }} onClick={clickMyButton}>Корзина {counterSalle ? '(' + counterSalle + ')' : ''} </MyButton>
                </div>

            </div>
            {
                modalState
                    ? <MyModal selectedAcc={selectedAcc} modalState={modalState} setState={setModalState}/>
                    : ''
            }


            <form className={'form-form'} onChange={formChange}>
                {
                    accData
                        ? <CardsList data={cardsEdit ? cardsEdit : accData}/>
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
