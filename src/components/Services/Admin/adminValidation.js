import validator from "validator";

export const pairValidation = payload => {
    const errors = {};
    let isFormValid = true;

    if (validator.isEmpty(payload.name)) {
        isFormValid = false;
        errors.name = "نام جفت ارز الزامی می باشد";
    } else if (!validator.isLength(payload.name, { min: 1, max: 90 })) {
        isFormValid = false;
        errors.name = "نام جفت ارز نمی تواند کمتر از 1 و بیشتر از 90 حرف باشد";
    }

    if (validator.isEmpty(payload.status)) {
        isFormValid = false;
        errors.status = "وضعیت جفت ارز الزامی می باشد";
    } else if (!validator.isIn(payload.status, [0, 1])) {
        isFormValid = false;
        errors.status = "وضعیت جفت ارز باید از بین فعال و غیرفعال انتخاب شود";
    }

    if (validator.isEmpty(payload.type)) {
        isFormValid = false;
        errors.type = "نوع جفت ارز الزامی می باشد";
    } else if (!validator.isIn(payload.type, [0, 1])) {
        isFormValid = false;
        errors.type = "نوع جفت ارز باید از بین کریپتوکارنسی و فارکس انتخاب شود";
    }

    return {
        success: isFormValid,
        errors
    };
};

export const discountValidation = payload => {
    const errors = {};
    let isFormValid = true;
    let attribute = "کد تخفیف";

    if (validator.isEmpty(payload.code)) {
        isFormValid = false;
        errors.code = `${attribute} الزامی می باشد`;
    } else if (!validator.isLength(payload.code, { min: 1, max: 90 })) {
        isFormValid = false;
        errors.code = `${attribute} نمی تواند کمتر از 1 و بیشتر از 90 حرف باشد`;
    }

    if (validator.isEmpty(payload.value)) {
        isFormValid = false;
        errors.value = `مقدار ${attribute} الزامی می باشد`;
    } else if (!validator.isInt(payload.value, { min: 1, max: 100 })) {
        isFormValid = false;
        errors.value = `مقدار ${attribute} باید بین 1 تا 100 باشد`;
    }

    if (validator.isEmpty(payload.status)) {
        isFormValid = false;
        errors.status = `وضعیت ${attribute} الزامی می باشد`;
    } else if (!validator.isIn(payload.status, [0, 1])) {
        isFormValid = false;
        errors.status = `وضعیت ${attribute} باید از بین فعال و غیرفعال انتخاب شود`;
    }

    if (!validator.isEmpty(payload.user_id) && !validator.isInt(payload.user_id)) {
        isFormValid = false;
        errors.user_id = "کاربر انتخاب شده، صحیح نمی باشد";
    }

    if (!validator.isEmpty(payload.plan_id) && !validator.isInt(payload.plan_id)) {
        isFormValid = false;
        errors.plan_id = "اشتراک انتخاب شده، صحیح نمی باشد";
    }

    if (!validator.isEmpty(payload.exp_date) && !validator.isDate(payload.exp_date)) {
        isFormValid = false;
        errors.exp_date = "تاریخ انقضا صحیح نمی باشد";
    }


    return {
        success: isFormValid,
        errors
    };
};

export const orderValidation = payload => {
    const errors = {};
    let isFormValid = true;

    if (validator.isEmpty(payload.user_id)) {
        isFormValid = false;
        errors.user_id = "انتخاب کاربر الزامی می باشد";
    } else if (!validator.isInt(payload.user_id)) {
        isFormValid = false;
        errors.user_id = "کاربر انتخاب شده، صحیح نمی باشد";
    }

    if (validator.isEmpty(payload.plan_id)) {
        isFormValid = false;
        errors.plan_id = "انتخاب اشتراک الزامی می باشد";
    } else if (!validator.isInt(payload.plan_id)) {
        isFormValid = false;
        errors.plan_id = "اشتراک انتخاب شده، صحیح نمی باشد";
    }

    if (validator.isEmpty(payload.order_date)) {
        isFormValid = false;
        errors.order_date = "تاریخ ثبت سفارش الزامی می باشد";
    } else if (!validator.isDate(payload.order_date)) {
        isFormValid = false;
        errors.order_date = "تاریخ ثبت سفارش صحیح نمی باشد";
    }

    if (!validator.isEmpty(payload.discount_code) && !validator.isLength(payload.discount_code, { min: 1, max: 90 })) {
        isFormValid = false;
        errors.discount_code = `;کد تخفیف نمی تواند کمتر از 1 و بیشتر از 90 حرف باشد`;
    }

    return {
        success: isFormValid,
        errors
    };
};

export const paymentValidation = payload => {
    const errors = {};
    let isFormValid = true;
    let attribute = "پرداخت";

    if (validator.isEmpty(payload.order_id)) {
        isFormValid = false;
        errors.order_id = `انتخاب سفارش الزامی می باشد`;
    } else if (!validator.isInt(payload.order_id)) {
        isFormValid = false;
        errors.order_id = "سفارش انتخاب شده، صحیح نمی باشد";
    }

    if (validator.isEmpty(payload.transaction_id)) {
        isFormValid = false;
        errors.transaction_id = `کد ${attribute} الزامی می باشد`;
    } else if (!validator.isLength(payload.transaction_id, { min: 1, max: 90 })) {
        isFormValid = false;
        errors.transaction_id = `کد ${attribute} نمی تواند کمتر از 1 و بیشتر از 90 حرف باشد`;
    }

    if (validator.isEmpty(payload.payment_date)) {
        isFormValid = false;
        errors.payment_date = `تاریخ ${attribute} الزامی می باشد`;
    } else if (!validator.isDate(payload.payment_date)) {
        isFormValid = false;
        errors.payment_date = `تاریخ ${attribute} صحیح نمی باشد`;
    }

    if (validator.isEmpty(payload.status)) {
        isFormValid = false;
        errors.status = `وضعیت ${attribute} الزامی می باشد`;
    } else if (!validator.isIn(payload.status, [0, 1])) {
        isFormValid = false;
        errors.status = `وضعیت ${attribute} باید از بین پرداخت شده و پرداخت نشده انتخاب شود`;
    }

    if (validator.isEmpty(payload.type)) {
        isFormValid = false;
        errors.type = `نوع ${attribute} الزامی می باشد`;
    } else if (!validator.isIn(payload.type, [0, 1])) {
        isFormValid = false;
        errors.type = `نوع ${attribute} باید از بین آنلاین و کارت به کارت انتخاب شود`;
    }

    return {
        success: isFormValid,
        errors
    };
};

export const planValidation = payload => {
    const errors = {};
    let isFormValid = true;
    let attribute = "اشتراک";

    if (validator.isEmpty(payload.name)) {
        isFormValid = false;
        errors.name = `نام ${attribute} الزامی می باشد`;
    } else if (!validator.isLength(payload.name, { min: 1, max: 90 })) {
        isFormValid = false;
        errors.name = "نام جفت ارز نمی تواند کمتر از 1 و بیشتر از 90 حرف باشد";
    }

    if (validator.isEmpty(payload.valid_for)) {
        isFormValid = false;
        errors.valid_for = `مقدار ${attribute} الزامی می باشد`;
    } else if (!validator.isInt(payload.valid_for)) {
        isFormValid = false;
        errors.valid_for = `مقدار ${attribute} باید عدد باشد`;
    }

    if (validator.isEmpty(payload.price)) {
        isFormValid = false;
        errors.price = `قیمت ${attribute} الزامی می باشد`;
    } else if (!validator.isNumeric(payload.price)) {
        isFormValid = false;
        errors.price = `قیمت ${attribute} باید عدد باشد`;
    }

  

    return {
        success: isFormValid,
        errors
    };
};

export const userValidation = payload => {
    const errors = {};
    let isFormValid = true;
    let attribute = "کاربر";


    if (validator.isEmpty(payload.name)) {
        isFormValid = false;
        errors.name = "نام و نام خانوادگی الزامی می باشد";
    } else if (!validator.isAlpha(payload.name, "fa-IR", { ignore: ' ' }) && !validator.isAlpha(payload.name, "en-US", { ignore: ' ' })) {
        isFormValid = false;
        errors.name = "فقط حروف فارسی یا انگلیسی وارد کنید";
    } else if (!validator.isLength(payload.name, { min: 4, max: 90 })) {
        isFormValid = false;
        errors.name = "نام شما نمی تواند کمتر از 4 و بیشتر از 90 حرف باشد";
    }

    if (validator.isEmpty(payload.email)) {
        isFormValid = false;
        errors.email = "ایمیل الزامی می باشد";
    } else if (!validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = "ایمیل صحیح نمی باشد";
    }

    if (validator.isEmpty(payload.mobile)) {
        isFormValid = false;
        errors.mobile = "شماره موبایل الزامی می باشد";
    } else if (!validator.isMobilePhone(payload.mobile, 'fa-IR')) {
        isFormValid = false;
        errors.mobile = "شماره موبایل صحیح نمی باشد";
    }

    if (validator.isEmpty(payload.is_admin)) {
        isFormValid = false;
        errors.is_admin = `نقش ${attribute} الزامی می باشد`;
    } else if (!validator.isIn(payload.is_admin, [0, 1])) {
        isFormValid = false;
        errors.is_admin = `نقش ${attribute} باید از بین عادی و ادمین انتخاب شود`;
    }

    return {
        success: isFormValid,
        errors
    };
};
export const notificationValidation = payload => {
    const errors = {};
    let isFormValid = true;
    let attribute = "اعلان";

    if (!validator.isEmpty(`${payload.user_id}`) && !validator.isInt(`${payload.user_id}`)) {
        isFormValid = false;
        errors.user_id = "کاربر انتخاب شده، صحیح نمی باشد";
    }

    if (validator.isEmpty(payload.message)) {
        isFormValid = false;
        errors.message = `${attribute} الزامی می باشد`;
    } else if (!validator.isLength(payload.message, { min: 4, max: 255 })) {
        isFormValid = false;
        errors.message = `${attribute} نمی تواند کمتر از 4 و بیشتر از 255 حرف باشد`;
    }
    
    if (validator.isEmpty(payload.section)) {
        isFormValid = false;
        errors.section = `انتخاب بخش الزامی می باشد`;
    } else if (!validator.isIn(payload.section, ["home", "profile", "accounts"])) {
        isFormValid = false;
        errors.section = `بخش انتخابی باید از بین خانه، پروفایل کاربری و حساب ها انتخاب شود`;
    }

    if (validator.isEmpty(payload.type)) {
        isFormValid = false;
        errors.type = `نوع ${attribute} الزامی می باشد`;
    } else if (!validator.isIn(payload.type, ["warning", "success", "info", "primary", "error"])) {
        isFormValid = false;
        errors.type = `نوع ${attribute} باید از بین (warning, success, info, primary, error) انتخاب شود`;
    }

    if (validator.isEmpty(`${payload.seen}`)) {
        isFormValid = false;
        errors.seen = `وضعیت ${attribute} الزامی می باشد`;
    } else if (!validator.isIn(`${payload.seen}`, [0, 1])) {
        isFormValid = false;
        errors.seen = `وضعیت ${attribute} باید از بین فعال و غیرفعال انتخاب شود`;
    }

    return {
        success: isFormValid,
        errors
    };
};