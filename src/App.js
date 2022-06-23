import React, {useEffect, useState} from 'react';
import './styles/style/style.css'
import {Button} from "@mui/material";
import s from './App.module.scss'
import {getData} from "./axios/requests";
import TouchAppIcon from '@mui/icons-material/TouchApp';


const App = () => {
    const [brand, setBrand] = useState()
    const [model, setModel] = useState()

    const [data, setData] = useState([])

    const [brandData, setBrandData] = useState([])
    const [modelData, setModelData] = useState([])
    const [generate,setGenerate]=useState(false)

    const changeBrand = (e) => {
        setBrand(e.target['value'])
    }
    const changeModel = (e) => {
        setModel(e.target['value'])
    }

    useEffect(() => {
        getData().then((data) => {
            let brandSet = new Set()
            data.data.data.forEach((el) => {
                brandSet.add(el['brandName'])
            })
            setBrandData([...brandSet])
            setData(data.data.data)
        })
    }, [])

    useEffect(() => {
        setModel('')
        let modelSet = new Set()
        data.forEach((el) => {
            if (el['brandName'] === brand) {
                modelSet.add(el['modelName'])
            }
        })
        setModelData([...modelSet])
    }, [brand])

    useEffect(()=>{
        setGenerate(false)
    },[brand,model])

    return (

        <div className={'site'}>
            <header>
                <div className="container">
                    <h5>Формирование ссылок</h5>
                </div>
            </header>
            <div className={s.block}>
                <main>
                    <div className="container">
                        <div className="content">
                            <aside className="side-bar">
                                <h4>Генератор ссылок</h4>
                                <ul>
                                    <li>Бренд:
                                        <select onChange={changeBrand} value={brand} className="form-select"
                                                aria-label="Default select example">
                                            <option disabled={true} selected></option>
                                            {brandData.map((el) => <option key={el} value={el}>{el}</option>)}
                                        </select>
                                    </li>
                                    {
                                        brand
                                            ? <li>Модель:
                                                <select onChange={changeModel} value={model} className="form-select"
                                                        aria-label="Default select example">
                                                    <option disabled={true} selected></option>
                                                    {modelData.map((el) => <option key={el} value={el}>{el}</option>)}
                                                </select>
                                            </li>
                                            : ''
                                    }

                                </ul>
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <Button
                                        onClick={()=>{
                                            setGenerate(true)
                                        }
                                        }
                                        style={{width: '100%'}} variant={'contained'}>Создать ссылку</Button>
                                </div>

                            </aside>
                            <div className={'main'} style={{width: '100%',position:'relative'}}>
                                {brand && model && generate
                                    ? <h2 style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    fontSize: 15,
                                    textAlign: 'start',
                                    fontWeight: 'bold',
                                    padding: '10px',
                                    boxShadow: '3px 3px 5px 3px #00000052'
                                }}>
                                    <div>
                                        Ваша ссылка:
                                        <span>
                                                <a style={{fontSize: 20, color: 'red'}}
                                                   href={`https://aks.aps.by/?brand=${brand}&model=${model}`}
                                                >
                                                    {`  https://aks.aps.by/?brand=${brand}&model=${model}`}
                                                </a>
                                    </span>
                                    </div>
                                    <a href={`https://aks.aps.by/?brand=${brand}&model=${model}`}>
                                        <div className={s.finger}>
                                            <TouchAppIcon fontSize={'large'} style={{color:'#000'}}/>
                                        </div>

                                        <button
                                            style={{
                                            background:'#712cf9',
                                            padding:'10px 20px',
                                            color:'#fff',
                                            fontWeight:'bold',
                                            borderRadius:'5px'
                                        }}>Перейти</button>
                                    </a>

                                </h2> : ''}

                            </div>

                        </div>

                    </div>
                </main>


            </div>
            <footer>

            </footer>
        </div>


    );
};

export default App;