import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const AdminCheck = ({ children }) => {
    

    const user = useSelector(state => state.User);
    console.log('checked ', user);
    return (
        <Fragment>
            {user.is_admin == 0 ? <Navigate to="/404" /> : children}
        </Fragment>
    );
}

export default AdminCheck;