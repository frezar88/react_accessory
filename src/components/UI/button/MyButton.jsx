import React from 'react';
import s from './MyButton.module.scss';

const MyButton = ({style, children}) => {
    return (
        <div className={s.button} style={style}>{children}</div>
    );
};

export default MyButton;