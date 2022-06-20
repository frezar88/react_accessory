import React from 'react';
import CardItem from "./CardItem";
import classes from './CardsList.module.scss';

const CardsList = ({cards}) => {

    return (
        <div className={classes.cards}>{
            cards.map(card =>
                <CardItem key={card.accessoryId} imgURL={card.accessoryPhoto} title={card.accessoryName}
                          description={card.accessoryDescription} price1={card.accessoryPriceProductDiscount}
                          price2={card.accessoryPriceProduct}
                          discount={Math.round(card.accessoryPriceProductDiscount/card.accessoryPriceProduct*100)}/>
            )
        }
        </div>
    );
};

export default CardsList;