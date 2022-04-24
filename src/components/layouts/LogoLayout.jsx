import React, { Fragment } from 'react';

const LogoLayout = ({ children }) => {



    return (
        <Fragment>

            <header className="py-2 mx-2 flex justify-end">
                <h1 className="text-xl md:text-4xl text-slate-100">
                    <span className="text-emerald-400">T</span>rade<span className="text-red-400">B</span>ook<span
                        className="text-xxxs text-slate-300">V 1.0.0</span>
                </h1>
            </header>

            <main>

                {children}


            </main>

            <footer className="text-center mt-8">
                <span className="text-xxs text-slate-500">Copyright <i className="fa-regular fa-copyright"></i> 2022</span>
            </footer>
        </Fragment>
    );
}

export default LogoLayout;