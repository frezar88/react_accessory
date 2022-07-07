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

    const [getParams, setGetParams] = useState({brand: '', model: ''})

    const [defaultModelOptions, setDefaultModelOptions] = useState([])


    const sortPosts = (sort) => {
        setSelectedSort(sort);
        setAccData([...accData].sort((a, b) => {
            let discountA = 100 - +Math.round(a['accessoryPriceProductDiscount'].replace(/\s/g, '') / a['accessoryPriceProduct'].replace(/\s/g, '') * 100)
            let discountB = 100 - +Math.round(b['accessoryPriceProductDiscount'].replace(/\s/g, '') / b['accessoryPriceProduct'].replace(/\s/g, '') * 100)
            if (sort === 'ascendingPrice') {

                return discountA - discountB;
            } else {
                return discountB - discountA;
            }
        }));
    }
    useEffect(() => {
        const url = new URL(window.location.href)
        const model = url.searchParams.get('model')
        const brand = url.searchParams.get('brand')

        setGetParams({'model': model, 'brand': brand})


        let brandSet = new Set()
        getAccessories().then((data) => {
            let defaultModelSet = new Set()
            let modelOpt =[]
            if (brand) {
                data.data.data.filter((item) => item.brandName.toLowerCase() === brand.toLowerCase())
                    .forEach((el) => {
                        defaultModelSet.add(el['modelName'])
                    })
                let defaultModelArr = [...defaultModelSet]
                defaultModelArr.forEach((el)=>{
                    modelOpt.push({value: el, name: el})
                })
                setDefaultModelOptions(modelOpt)
            }

            data.data.data.forEach((el) => {
                brandSet.add(el['brandName'])
            })
            let arrBrandSet = [...brandSet]
            let optionsBrand = []
            arrBrandSet.forEach((el) => {
                optionsBrand.push({value: el, name: el})
            })
            setSelectBrandStateOptions(optionsBrand)
            setAccData(data.data.data.sort((a, b) => {
                    let discountA = 100 - +Math.round(a['accessoryPriceProductDiscount'].replace(/\s/g, '') / a['accessoryPriceProduct'].replace(/\s/g, '') * 100)
                    let discountB = 100 - +Math.round(b['accessoryPriceProductDiscount'].replace(/\s/g, '') / b['accessoryPriceProduct'].replace(/\s/g, '') * 100)
                    return discountB - discountA;
                })
            )
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


    useEffect(() => {
        let currentModelSet = new Set()
        setSelectModelState('')
        if (accData) {
            accData.filter((item) => selectBrandState && selectBrandState !== 'Все' ? item['brandName'] === selectBrandState : item).forEach((el) => {
                currentModelSet.add(el['modelName'])
            })
            let arrModelSet = [...currentModelSet]
            let arrSelectModalOptions = []
            arrModelSet.forEach((el) => {
                arrSelectModalOptions.push({value: el, name: el})
            })
            setSelectModelStateOptions(arrSelectModalOptions)
        }


    }, [selectBrandState])
    return (
        <div className="App">
            {
                modalState
                    ? <MyModal selectedAcc={selectedAcc} modalState={modalState} setState={setModalState}/>
                    : ''
            }
            <div className="selectGroup"
                 style={{display: "flex", flexWrap: "wrap", alignItems: 'center', justifyContent: 'space-between'}}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        maxWidth: '1520px',
                        margin: '0 auto'
                    }}
                >
                    <div className={'wwrapper'}>
                        <MySelect
                            value={selectBrandState}
                            onChange={(value) => {
                                setGetParams({'model': '', 'brand': ''})
                                setSelectBrandState(value)
                            }}
                            defaultValue={getParams['brand'] ? getParams['brand'][0].toUpperCase() + getParams['brand'].slice(1) : 'Бренд'}
                            options={[{'value': 'Все', name: 'Все'}, ...selectBrandStateOptions]}

                        />
                        {
                             selectBrandState !== 'Все' || getParams['brand']
                                ? <MySelect
                                    value={selectModelState}
                                    onChange={(value) => {
                                        setGetParams({'model': '', 'brand': ''})
                                        setSelectModelState(value)
                                    }}
                                    defaultValue="Модель"
                                    options={defaultModelOptions[0] && !selectModelStateOptions[0] ?defaultModelOptions: [{'value': 'Все', name: 'Все'}, ...selectModelStateOptions]}
                                />
                                : ''

                        }

                        <MySelect
                            value={selectedSort}
                            onChange={sortPosts}
                            defaultValue="Сортировка "
                            options={[
                                {value: 'ascendingPrice', name: 'По возрастанию скидки'},
                                {value: 'descendingPrice', name: 'По убыванию скидки'}
                            ]}
                        />
                    </div>
                    <MyButton style={{
                        display: window.innerWidth < 789 && !counterSalle ? 'none' : 'flex',
                        pointerEvents: counterSalle ? '' : 'none',
                        opacity: counterSalle ? '' : '0.2'
                    }} onClick={clickMyButton}>Корзина {counterSalle ? '(' + counterSalle + ')' : ''} </MyButton>
                </div>

            </div>
            <form className={'form-form'} onChange={formChange}>
                {
                    accData
                        ? <CardsList
                            data={
                                accData.filter((item) => selectBrandState && selectBrandState !== 'Все' ? item['brandName'] === selectBrandState : item)
                                    .filter((item) => selectModelState && selectModelState !== 'Все' ? item['modelName'] === selectModelState : item)
                                    .filter((item) => getParams['model'] ? item['modelName'].toLowerCase() === getParams['model'].toLowerCase() : item)
                                    .filter((item) => getParams['brand'] ? item['brandName'].toLowerCase() === getParams['brand'].toLowerCase() : item)
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
