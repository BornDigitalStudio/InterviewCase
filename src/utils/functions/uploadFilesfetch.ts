export const host = "https://qo3gvv3gx0.execute-api.eu-central-1.amazonaws.com";

async function requestFiles<T>(method: string, url: string, data?: T) {
    const options: any = {
        method,
        headers: {},
        body: JSON.stringify(data),
    };

    try {
        const response = await fetch(url, options);

        if (response.ok != true) {
            response.text().then((text) => {
                throw new Error(text);
            });
        }

        return response;
        // }
    } catch (e: any) {
        // alert(e.message);
        throw new Error(e);
    }
}

export const fileGet = requestFiles.bind(null, "get");
export const filePost = requestFiles.bind(null, "post");
export const filePut = requestFiles.bind(null, "put");
export const fileDel = requestFiles.bind(null, "delete");
