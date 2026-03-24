import { Request, Response } from "express";
import sendHttpRequest from "../services/http.service";

export const sendRequest = async (req: Request, res: Response) => {
    try {
        const {url, method, headers, body} = req.body;
        if(!url || !method){
            return res.status(400).json({error: "URL and method are required"});
        }
        const result = await sendHttpRequest({url, method, headers, body});
        res.json(result);
    } catch (error:any) {
        res.status(500).json({error: error instanceof Error ? error.message : String(error)});
    }
}