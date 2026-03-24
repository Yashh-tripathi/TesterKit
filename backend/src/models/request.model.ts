import mongoose, { Schema, Document } from "mongoose";

export interface IRequest extends Document {
  name: string;
  method: string;
  url: string;
  headers?: Record<string, string>;
  body?: any;
  collectionId: string;
}

const requestSchema = new Schema<IRequest>(
  {
    name: {
      type: String,
      required: true
    },
    method: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    headers: {
      type: Object
    },
    body: {
      type: Object
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true
    } as any
  },
  { timestamps: true }
);

const Request = mongoose.model<IRequest>("Request", requestSchema);

export default Request;