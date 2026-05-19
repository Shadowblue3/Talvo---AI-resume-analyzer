import { InterviewContext } from "../interview.context";
import { generateInterviewReport, getInterviewReport, getAllInterviewReports } from "../services/interview.api";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

export const useInterview = () => {
    const context = useContext(InterviewContext);
    const { interviewID } = useParams();

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider");
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true);
        try {
            const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile });
            setReport(response.interViewReport);
            return response.interViewReport;
        } catch (err) {
            console.error(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const getReportById = async (id) => {
        setLoading(true);
        try {
            const response = await getInterviewReport({ interviewId: id });
            setReport(response.interviewReport);
            return response.interviewReport;
        } catch (err) {
            console.error("Failed to fetch report by ID:", err);
            return null; // Safely return null on error
        } finally {
            setLoading(false);
        }
    };

    const getAllReports = async () => { // Removed userId since it wasn't used in the param list
        setLoading(true);
        try {
            const response = await getAllInterviewReports();
            setReports(response.allReports);
            return response.allReports;
        } catch (err) {
            console.error(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Auto-fetch logic
    useEffect(() => {
        if (interviewID) {
          getReportById(interviewID);
        } else {
          getAllReports();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [interviewID]);

    return { loading, report, reports, generateReport, getReportById, getAllReports };
};