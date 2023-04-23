import { useAuth } from "../../context/UserContext/UserContext";
import { UserType } from "../../types/UserType";
import { del, get, host } from "./fetch";
import { fileDel } from "./uploadFilesfetch";

export const deleteFile = async (
    fileLocation: string,
    fileName: string,
    user: UserType
) => {
    try {
        const res = await del(`/prod/get-s3-url`, user, {
            fileLocation,
            fileName,
        });

        return res;
    } catch (e: any) {
        throw new Error(e);
    }
};
