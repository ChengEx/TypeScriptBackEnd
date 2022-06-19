import { Router, Request, Response, NextFunction } from "express";
import IController from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exception/http.exception';
import ProductService from './product.service';

class ProductController implements IController {
    public path = "/product";
    public router = Router();
    private productService = new ProductService();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.get(
            `${this.path}/allproduct`,
            this.getProduct
        ),
        this.router.post(
            `${this.path}/addproduct`,
            this.addProduct
        )
    }
    private getProduct = async(req: Request, res: Response, next: NextFunction):Promise<Response | void> =>{
        try {
            const productArray = await this.productService.getAllProduct();
            res.status(200).json({ productArray });
        }catch(error: any){
            next(new HttpException(400, error.message));
        }
    }

    private addProduct = async(req: Request, res: Response, next:NextFunction): Promise<Response | void> => {
        try {
            const { name, category, images, description, price, status } = req.body;
            const addProductObj = await this.productService.addProduct(
                name,
                category,
                images,
                description,
                price,
                status
            )
            res.status(200).json({ addProductObj })
        }catch(error: any){
            next(new HttpException(400, error.message));
        }
    }
}

export default ProductController;