const interviewReportModel = require("../models/interviewReport.model")
const pdfParse = require('pdf-parse')
const generateInterviewReport = require("../services/ai.service")

async function generateInterviewReportController(req, res){
    const resumeFile = req.file
    const resumeContent = (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const {selfDescription, jobDescription} = req.body

    const interviewReportByAi = await generateInterviewReport({
        resume:resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interViewReport = await interviewReportModel.create({
        user:req.user.id,
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        messege:"Interview Report generated successfully",
        interViewReport
    })
}


/**
 * @description Controller to get interview report by interviewId
 */
async function getInterviewReportByIdController(req, res){
    const {interviewId} = req.params
    const interviewReport = await interviewReportModel.findOne({
        _id:interviewId,
        user:req.user.id
    })

    if(!interviewReport){
        res.status(404).json({
            messege:"Interview report not found"
        })
    }

    res.status(200).json({
        messege:"Interview report fetched successfully",
        interviewReport
    })
}

async function getAllInterviewByUserIdController(req, res){
    const userId = req.user.id
    const allReports = await interviewReportModel.find({
        user:userId
    }).sort({createdAt: -1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    if(!allReports){
        return res.status(404).json({
            messege:"Reports not Found"
        })
    }

     res.status(200).json({
        messege:"Interview report fetched successfully",
        allReports
    })
}
module.exports = {generateInterviewReportController, getInterviewReportByIdController,getAllInterviewByUserIdController}