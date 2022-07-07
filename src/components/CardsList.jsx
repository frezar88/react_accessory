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
                      },index) =>
                <CardItem
                    // key={accessoryId.replaceAll('`')}
                    key={index}
                    index={index}
                    id={accessoryId}
                    imgURL={accessoryPhoto}
                    title={accessoryName}
                    description={accessoryDescription}
                    priceDiscount={accessoryPriceProductDiscount}
                    priceProduct={accessoryPriceProduct}
                    priceWork ={accessoryPriceWork}
                    priceDiscountWork={accessoryPriceWorkDiscount}
                    discount={Math.round(accessoryPriceProductDiscount.replace(/\s/g, '')/ accessoryPriceProduct.replace(/\s/g, '')*100)}
                />
            )
        }
        </div>
    );
};

export default CardsList;