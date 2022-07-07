import React, {useState} from 'react';
import s from './CardItem.module.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import no_img from '../images/no_photo.png'

const CardItem = ({
                      id,
                      imgURL,
                      title,
                      description,
                      priceProduct,
                      priceDiscount,
                      discount,
                      priceDiscountWork,
                      priceWork,
                      index,
                  }) => {
    const [checkBoxState, setCheckBoxState] = useState(false);
    const [imgError, setImgError] = useState(false)
    return (
        <div className={s.card}>
            <label htmlFor={index}>

                <div className={[s.card__wrapper, checkBoxState ? s.active : ''].join(' ')}>
                    {
                        checkBoxState
                            ? <CheckCircleIcon fontSize={"large"} style={{
                                color: "#dc2626",
                                position: 'absolute',
                                zIndex: 1,
                            }}/>
                            : ''
                    }

                    <input value={checkBoxState} data-name={title} onChange={(e) => setCheckBoxState(e.target.checked)}
                           type={'checkbox'}
                           id={index}/>
                    <div style={{opacity: 100 - discount <= 0 ? 0 : 1}}
                         className={s.card__discount}>-{100 - discount}%
                    </div>

                    <div className={s.card__img}>
                        <img
                            onError={(e) => {
                                if (e.type === 'error') {
                                    setImgError(true)
                                }
                            }}
                            // src={imgError ? no_img: 'https://aks.aps.by/img/' + imgURL} alt="#"
                            src={imgError ? no_img : '/img/' + imgURL} alt="#"
                        />
                        {/*<img src={imgError ? no_img:'/img/'+ imgURL} alt=""/>*/}
                    </div>
                    <h4 className={s.card__title}>{title}</h4>

                    <div className={s.card__bottom}>
                        <div className={s.card__price}>
                            <div>
                                <p> цена товара</p>
                                <div className={s.price_wrapper}>
                                    <span className={s.card__price_new}>{priceDiscount} BYN</span>
                                    <span style={{opacity: priceDiscount === priceProduct ? 0 : 1}}
                                          className={s.card__price_old}>{priceProduct} BYN</span>
                                </div>

                            </div>
                            <div className={s.card__install}>
                                <p> цена c установкой</p>
                                <div
                                    style={{
                                        justifyContent: priceDiscountWork === priceWork ? "center" : "",

                                    }}
                                    className={s.price_wrapper}>
                                    <span

                                        className={s.card__price_new}>
                                        {String(+(priceDiscount.replace(/\s/g, '')) + +(priceDiscountWork.replace(/\s/g, ''))).replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ')} BYN
                                    </span>
                                    <span
                                        style={{
                                            display: priceDiscountWork === priceWork ? "none" : "block",

                                        }}
                                        className={s.card__price_old}>
                                        {String(+(priceProduct.replace(/\s/g, '')) + +(priceWork.replace(/\s/g, ''))).replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ')} BYN
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className={[s.in_bucket, checkBoxState ? s.active : ''].join(' ')}>
                        <i type={'button'}>{checkBoxState ? 'Добавлено' : 'В корзину'}</i>
                    </div>
                </div>
            </label>
        </div>

    );
};

export default CardItem;