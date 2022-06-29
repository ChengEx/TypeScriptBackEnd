import mongoose, { Schema } from 'mongoose';
import IStudent from './student.interface';

const StudentSchema:Schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email:{ type: String, required: true },
    phone: { type: String, required: true },
    shippingAddredd:{
        city:{ type: String },
        street:{ type: String }
    },
    productId: [
        {
            type: mongoose.Types.ObjectId,
            ref: "products"
        }
    ],
    
},
    { timestamps: true }
)

export default mongoose.model<IStudent>('students',StudentSchema);