import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const PanelAbout = () => {
    return (
        <Fragment>

            <Helmet>
                <title>درباره ما - تریدبوک</title>
            </Helmet>
            <div className="mr-2 mt-4">
                <h2 className="text-slate-300 text-lg">درباره ما</h2>
            </div>

            <div className="mt-4 mx-2 text-sm text-slate-300 text-justify bg-slate-700 rounded-lg">
                <p className="p-2 leading-7">
                    ایده ی وب اپلیکیشن تریدبوک ابتدا در سال ۱۳۹۹ به ذهن من رسید و در نهایت یک سال بعد موفق به طراحی و توسعه ی آن شدم.
                </p>
            </div>

            <div className="mr-2 mt-4">
                <h2 className="text-slate-300 text-lg">راه های ارتباطی</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mx-2 mt-4">
                <a href="https://t.me/alizs10" target="_blank"
                    className="col-span-1 rounded-lg border-2 border-blue-400  text-blue-400  p-4 text-center text-lg">Telegram
                    <i className="fa-brands fa-telegram text-2xl mr-1"></i>
                </a>
                <a href="https://instagram.com/alizs10" target="_blank"
                    className="col-span-1 rounded-lg border-2 border-pink-600  text-pink-600  p-4 text-center text-lg">Instagram
                    <i className="fa-brands fa-instagram text-2xl mr-1"></i>
                </a>
                <a href="https://wa.me/09392983010" target="_blank"
                    className="col-span-1 rounded-lg border-2 border-green-400 text-green-400  p-4 text-center text-lg">Whatsapp
                    <i className="fa-brands fa-whatsapp text-2xl mr-1"></i></a>
                <a href="mailto:alizswork@gmail.com" target="_blank"
                    className="col-span-1 rounded-lg border-2 border-red-600  text-red-600  p-4 text-center text-lg">Gmail
                    <i className="fa-brands fa-google text-2xl mr-1"></i></a>
            </div>

        </Fragment>
    );
}

export default PanelAbout;