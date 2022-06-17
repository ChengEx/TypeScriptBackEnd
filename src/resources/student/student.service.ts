import StudentModel from '../../resources/student/student.model';
import token from '../../utils/token';

class StudentService {
    private studentModel = StudentModel;

    public async register(
        username: string,
        password: string,
        email: string,  
    ): Promise<string | Error> {
        try {
            const user = await this.studentModel.create({
                username,
                password,
                email,
                
            });

            const accessToken = token.createToken(user);

            return accessToken;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default StudentService;