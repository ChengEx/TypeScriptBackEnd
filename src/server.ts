import StudentController from './resources/student/student.controller';
import App from './app';

const app = new App(
    [new StudentController()],
    4000
)
app.listen();