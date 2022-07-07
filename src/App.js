import React, {useEffect} from 'react';
import s from './App.module.scss'
import {getAccessories} from "./axios/requests";

const App = () => {
    useEffect(()=>{
        getAccessories().then((data)=>{
            console.log(data)
        })
    },[])
    return (
        <div className={s.App}>
        <header >
            <div className={s.container}>
                fds
            </div>
        </header>
        </div>
    );
};

export default App;