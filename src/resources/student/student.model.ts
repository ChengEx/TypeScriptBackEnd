import mongoose, { Schema } from 'mongoose';
import IStudent from './student.interface';

const StudentSchema:Schema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    email:{type: String, required: true},
    phone: {type: Number},
    shippingAddredd:{
        city:{type: String},
        street:{type: String}
    }
},
    { timestamps: true }
)

export default mongoose.model<IStudent>('students',StudentSchema);