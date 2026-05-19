import axios from 'axios'

const api = axios.create({
    baseURL:"https://talvo-ai-resume-analyzer.onrender.com",
    withCredentials: true,
})

/**
 * @description: Generate the interview report using AI
 */
export const generateInterviewReport = async ({jobDescription, selfDescription, resumeFile})=>{
    const formData = new FormData()
    formData.append("jobDescription", jobDescription)
    formData.append("selfDescription", selfDescription)
    formData.append("resume", resumeFile)

    const response = await api.post("/api/interview/", formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })

    return response.data
}

/**
 * @description: Get the interview report using the interview Id
 */

export const getInterviewReport = async ({interviewId}) =>{
    const response = await api.get(`/api/interview/report/${interviewId}`)

    return response.data
}

/**
 * @description: Get the interview report using the interview Id
 */
export const getAllInterviewReports = async ()=>{
    const response = await api.get(`/api/interview/get-interview`)

    return response.data
}