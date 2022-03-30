import React, { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import Tradebook from './containers/Tradebook';


function App() {

    return (
        <Fragment>
            <Tradebook />
            <ToastContainer />
        </Fragment>
    );
}

export default App;
