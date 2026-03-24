import { Request, Response } from "express";
import Collection from "../models/collection.model";

//create collection 
export const createCollection = async (req: Request, res: Response) => {
    try {
        const {name} = req.body;
        const collection = await Collection.create({name});
        res.status(201).json(collection);
    } catch (error) {
        res.status(500).json({error: error instanceof Error ? error.message : String(error)});
    }
}

//get all collections
export const getCollections = async (req: Request, res: Response) => {
    try {
        const collections = await Collection.find().sort({createdAt: -1});
        res.json(collections);
    } catch (error) {
        res.status(500).json({error: error instanceof Error ? error.message : String(error)});
    }
}

