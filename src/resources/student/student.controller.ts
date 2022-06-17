import { Router, Request, Response, NextFunction } from 'express';
import IController from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exception/http.exception';
import StudentService from '../student/student.service';

class StudentController implements IController {
    public path = '/student';
    public router = Router();
    private StudentService = new StudentService();
    constructor() {
        this.initialiseRoutes();
    }
    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            this.register
        );
    }
    private register = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { username, password, email } = req.body;

            const token = await this.StudentService.register(
                username,
                password,
                email
            );

            res.status(201).json({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}
export default StudentController;