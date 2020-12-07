const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Bootcamp = require('../models/Bootcamp')

// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
  });
  
  // @desc      Get single bootcamp
  // @route     GET /api/v1/bootcamps/:id
  // @access    Public
  exports.getBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
  
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
  
    res.status(200).json({ success: true, data: bootcamp });
  });
  
  // @desc      Create new bootcamp
  // @route     POST /api/v1/bootcamps
  // @access    Private
  exports.createBootcamp = asyncHandler(async (req, res, next) => {
    // Add user to req,body
    req.body.user = req.user.id;
  
    // Check for published bootcamp
    const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });
  
    // If the user is not an admin, they can only add one bootcamp
    if (publishedBootcamp && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `The user with ID ${req.user.id} has already published a bootcamp`,
          400
        )
      );
    }
  
    const bootcamp = await Bootcamp.create(req.body);
  
    res.status(201).json({
      success: true,
      data: bootcamp
    });
  });
  
  // @desc      Update bootcamp
  // @route     PUT /api/v1/bootcamps/:id
  // @access    Private
  exports.updateBootcamp = asyncHandler(async (req, res, next) => {
    let bootcamp = await Bootcamp.findById(req.params.id);
  
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }

    // @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamps/:id
// @access    Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
  
    if (!bootcamp) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
});