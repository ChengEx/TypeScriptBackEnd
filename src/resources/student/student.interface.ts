import { Document } from 'mongoose';

export default interface IStudent extends Document{
    username: string,
    password: string,
    name: string,
    email: string,
    phone: number,
    shippingAddress:{
        city: string,
        street: string
    }
}