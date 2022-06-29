import { Document } from 'mongoose';

export default interface IStudent extends Document{
    username: string,
    password: string,
    name: string,
    email: string,
    phone: string,
    shippingAddress:{
        city: string,
        street: string
    },
    productId: [string]
    // productId: [
    //     {
    //         type: mongoose.Types.ObjectId,
    //         ref: "products"
    //     }
    // ],
}