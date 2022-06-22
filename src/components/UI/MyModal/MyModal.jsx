import React, {useState} from 'react';
import s from './MyModal.module.scss'
import CloseIcon from '@mui/icons-material/Close';
import {Button, CircularProgress, TextField} from "@mui/material";
import InputMask from 'react-input-mask'
import {sendDataToBack} from "../../../axios/requests";

const MyModal = ({setState, selectedAcc,}) => {
    const [spinner, setSpinner] = useState(false)

    const closeModal = (e) => {
        if (e.target.attributes['data-name']) {
            setState(false)
        }
    }
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('_')

    const [messageSend, setMessageSend] = useState(false)

    const inputName = (e) => {
        setName(e.target['value'])
    }
    const inputPhone = (e) => {
        setPhone(e.target.value)
    }
    const sendData = () => {
        setSpinner(true)
        let accessories_id = []
        selectedAcc.forEach(({id}) => {
            accessories_id.push(id)
        })
        let data = {
            "full_name": name,
            "phone": phone,
            "accessories": accessories_id
        }

        sendDataToBack(data).then((data) => {
            setSpinner(false)
            if (data) {
                if (data.status === 200) {
                    setMessageSend(true)

                }
            }
        })
    }
    return (
        <div data-name={'modal'} onClick={closeModal} className={[s.modal].join(' ')}>
            {
                messageSend
                    ? <div className={s.messageSend}>
                        <h5> Сообщение отправлено</h5>
                        <button onClick={()=>{
                            setMessageSend(false)
                            setState(false)
                        }}>OK</button>
                    </div>
                    : ''
            }

            {
                !messageSend
                    ? <div className={s.modal__content}>
                        <div>
                            <div className={s.modal__close}>
                                <div>
                                    <h5>Корзина</h5>
                                </div>
                                <button onClick={() => setState(false)}>
                                    <CloseIcon fontSize={"large"}/>
                                </button>
                            </div>
                            <div className={s.modal__selected}>
                                <ul>
                                    {selectedAcc.map(({id, name}, index) =>
                                        <li key={id}>
                                            <div>
                                                <span>{index + 1}.</span> {name}
                                            </div>
                                            <div className={s.remove}>
                                                {/*<RemoveCircleIcon style={{color:'#dc2626'}} />*/}
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <form className={s.modal__form}>
                                <div>
                                    <TextField
                                        id="name"
                                        color={name.length > 2 ? 'success' : "error"}
                                        size={"small"}
                                        label="ФИО"
                                        variant="outlined"
                                        value={name}
                                        onInput={inputName}
                                    />
                                    <InputMask
                                        mask="+375 99 999 99 99"
                                        value={phone}
                                        onChange={inputPhone}
                                    >
                                        {() => <TextField
                                            label="Телефон"
                                            size={"small"}
                                            color={phone.indexOf('_') === -1 ? 'success' : "error"}
                                        />}
                                    </InputMask>
                                </div>
                                <Button
                                    onClick={sendData}
                                    type={"button"}
                                    variant={"contained"}
                                    style={{
                                        background: name.length > 2 && phone.indexOf('_') === -1 ? 'green' : 'gray',
                                        pointerEvents: name.length > 2 && phone.indexOf('_') === -1 ? 'unset' : 'none',
                                        opacity: name.length > 2 && phone.indexOf('_') === -1 ? '1' : '0.4'
                                    }}
                                >
                                    {
                                        spinner ? <CircularProgress fontSize={"large"} style={{
                                            color: '#fff',
                                            width: 20,
                                            height: 20
                                        }}/> : 'Заказать'
                                    }

                                </Button>
                            </form>
                        </div>


                    </div>
                    : ''

            }
        </div>
    );
};

export default MyModal;