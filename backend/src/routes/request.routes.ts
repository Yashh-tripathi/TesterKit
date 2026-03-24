import express from 'express';
import { sendRequest } from '../controllers/request.controller';
import { saveRequest, getRequestsByCollection } from '../controllers/requestSave.controller';

const router = express.Router();

router.route("/send").post(sendRequest);
  
  router.post("/save", saveRequest);
  router.get("/collection/:collectionId", getRequestsByCollection);


export default router