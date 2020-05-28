import superagent from "superagent";
import {URL_API} from "../constants/URLConstants";

export const getEmployees = async () => {
    try {
        const res = await superagent.get(`${URL_API}`);
        return res.body;
    } catch(err) {
        throw err
    }
}

export const getChat = async () => {
    try {
        const res = await superagent.get(`${URL_API}chat`);
        return res.body;
    } catch(err) {
        throw err
    }
}

export const putEmployees = async (request) => {
    try {
        const res = await superagent.put(`${URL_API}`).send(request);
        return res.body;
    } catch(err) {
        throw err;
    }
}