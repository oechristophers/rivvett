import { model, models, Schema } from "mongoose"
const GenderSchema = new Schema({
    name:{type:String,required: true}
})

export const Gender = models?.Gender || model("Gender", GenderSchema)