import express from 'express';
import { sendRequest } from '../controllers/request.controller';

const router = express.Router();

router.route("/send").post(sendRequest);


export default router