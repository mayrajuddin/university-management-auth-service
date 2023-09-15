import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes/routes';
import httpStatus from 'http-status';
// import ApiError from './errors/ApiErrors'

const app: Application = express();

app.use(cors());

//perser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//application routes

app.use('/api/v1/', router);
// app.use('/api/v1/users/', UserRoutes);
// app.use('/api/v1/academic-semesters/', AcademicSemesterRoutes);

//routes
app.get('/', (req: Request, res: Response) => {
  res.send('University Management Service');
});

//testing
// app.get('/', async (req: Request, res: Response) => {
//   // throw new ApiError(400, 'Something Wrong')
//   console.log(x)
// })
//global errorhandler
app.use(globalErrorHandler);

//handle not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.BAD_REQUEST).json({
    success: false,
    message: 'Route Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
});
export default app;
