import React from 'react'
import alertContext from '../context/AlertContext';
import { useContext } from 'react';
import "../css/alert.css"
const Alert = () => {
    const context = useContext(alertContext);
    const { Alert } = context;

    return (
        <>

            {Alert.toggle && <div className={`alert alert-${Alert.type}`} role="alert">
                <span className="text">{Alert.text}</span>
            </div>}
        </>
    )
}

export default Alert
