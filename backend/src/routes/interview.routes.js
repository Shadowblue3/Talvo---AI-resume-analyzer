const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewRouter = express.Router()
const {upload} = require("../middlewares/file.middleware")
const interviewController = require("../controllers/interview.controller")

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of the user self description, resume pdf and job description
 * @access Private
 */
interviewRouter.post("/", authMiddleware.authUser, upload.single("resume"), interviewController.generateInterviewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId
 * @access Private
 */

interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController)

/**
 * @route GET /api/interview/get-interview
 * @description get all interview reports by userID
 * @access Private
 */

interviewRouter.get("/get-interview", authMiddleware.authUser, interviewController.getAllInterviewByUserIdController)

module.exports  = interviewRouter