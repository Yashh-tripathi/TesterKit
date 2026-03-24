import axios from "axios";
import { IRequestPayload, IResponseData } from "../types/request.type";

const sendHttpRequest = async ({
    url,
    method,
    headers,
    body
}: IRequestPayload): Promise<IResponseData> => {
    const startTime = Date.now();
    try {
        const response = await axios({
            url,
            method: method as any,
            headers,
            data: body,
            validateStatus: () => true
        });

        const endTime = Date.now();

        return {
            status: response.status,
            headers: response.headers,
            body: response.data,
            time: endTime - startTime
        }
    } catch (error:any) {
        return {
            error: error instanceof Error ? error.message : String(error),
            time: Date.now() - startTime
        }
    }
}

export default sendHttpRequest;