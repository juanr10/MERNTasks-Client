import React, {useState, useEffect, useContext, Fragment} from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import alertContext from '../../context/alerts/alertContext';

/* SweetAlert's compatibility with React */
const MySwal = withReactContent(Swal);

/* Alert style from SweetAlert2: Toast */
const mixinType = MySwal.mixin({
    toast: true,
    position: 'top-end',
    customClass: 'alert-font-size',
    width:'35rem',
    padding:'1rem',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', MySwal.stopTimer)
        toast.addEventListener('mouseleave', MySwal.resumeTimer)
    }
});


const Alert = () => {
    //Get state from 'AlertState.js'
    const alertsContext = useContext(alertContext);
    const { alert } = alertsContext;

    const [sweetAlert, saveSweetAlert] = useState({
        message: '',
        category: ''
    });

    const [activated, saveActivated] = useState(false);
    
    
    useEffect(() => {
        if(!alert){
            return null;
        }else{
            saveSweetAlert({
                message: alert.msg,
                category: alert.category
            });       
            //Flag
            saveActivated(true);
        }
    }, [alert]);


    /**
     * @name:showSweetAlert.
     * @description:select alert type.
     * @param:sweetAlert object with a message & category.
    */
    const showSweetAlert = (sweetAlert) => {
        switch (sweetAlert.category) {
            case 'alert-error':
                mixinType.fire({
                    icon: 'error',
                    title: '<span>'+sweetAlert.message+'</span>'
                });
                //Preventing re-run
                saveActivated(false);
            break;

            case 'alert-success':
                mixinType.fire({
                    icon: 'success',
                    title: '<span>'+sweetAlert.message+'</span>'
                });

                saveActivated(false);
            break;
        
            default:
                break;
        }
    }

    //If there's an alert, show it
    if(activated) showSweetAlert(sweetAlert);

    return (<Fragment></Fragment>);
};

export default Alert;