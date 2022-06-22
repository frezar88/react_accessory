import React from 'react';
import CardItem from "./CardItem";
import classes from './CardsList.module.scss';

const CardsList = ({cards, data}) => {

    return (
        <div className={classes.cards}>{
            data.map(({
                          accessoryId,
                          accessoryPhoto,
                          accessoryName,
                          accessoryDescription,
                          accessoryPriceProductDiscount,
                          accessoryPriceProduct,
                          accessoryPriceWork,
                          accessoryPriceWorkDiscount
                      }) =>
                <CardItem
                    key={accessoryId}
                    id={accessoryId}
                    imgURL={accessoryPhoto}
                    title={accessoryName}
                    description={accessoryDescription}
                    priceDiscount={accessoryPriceProductDiscount}
                    priceProduct={accessoryPriceProduct}
                    priceWork ={accessoryPriceWork}
                    priceDiscountWork={accessoryPriceWorkDiscount}
                    discount={accessoryPriceProduct.replace(/\s/g, '')/accessoryPriceProductDiscount.replace(/\s/g, '')*100}
                />
            )
        }
        </div>
    );
};

export default CardsList;