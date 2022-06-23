import React, {useEffect, useState} from 'react';
import {getData} from "./axios/requests";
import './styles/style/style.css'
import CardItem from "./components/CardItem";

const App = () => {
    const [data, setData] = useState()
    useEffect(() => {
        const url = new URL(window.location.href)
        const link = url.searchParams.get('link')
        getData(link).then((data) => {
            setData(data.data['client'])

        })
    }, [])
    return (
        <div>
            <div className={'site'}>
                <header>
                    <div className="container">
                        <h5>Информация пользователя</h5>
                    </div>
                </header>

                <main>
                    <div className="container">
                        <div className="content">
                            <aside className="side-bar">
                                <h4>Информация</h4>
                                {
                                    data
                                        ? <ul>
                                            <li>Имя: <span>{data['full_name']}</span></li>
                                            <li>Телефон: <span>{data['phone']}</span></li>
                                            <li>
                                                Бренд: <span>{data['clientAccessories'][0]['accessory']['brandName']}</span>
                                            </li>
                                            <li>
                                                Модель: <span>{data['clientAccessories'][0]['accessory']['modelName']}</span>
                                            </li>
                                        </ul>
                                        : ''

                                }

                            </aside>
                            <div style={{display:'flex',width:'100%',flexWrap:'wrap'}}>
                                    {
                                        data
                                            ? data['clientAccessories'].map((el) =>
                                            <CardItem
                                                key={el.accessory.accessoryId}
                                                id={el.accessory.accessoryId}
                                                imgURL={el.accessory.accessoryPhoto}
                                                title={el.accessory.accessoryName}
                                                description={el.accessory.accessoryDescription}
                                                priceDiscount={el.accessory.accessoryPriceProductDiscount}
                                                priceProduct={el.accessory.accessoryPriceProduct}
                                                priceWork ={el.accessory.accessoryPriceWork}
                                                priceDiscountWork={el.accessory.accessoryPriceWorkDiscount}
                                                discount={el.accessory.accessoryPriceProduct.replace(/\s/g, '')/el.accessory.accessoryPriceProductDiscount.replace(/\s/g, '')*100}
                                            />

                                            )
                                            : ''

                                    }
                            </div>

                        </div>

                    </div>
                </main>

                <footer>

                </footer>
            </div>
        </div>

    )
        ;
};

export default App;