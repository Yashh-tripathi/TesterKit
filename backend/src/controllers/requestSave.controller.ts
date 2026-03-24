import { Request, Response } from "express";
import RequestModel from "../models/request.model";

// Save request
export const saveRequest = async (req: Request, res: Response) => {
  try {
    const { name, method, url, headers, body, collectionId } = req.body;

    const newRequest = await RequestModel.create({
      name,
      method,
      url,
      headers,
      body,
      collectionId
    });

    res.status(201).json(newRequest);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get requests by collection
export const getRequestsByCollection = async (req: Request, res: Response) => {
  try {
    const { collectionId } = req.params;

    const requests = await RequestModel.find({ collectionId });

    res.json(requests);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};