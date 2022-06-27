import CategoryModel from './category.model';

class CategoryService {
    private categoryModel = CategoryModel;

    public async getAll(): Promise<object | Error> {
        try{
            const categoryArray = await this.categoryModel.find();
            return categoryArray;    
        }catch(error: any){
            return new Error(error.message);
        }
    }
}

export default CategoryService;