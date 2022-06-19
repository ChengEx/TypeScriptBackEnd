import StudentController from './resources/student/student.controller';
import ProductController from './resources/product/product.controller';
import App from './app';

const app = new App(
    [new StudentController(), new ProductController()],
    4000
)
app.listen();