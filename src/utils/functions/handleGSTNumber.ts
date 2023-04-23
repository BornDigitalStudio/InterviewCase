import { host } from "./fetch";

export const getJSTNumber = async (value: string, idToken?: string) => {
    try {
        if (idToken) {
            const res = await fetch(
                `${host}/prod/check-gst-number?gstin=${value}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${idToken}`,
                    },
                }
            );
            const data = await res.json();

            if (data.response?.status_code === 0) {
                throw new Error(data.response.error.split(" : "));
            }
            return data.response;
        } else {
            throw new Error("idToken is not provided");
        }
    } catch (e: any) {
        throw e;
    }
};
