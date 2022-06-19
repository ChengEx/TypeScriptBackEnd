import ProductModel from '../../resources/product/product.model';

class ProductService {
    private productModel = ProductModel;

    public async getAllProduct():Promise<Array<object> | Error> {
        const productArray = await this.productModel.find();
        return productArray;
    }

    public async addProduct(
        name: string,
        category: string,
        images: Array<string>,
        description: string,
        price: number,
        status: string
    ): Promise<object | Error> {
        try {
            const addProductObj = await this.productModel.create({
                name,
                category,
                productDetail:{
                    images,
                    description,
                    price,
                    status
                }
            });
            console.log(addProductObj);
            const returnAddObj = addProductObj.toObject();
            console.log(returnAddObj);
            return returnAddObj;
        }catch(error: any){
            return new Error(error.message);
        }
    }
}

export default ProductService;