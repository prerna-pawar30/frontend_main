/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../../api/ApiService";
import JobApplicationModal from "./JobApplicationModal";

const JobApplicationModalWrapper = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applicationData, setApplicationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFullData = async () => {
      try {
        // Step 1: Fetch Application Details
        const appRes = await apiService.getJobApplicationDetails(applicationId);
        const appDetails = appRes.data?.data;

        if (appDetails) {
          setApplicationData(appDetails);

          // Step 2: Fetch Job Details using the jobId from the application
          if (appDetails.jobId) {
            const jobRes = await apiService.getJobDetails(appDetails.jobId);
            setJob(jobRes.data?.data);
          }
        }
      } catch (err) {
        console.error("Error fetching application or job details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (applicationId) fetchFullData();
  }, [applicationId]);

  // 🔄 Handle Navigation after Success
  const handleClose = (updatedId) => {
    if (updatedId && job) {
      // If success, go specifically to the Job Details page
      navigate(`/career/job/${job.jobId || job._id}`);
    } else {
      // If cancelled/closed without update, just go back
      navigate(-1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[#E68736] rounded-full animate-spin"></div>
        <p className="ml-3 font-bold text-gray-500">Loading Application...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 font-bold">Job details not found.</p>
        <button onClick={() => navigate(-1)} className="text-[#E68736] underline">Go Back</button>
      </div>
    );
  }

  return (
    <JobApplicationModal
      selectedJob={job}
      applicationId={applicationId}
      initialData={applicationData}
      onClose={handleClose}
    />
  );
};

export default JobApplicationModalWrapper;