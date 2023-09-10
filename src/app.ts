import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/user/user.routes';
import { AcademicSemesterRoutes } from './app/modules/academicSemester/academicSemester.route';
// import ApiError from './errors/ApiErrors'

const app: Application = express();

app.use(cors());

//perser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//application routes
app.use('/api/v1/users/', UserRoutes);
app.use('/api/v1/academic-semesters/', AcademicSemesterRoutes);

//routes
app.get('/', (req: Request, res: Response) => {
  res.send('University Management Service');
});

//testing
// app.get('/', async (req: Request, res: Response) => {
//   // throw new ApiError(400, 'Something Wrong')
//   console.log(x)
// })

app.use(globalErrorHandler);

export default app;
