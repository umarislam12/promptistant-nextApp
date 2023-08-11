import {Schema,models, model} from "mongoose";

const PromptSchema=new Schema({
    creator:{
        type:mongoose.SchemaType.Types.ObjectId,
        ref:'User',
    },

    prompt:{
        type:String,
        required:[true,'prompt is required'],
    },
    tag:{
        type:String,
        required:[true,'tag is required'],
    }
})