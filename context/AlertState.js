import AlertContext from "./AlertContext";
import { useState } from "react";

const AlertState = (props) => {

    const [Alert, setAlert] = useState({
        toggle: false,
        text: "",
        type: ""
    })



    //Show a Alert text
    const showAlert = (textt, type) => {
        setAlert({ toggle: true, text: textt, type: type });
        setTimeout(() => {
            setAlert({ toggle: false });
        }, 1500);
    }


    return (
        <AlertContext.Provider value={{ Alert, showAlert }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;