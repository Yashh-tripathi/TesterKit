export interface IRequestPayload{
    url: string;
    method: string;
    headers?: Record<string, string>;
    body?: any;
}


export interface IResponseData{
    status?: number;
    headers?: any;
    body?: any;
    time?: number;
    error?: string;
}