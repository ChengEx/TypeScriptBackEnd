import StudentModel from '../../resources/student/student.model';
import token from '../../utils/token';
import bcrypt from 'bcryptjs';

class StudentService {
    private studentModel = StudentModel;

    public async login(
        username: string,
        password: string
    ): Promise<Object | Error> {
        try {
            console.log(username,password);
            const oldUser = await this.studentModel.findOne({username});
            console.log(oldUser);
            if(!oldUser) throw new Error("Student doesn't exist");
            //if(!oldUser) return res.status(400).json({ message: "Invalid credentials" });
            console.log("hi2");
            const comparePassword = await bcrypt.compare(password, oldUser.password);
            if(!comparePassword) throw new Error("wrong password!");

            const accessToken = token.createToken(oldUser);

            let returnStudentObj = oldUser.toObject();
            returnStudentObj.token = accessToken;
            return returnStudentObj;
        }catch(error: any){
            console.log("hi");
            return new Error(error.message);
        }
        
    };

    public async register(
        username: string,
        password: string,
        name: string,
        email:string,
        phone: number
    ): Promise<object | Error> {
        try {
            const oldUser = await this.studentModel.findOne({username});
            if(oldUser) throw new Error("Username exist");

            const hashedPassword = await bcrypt.hash(password, 12)
            console.log("hashedPassword",hashedPassword);
            const user = await this.studentModel.create({
                username,
                password: hashedPassword,
                name,
                email,
                phone
            });

            const accessToken = token.createToken(user);
            
            let returnStudentObj = user.toObject();
            returnStudentObj.token = accessToken;

            return returnStudentObj;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default StudentService;