import React from 'react';
import s from './CardItem.module.scss';
import MyButton from "./UI/MyButton";

const CardItem = ({imgURL, title, description, price1, price2, discount}) => {
    return (
        <div className={s.card}>
            <div className={s.card__wrapper}>
                <div className={s.card__discount}>-{100-discount}%</div>

                <div className={s.card__img}>
                    <img src={imgURL} alt=""/>
                </div>
                <h4 className={s.card__title}>{title}</h4>

                <div className={s.card__bottom}>
                    <p className={s.card__price}>
                        <span className={s.card__price_new}>{price1} BYN</span>
                        <span className={s.card__price_old}>{price2} BYN</span>
                    </p>
                    <MyButton/>
                </div>
            </div>
        </div>
    );
};

export default CardItem;