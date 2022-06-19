import { Router, Request, Response, NextFunction } from 'express';
import IController from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exception/http.exception';
import StudentService from './student.service';

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
            this.login
        )
        this.router.post(
            `${this.path}/register`,
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
            res.status(201).json({ studentObj });
        }catch(error: any){
            next(new HttpException(400, error.message));
        }
    }
    private register = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { username, password, name, email } = req.body;

            const studentObj = await this.studentService.register(
                username,
                password,
                name,
                email
            );

            res.status(201).json({ studentObj });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}
export default StudentController;