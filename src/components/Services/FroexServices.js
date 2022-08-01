import axios from "axios";
import http from "./http";

const api_key = 'c2c40ca235065871f124c4dc17f1c48a';
const base_api_url = 'http://data.fixer.io/api/';

export const getHistoricalRates = async (date, base, symbol) => {
    delete axios.defaults.headers["Authorization"];
    if (base === "EUR") {
        let url = `${base_api_url}${date}?access_key=${api_key}&base=${base}&symbols=${symbol}`;
        return await http.get(url, {
            withCredentials: ''
        })


    }



}