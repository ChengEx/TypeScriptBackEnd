import ProductModel from '../../resources/product/product.model';
import StudentModel from '../student/student.model';
import CategoryModel from '../category/category.model';
import HttpException from '../../utils/exception/http.exception';

class ProductService {
    private productModel = ProductModel;
    private studentModel = StudentModel;

    public async getAllProduct():Promise<Array<object> | Error> {
        try{
            const productArray = await this.productModel.find();
            return productArray;
        }catch(error: any){
            return new Error(error.message);
        }
        
    }

    public async addProduct(
        _id: string,
        name: string,
        category: string,
        subcategory: string,
        images: Array<string>,
        description: string,
        price: number,
        status: string
    ): Promise<object | Error> {
        try {
            const addProductObj = await this.productModel.create({
                name,
                category,
                subcategory,
                productDetail:{
                    images,
                    description,
                    price,
                    status
                },
                createdBy:_id
            });

            const addStudentProductId = await this.studentModel.findByIdAndUpdate(
                _id, {
                    $push: { productId: addProductObj._id  }
                }
            )
            return addProductObj;
        }catch(error: any){
            return new Error(error.message);
        }
    }
    public async getProductListByCategory(
        category: string
    ): Promise<object | Error> {
        try {
            const productList = await this.productModel.find({ 'category': category });
            return productList;
        }catch(error: any) {
            throw new Error(error.message);
        }
    }

    public async getProductListBySubCategory(
        subcategory: string
    ): Promise<object | Error> {
        try {
            const productList = await this.productModel.find({ 'subcategory': subcategory });
            return productList;        
        }catch(error: any) {
            throw new Error(error.message);
        }
    }

    public async getProductById(
        _id: string
    ):Promise<object | Error> {
        try {
            const productObj = await this.productModel.findOne({'_id':_id})
                .populate('createdBy');
            let returnObj = {}
            if(productObj !== null) {
                returnObj = productObj.toObject();
            }
            return returnObj;
        }catch(error: any) {
            throw new Error(error.message);
        }
    }


    public async getProductListByUserId(
        _id: string
    ):Promise<object | Error> {
        try {
            const getProductList = await this.studentModel.findOne({ '_id': _id})
                .populate('productId')
            
            let returnObj = {}
            if(getProductList !== null) {
                returnObj = getProductList.toObject();
            }
            return returnObj;
        }catch(error: any) {
            throw new Error(error.message);
        }
    }

    public async updateProductById(
        _id: string,
        name: string,
        category: string,
        subcategory: string,
        images: Array<string>,
        description: string,
        price: number,
        status: string
    ): Promise<object | Error>{
        try {
            const updateObj = await this.productModel.findByIdAndUpdate({_id},{
                name,
                category,
                subcategory,
                productDetail:{
                    images,
                    description,
                    price,
                    status
                } 
            })
            let returnUpdateObj = {};
            if(updateObj !== null) {
                returnUpdateObj = updateObj.toObject();
            }
            return returnUpdateObj;
        }catch(error: any) {
            throw new Error(error.message);
        }
    }

    public async deleteProductById(
        _id: string,
        userId: string
    ): Promise<object | Error> {
        try {
            const deleteObj = await this.productModel.findByIdAndDelete({_id});
            const deleteStudentProduct = await this.studentModel.updateOne({_id: userId},
                { $pull:{
                    productDetail:{
                        images:_id
                    }
                }}
            );
            let returnDeleteObj = {};
            if(deleteObj !== null) {
                returnDeleteObj = deleteObj.toObject();
            };
            return returnDeleteObj;
        }catch(error: any) {
            throw new Error(error.message);
        }
    }
}

export default ProductService;