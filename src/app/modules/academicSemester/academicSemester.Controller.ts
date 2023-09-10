import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.Service';

const createSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body;
    console.log(academicSemesterData, 'From controller');
    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemesterData,
    );
    res.status(201).json({
      status: true,
      message: ' Academic Semester is created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const AcademicSemesterController = { createSemester };
