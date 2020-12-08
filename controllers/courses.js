const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Course = require('../models/Course')


//@desc  GET courses
//@route  GET api/v1/courses
//@route  GET /api/v1/bootcamps/:bootcampId/courses
//@access Public

exports.getCourses = asyncHandler(async (req, res, next) => {
    let query;

    if(req.params.bootcampId) {
        query = Course.find({ bootcamp: req.params.bootcampId })
    } else {
        query = Course.find().populate('bootcamp');
        path: 'bootcamp',
        select: 'name description'
    }
    const courses = await query;

    res.status(200).json({
        success: true, 
        count: courses.length,
        data: courses.
    })
})

exports.getCourses = asyncHandler(async (req, res, next) => {
    if (req.params.bootcampId) {
      const courses = await Course.find({ bootcamp: req.params.bootcampId });
  
      return res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
      });
    } else {
      res.status(200).json(res.advancedResults);
    }
  });
  