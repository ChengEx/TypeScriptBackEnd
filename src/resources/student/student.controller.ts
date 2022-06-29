import { Router, Request, Response, NextFunction } from 'express';
import IController from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exception/http.exception';
import StudentService from './student.service';
import validationMiddleware from '../../middleware/validation.middleware';
import validate from './student.validation';
class StudentController implements IController {
    public path = '/student';
    public router = Router();
    private studentService = new StudentService();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        )
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        );
    }
    private login = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { username, password } = req.body;
            const studentObj = await this.studentService.login(
                username,
                password
            );     
            if(studentObj instanceof Error){
                throw new Error(studentObj.message);
            }
            res.status(200).json({ studentObj }); 
        }catch(error: any){
            next(new HttpException(400, error.message));
        }
    }
    private register = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { username, password, name, email, phone } = req.body;

            const studentObj = await this.studentService.register(
                username,
                password,
                name,
                email,
                phone
            );
            if(studentObj instanceof Error){
                throw new Error(studentObj.message);
            }

            res.status(201).json({ studentObj });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}
export default StudentController;