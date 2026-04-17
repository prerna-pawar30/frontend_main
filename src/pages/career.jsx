/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import apiService from '../api/ApiService'; 
import JobCard from '../components/career/JobCard';
import JobDetailsModal from '../components/career/JobDetailsModal';
import JobApplicationModal from '../components/career/JobApplicationModal';

const animationStyles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
  .custom-scrollbar::-webkit-scrollbar { width: 6px; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
`;

const CareerPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    if (!document.getElementById('career-animations')) {
      const styleSheet = document.createElement("style");
      styleSheet.id = 'career-animations';
      styleSheet.type = "text/css";
      styleSheet.innerText = animationStyles;
      document.head.appendChild(styleSheet);
    }
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await apiService.getCareerJobs();
      const jobList = response.data?.data?.jobs || response.data?.jobs || response.data;
      if (Array.isArray(jobList)) setJobs(jobList);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-gray-900 py-16 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 pb-10 border-b border-gray-100 animate-fadeInUp flex flex-col items-center text-center">
          <span className="text-3xl md:text-4xl font-bold mb-4 text-[#072434] block w-full">
            Careers
          </span>
          <h1 className="text-2xl font-bold">
            Build the future<span className='text-[#E68736]'> with Digident.</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl font-medium leading-relaxed">
            We're looking for passionate individuals to help us revolutionize dental manufacturing through technology.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-2 flex flex-col items-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-[#E68736] rounded-full animate-spin"></div>
              <p className="font-bold text-gray-400">Finding opportunities...</p>
            </div>
          ) : (
            jobs.map((job, index) => (
              <JobCard 
                key={job._id || index} 
                job={job} 
                index={index} 
                // Pass the application ID if it exists in the job object
                applicationId={job.applicationId} 
                onViewDetails={(j) => { setSelectedJob(j); setIsApplying(false); }} 
              />
            ))
          )}
        </div>

        {/* DETAILS MODAL */}
        {selectedJob && !isApplying && (
          <JobDetailsModal 
            job={selectedJob} 
            // Pass application ID to modal so it can show "Edit" button
            applicationId={selectedJob.applicationId} 
            onClose={() => setSelectedJob(null)} 
            onApply={() => setIsApplying(true)} 
          />
        )}

        {/* APPLICATION FORM MODAL */}
        {selectedJob && isApplying && (
          <JobApplicationModal 
            selectedJob={selectedJob} 
            // Pass application ID to switch between POST and PUT
            applicationId={selectedJob.applicationId} 
onClose={(newAppId) => {
      setIsApplying(false);
      // Update the jobs array locally so the "Apply" button turns into "Edit"
      if (newAppId) {
        setJobs(prevJobs => prevJobs.map(job => 
          (job._id === selectedJob._id) 
          ? { ...job, applicationId: newAppId } 
          : job
        ));
      }
      fetchJobs(); // Optional: Keep this for a hard sync
    }}
          />
        )}
      </div>
    </div>
  );
};

export default CareerPage;