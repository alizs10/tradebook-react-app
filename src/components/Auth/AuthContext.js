import React, { useState } from 'react';


export const AuthData = React.createContext({
    email : "",
    setEmail : () => { },
    password : "",
    setPassword : () => { }
});