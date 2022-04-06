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
                <p className="p-2 leading-7">من علی سلیمانی هستم، طراح و برنامه نویس وب. در حقیقت اپلیکیشن تریدبوک ابتدا
                    برای استفاده شخصی
                    طراحی شد و هدفی برای انتشار رسمی و عمومی آن وجود نداشت. اما با گذشت زمان و اضافه شدن امکانات دیگر،
                    بنظرم آمد که میتواند برای همه تریدرها مفید واقع شود. پس برآن شدم که نسخه ای عمومی طراحی کنم و به
                    انتشار برسانم. تریدبوک چندین بار طراحی و بازنویسی شده و حاصل ماه ها تلاش و تجربه است. اما هنوز بر
                    این باورم که در ابتدای مسیر خودش است. اهداف بسیار بزرگتری درنظر دارم و بدنبال تغییر و تحولات
                    اساسی در برآیند معاملات تریدرها هستم. لطفا نظرات، پیشنهادات و مشکلات خود را از طریق راه های ارتباطی
                    زیر، برای من ارسال کنید. صمیمانه از همکاری شما سپاسگزارم</p>
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