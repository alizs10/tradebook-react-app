import { isNull } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const ActivationCheck = ({ children }) => {

    const user = useSelector(state => state.User);
    const [navigateTo, setNavigateTo] = useState(null)

    useEffect(() => {
      
        let unmounted = false;

        if (!unmounted) {
            if (user.status == 0) {
                setNavigateTo("/panel/")
             } else if (isNull(user.email_verified_at)) {
                 setNavigateTo("/panel/profile")
             }
     
        }

        return () => {
            unmounted = true;
        }
    }, [])
    

    return (
        <Fragment>
            {!isNull(navigateTo) ? <Navigate to={navigateTo} /> : children}
        </Fragment>
    );
}

export default ActivationCheck;