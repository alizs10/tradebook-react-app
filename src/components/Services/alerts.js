import alertify from "alertifyjs";
import { toast } from "react-toastify";

export const notify = (message, type) => {
    switch (type) {
        case "success":
            toast.success(message, {
                position: "bottom-right",
                closeOnClick: true
            });
            break;
        case "warning":
            toast.warn(message, {
                position: "bottom-right",
                closeOnClick: true
            });
            break;
        case "error":
            toast.error(message, {
                position: "bottom-right",
                closeOnClick: true
            });
            break;

        default:
            break;
    }
}

export const confirm = (title, content, successFunc, cancelFunc) => {

   alertify.confirm(title, content, successFunc, cancelFunc).set('labels', {ok:'تایید', cancel:'لغو'});
}