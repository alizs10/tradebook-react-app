import { isEmpty, isNull } from 'lodash';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { SyncLoader } from 'react-spinners';

const ActivationCheck = ({ children }) => {

    const user = useSelector(state => state.User);

    const [checking, setChecking] = useState(true);
    const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };

    const navigate = useNavigate()

    useEffect(() => {
        if (isEmpty(user)) return

        var activation = user.email_verified_at;

        if (isNull(activation)) {
            navigate('/panel/profile')
            return
        }
        setChecking(false)

    }, [user])





    return (
        <Fragment>
            {checking ? null : children}
            <div style={style}>
                <SyncLoader color={'#ffffff'} loading={checking} size={15} />
            </div>
        </Fragment>
    );
}

export default ActivationCheck;