import { isEmpty, isNull } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { SyncLoader } from 'react-spinners';

const ActivationCheck = ({ children }) => {

    const user = useSelector(state => state.User);

    return (
        <Fragment>
            {user.status === 0 ? <Navigate to="/panel/" /> : children}
        </Fragment>
    );
}

export default ActivationCheck;