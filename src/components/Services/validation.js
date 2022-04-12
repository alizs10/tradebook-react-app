import validator from "validator";

export const loginValidation = payload => {
    const errors = {};
    let isFormValid = true;

    if (validator.isEmpty(payload.email)) {
        isFormValid = false;
        errors.email = "ایمیل الزامی می باشد";
    } else if (!validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = "ایمیل صحیح نمی باشد";
    }

    if (validator.isEmpty(payload.password)) {
        isFormValid = false;
        errors.password = "کلمه عبور الزامی می باشد";
    }

    return {
        success: isFormValid,
        errors
    };
};
export const signupValidation = payload => {
    const errors = {};
    let isFormValid = true;

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

    if (validator.isEmpty(payload.password)) {
        isFormValid = false;
        errors.password = "کلمه عبور الزامی می باشد";
    } else if (!validator.isStrongPassword(payload.password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 })) {
        isFormValid = false;
        errors.password = "کلمه عبور شما ضعیف می باشد";
    }


    if (validator.isEmpty(payload.password_confirmation)) {
        isFormValid = false;
        errors.password_confirm = "تکرار کلمه عبور الزامی می باشد";
    } else if (!validator.equals(payload.password, payload.password_confirmation)) {
        isFormValid = false;
        errors.password_confirm = "تکرار کلمه عبور با کلمه عبور شما مطابقت ندارد";
    }

    if (payload.referral_code && payload.referral_code.length > 0 && payload.referral_code.length !== 8) {
        isFormValid = false;
        errors.referral_code = "کد معرف باید 8 کارکتر باشد";
    }

    return {
        success: isFormValid,
        errors
    };
};
export const accValidation = payload => {
    const errors = {};
    let isFormValid = true;

    if (validator.isEmpty(payload.name)) {
        isFormValid = false;
        errors.name = "نام حساب الزامی می باشد";
    } else if (!validator.isLength(payload.name, { min: 1, max: 90 })) {
        isFormValid = false;
        errors.name = "نام حساب نمی تواند کمتر از 1 و بیشتر از 90 حرف باشد";
    }

    if (validator.isEmpty(payload.balance)) {
        isFormValid = false;
        errors.balance = "بالانس حساب الزامی می باشد";
    } else if (!validator.isNumeric(payload.balance)) {
        isFormValid = false;
        errors.balance = "بالانس حساب باید از نوع عدد باشد";
    }

    if (validator.isEmpty(payload.account_created_at)) {
        isFormValid = false;
        errors.account_created_at = "تاریخ ساخت حساب الزامی می باشد";
    } else if (!validator.isDate(payload.account_created_at)) {
        isFormValid = false;
        errors.account_created_at = "تاریخ ساخت حساب صحیح نمی باشد";
    }

    if (validator.isEmpty(payload.type)) {
        isFormValid = false;
        errors.type = "نوع حساب الزامی می باشد";
    } else if (!validator.isIn(payload.type, [0, 1])) {
        isFormValid = false;
        errors.type = "نوع حساب باید از بین کریپتوکارنسی و فارکس انتخاب شود";
    }

    return {
        success: isFormValid,
        errors
    };
};
export const profileValidation = formData => {
    const errors = {};
    let isFormValid = true;

    let payload = {};

    for (const [key, value] of formData) {

        payload[key] = value;
    }

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

    if (payload.profile_photo_path) {
        let type = payload.profile_photo_path.type;
        let size = payload.profile_photo_path.size;
        let typeOfFile = type.split("/")[0]
        let format = type.split("/")[1]

        if (typeOfFile != "image") {
            isFormValid = false;
            errors.profile_photo_path = "فایل انتخابی باید از نوع عکس باشد";
        } else if (format != "jpg" && format != "png" && format != "jpeg") {
            isFormValid = false;
            errors.profile_photo_path = "فقط فرمت های jpg, jpeg, png مورد قبول است";
        } else if (size > 2000000) {
            size /= 1000000;
            size = size.toFixed(2)
            isFormValid = false;
            errors.profile_photo_path = `حجم آواتار شما باید کمتر از 2 مگابایت باشد. حجم عکس شما: ${size + " مگابایت"}`
        }
    }

    return {
        success: isFormValid,
        errors
    };
};

export const resetPasswordProfileValidation = payload => {
    const errors = {};
    let isFormValid = true;


    if (validator.isEmpty(payload.old_password)) {
        isFormValid = false;
        errors.old_password = "کلمه عبور پیشین الزامی می باشد";
    }

    if (validator.isEmpty(payload.password)) {
        isFormValid = false;
        errors.password = "کلمه عبور جدید الزامی می باشد";
    } else if (!validator.isStrongPassword(payload.password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10 })) {
        isFormValid = false;
        errors.password = "کلمه عبور جدید شما ضعیف می باشد";
    }


    if (validator.isEmpty(payload.password_confirmation)) {
        isFormValid = false;
        errors.password_confirmation = "تکرار کلمه عبور الزامی می باشد";
    } else if (!validator.equals(payload.password, payload.password_confirmation)) {
        isFormValid = false;
        errors.password_confirmation = "تکرار کلمه عبور با کلمه عبور شما مطابقت ندارد";
    }

    return {
        success: isFormValid,
        errors
    };
};
export const tradeValidation = payload => {
    const errors = {};
    let isFormValid = true;

    console.log(payload);

    if (validator.isEmpty(payload.trade_date)) {
        isFormValid = false;
        errors.trade_date = "تاریخ معامله الزامی می باشد";
    } else if (!validator.isDate(payload.trade_date)) {
        isFormValid = false;
        errors.trade_date = "تاریخ معامله صحیح نمی باشد";
    }

    if (validator.isEmpty(payload.pair_id)) {
        isFormValid = false;
        errors.pair_id = "انتخاب جفت ارز الزامی می باشد";
    } else if (!validator.isInt(payload.pair_id)) {
        isFormValid = false;
        errors.pair_id = "جفت ارز انتخاب شده، صحیح نمی باشد";
    }

    if (validator.isEmpty(payload.status)) {
        isFormValid = false;
        errors.status = "وضعیت معامله الزامی می باشد";
    } else if (!validator.isIn(payload.status, [0, 1])) {
        isFormValid = false;
        errors.status = "وضعیت معامله باید از بین باز و بسته انتخاب شود";
    }

    if (validator.isEmpty(payload.contract_type)) {
        isFormValid = false;
        errors.contract_type = "نوع قرارداد الزامی می باشد";
    } else if (!validator.isIn(payload.contract_type, [0, 1])) {
        isFormValid = false;
        errors.contract_type = "نوع قرارداد باید از بین لانگ و شورت انتخاب شود";
    }

    if ((validator.isEmpty(payload.margin) && payload.status == 0) || (validator.isEmpty(payload.margin) && payload.accType === "crypto")) {
        isFormValid = false;
        errors.margin = "مارجین الزامی می باشد";
    } else if ((!validator.isNumeric(payload.margin) && payload.status == 0) || (!validator.isNumeric(payload.margin) && payload.accType === "crypto")) {
        isFormValid = false;
        errors.margin = "مارجین باید از نوع عدد باشد";
    }

    if (validator.isEmpty(payload.profit) && payload.accType === "forex" && payload.status == 1) {
        isFormValid = false;
        errors.profit = "سود/زیان الزامی می باشد";
    } else if (!validator.isNumeric(payload.profit) && payload.accType === "forex" && payload.status == 1) {
        isFormValid = false;
        errors.profit = "سود/زیان باید از نوع عدد باشد";
    }
    if (validator.isEmpty(payload.leverage)) {
        isFormValid = false;
        errors.leverage = "لوریج الزامی می باشد";
    } else if (!validator.isNumeric(payload.leverage)) {
        isFormValid = false;
        errors.leverage = "لوریج باید از نوع عدد باشد";
    }
    if (validator.isEmpty(payload.entry_price)) {
        isFormValid = false;
        errors.entry_price = "نقطه ورود الزامی می باشد";
    } else if (!validator.isNumeric(payload.entry_price)) {
        isFormValid = false;
        errors.entry_price = "نقطه ورود باید از نوع عدد باشد";
    }
    if (validator.isEmpty(payload.exit_price)) {
        isFormValid = false;
        errors.exit_price = "نقطه خروج الزامی می باشد";
    } else if (!validator.isNumeric(payload.exit_price)) {
        isFormValid = false;
        errors.exit_price = "نقطه خروج باید از نوع عدد باشد";
    }

    return {
        success: isFormValid,
        errors
    };
};

