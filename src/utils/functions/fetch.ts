import { UserType } from "../../types/UserType";
import { getAccessToken, getIdToken } from "./utils";

export const host = "https://qo3gvv3gx0.execute-api.eu-central-1.amazonaws.com";

async function request<T>(
    method: string,
    url: string,
    user: UserType,
    data?: T,
    contentType?: any
) {
    const options: {
        method: string;
        headers: any;
        body?: string;
    } = {
        method,
        headers: {},
    };
    if (user) {
        const { accessToken, idToken } = user;
        options.headers["AccessToken"] = `${accessToken}`;
        options.headers["Authorization"] = `${idToken}`;
    }

    if (data) {
        if (contentType) Object.assign(options.headers, contentType);
        else options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(host + url, options);

        if (response.ok != true) {
            const errorMessage = await response.text();
            const message = JSON.parse(errorMessage).message;
            throw new Error(message);
        }

        // if (response.status == 204) {
        //     return response;
        // } else {
        return response.json();
        // }
    } catch (e: any) {
        // alert(e.message);
        throw new Error(e);
    }
}

export const get = request.bind(null, "get");
export const post = request.bind(null, "post");
export const put = request.bind(null, "put");
export const del = request.bind(null, "delete");
