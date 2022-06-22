import React from 'react';
import s from "../../CardItem.module.scss";
import {Box, TextField} from "@mui/material";
import MyButton from "../button/MyButton";

const OrderModal = ({style}) => {
    return (
        <div style={style}>
            <div className={s.form__wrapper}>
                <Box
                    component="form"
                >
                    <div>
                        <h3 style={{margin: '20px auto', textAlign: 'center'}}>Оформить заявку</h3>
                        <TextField
                            required
                            label="Имя"
                            defaultValue="Hello World"
                            size="small"
                            style={{width: '100%'}}
                        />
                        <TextField
                            required
                            label="Телефон"
                            defaultValue="+375 (XX) XXX-XX-XX"
                            size="small"
                            style={{margin: '20px auto', width: '100%'}}
                        />
                        <MyButton style={{margin: 'auto'}}>Отправить</MyButton>
                    </div>
                </Box>
            </div>
        </div>
    );
};

export default OrderModal;