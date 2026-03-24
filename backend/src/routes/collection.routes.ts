import express from 'express';
import { createCollection, getCollections } from '../controllers/collection.controller';

const router = express.Router();

router.route("/").post(createCollection);
router.route("/").get(getCollections);


export default router;