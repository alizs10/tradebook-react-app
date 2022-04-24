import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const NotFound404 = () => {

    let svg404 = require("./404.svg")
    return (
        <Fragment>
            <section className="flex flex-col-reverse gap-x-8 justify-center items-center md:flex-row gap-y-8 mt-4 md:mt-10">

                <div className="flex flex-col gap-y-8 justify-center text-center">
                    <h1 className="text-2xl md:text-4xl text-slate-300">
                        صفحه پیدا نشد :(
                    </h1>
                    <Link to={"/panel/"} className="px-4 py-2 rounded-lg border-2 border-emerald-400 text-emerald-400 flex justify-center md:inline-block md:w-fit text-center">برو به خانه</Link>
                </div>
                <img src={svg404.default} alt="404 - not found" className="w-full md:w-1/2"/>

            </section>
        </Fragment>
    );
}

export default NotFound404;