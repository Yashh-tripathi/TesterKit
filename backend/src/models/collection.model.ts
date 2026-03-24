import mongoose from "mongoose";

export interface ICollection extends mongoose.Document{
    name: string;
    userId?: string;
}


const collectionSchema = new mongoose.Schema<ICollection>({
    name:{
        type: String,
        required: true
    },
    userId: {
        type: String,
        default: "guest"
    }
},{
    timestamps: true
});


const Collection = mongoose.model<ICollection>("Collection", collectionSchema);

export default Collection;