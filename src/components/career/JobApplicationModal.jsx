/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import apiService from '../../api/ApiService';
import Swal from 'sweetalert2';

const JobApplicationModal = ({ selectedJob, onClose, initialData, applicationId }) => {
  const [fileName, setFileName] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    country: 'India',
    totalExperienceYears: '',
    currentCompany: '',
    currentCTC: '',
    expectedCTC: '',
    noticePeriodDays: '',
    portfolioUrl: '',
    linkedinUrl: '',
    githubUrl: '',
    coverLetter: '',
  });

  // ✅ Effect to pre-fill form when initialData is provided (Update Mode)
  useEffect(() => {
    if (initialData && initialData.applicant) {
      const { applicant } = initialData;
      setFormState({
        firstName: applicant.firstName || '',
        lastName: applicant.lastName || '',
        email: applicant.email || '',
        phone: applicant.phone || '',
        city: applicant.city || '',
        state: applicant.state || '',
        country: applicant.country || 'India',
        totalExperienceYears: applicant.totalExperienceYears || '',
        currentCompany: applicant.currentCompany || '',
        currentCTC: applicant.currentCTC || '',
        expectedCTC: applicant.expectedCTC || '',
        noticePeriodDays: applicant.noticePeriodDays || '',
        portfolioUrl: applicant.portfolioUrl || '',
        linkedinUrl: applicant.linkedinUrl || '',
        githubUrl: applicant.githubUrl || '',
        coverLetter: initialData.coverLetter || '',
      });

      // Show the filename if a resume already exists in the record
      if (initialData.resume) {
        const urlParts = initialData.resume.split('/');
        setFileName(urlParts[urlParts.length - 1]);
      }
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFileName(e.target.files[0].name);
      setResumeFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation: Ensure a resume exists (either new upload or existing record)
    if (!resumeFile && !initialData?.resume) {
      return Swal.fire({
        icon: 'error',
        title: 'Resume Required',
        text: 'Please upload your resume to continue.',
        confirmButtonColor: '#E68736',
      });
    }

    const submissionData = new FormData();

    // ✅ Append jobId ONLY for new applications
    if (!applicationId) {
      submissionData.append('jobId', selectedJob.jobId || selectedJob._id);
    }

    // Append form fields (skipping empty ones)
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== '' && formData[key] !== null) {
        submissionData.append(key, formData[key]);
      }
    });

    // Append new resume file if selected
    if (resumeFile) {
      submissionData.append('resume', resumeFile);
    }

    try {
      let response;

      // ✅ Conditional API Call based on mode
      if (applicationId) {
        response = await apiService.updateJobApplication(applicationId, submissionData);
      } else {
        response = await apiService.applyJob(submissionData);
      }

      if (response.status === 200 || response.status === 201) {
        const finalId = response.data?.data?.applicationId || applicationId;
        // ✅ Show Alert and Wait for user to click OK
        await Swal.fire({
          title: applicationId ? 'Update Successful' : 'Application Submitted',
          text: applicationId
            ? 'Your application has been updated successfully.'
            : 'Your application has been submitted successfully.',
          icon: 'success',
          confirmButtonColor: '#E68736',
        });

        // ✅ Close the modal after success acknowledgment
        if (onClose) onClose(finalId);
      }
   } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Something went wrong.',
        confirmButtonColor: '#E68736',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const inputClass =
    'w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 outline-none focus:border-[#E68736] focus:ring-4 focus:ring-[#E68736]/10 focus:bg-white transition-all text-sm font-medium placeholder:text-gray-400';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-[32px] p-8 md:p-12 max-w-3xl w-full relative shadow-2xl animate-fadeInUp max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Close Button */}
        <button
          onClick={() => onClose()}
          className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors"
        >
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

      <div className="mb-8">
          <h2 className="text-3xl font-black text-black">
            {applicationId ? 'Edit Application' : 'Apply for'} {selectedJob.title}
          </h2>
        </div>

        <form className="space-y-8" onSubmit={handleFormSubmit}>
          {/* Personal Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="firstName" required value={formData.firstName} onChange={handleInputChange} className={inputClass} placeholder="First Name" />
              <input name="lastName" required value={formData.lastName} onChange={handleInputChange} className={inputClass} placeholder="Last Name" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="email" type="email" required value={formData.email} onChange={handleInputChange} className={inputClass} placeholder="Email Address" />
              <input name="phone" type="tel" required value={formData.phone} onChange={handleInputChange} className={inputClass} placeholder="Phone Number" />
            </div>
          </div>

          {/* Professional Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Professional Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="currentCompany" value={formData.currentCompany} onChange={handleInputChange} className={inputClass} placeholder="Current Company" />
              <input name="totalExperienceYears" type="number" value={formData.totalExperienceYears} onChange={handleInputChange} className={inputClass} placeholder="Experience (Years)" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input name="currentCTC" value={formData.currentCTC} onChange={handleInputChange} className={inputClass} placeholder="Current CTC" />
              <input name="expectedCTC" value={formData.expectedCTC} onChange={handleInputChange} className={inputClass} placeholder="Expected CTC" />
              <input name="noticePeriodDays" type="number" value={formData.noticePeriodDays} onChange={handleInputChange} className={inputClass} placeholder="Notice Period (Days)" />
            </div>
          </div>

          
         {/* Links Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">
              Portfolios & Links
            </h3>
            <div className="flex flex-col gap-4">
              {/* LinkedIn - Full Width */}
              <div className="relative group">
                <input 
                  name="linkedinUrl" 
                  placeholder="LinkedIn Profile URL (e.g., https://linkedin.com/in/username)" 
                  value={formData.linkedinUrl} 
                  onChange={handleInputChange} 
                  className={inputClass} 
                />
              </div>

              {/* GitHub/Portfolio - Full Width */}
              <div className="relative group">
                <input 
                  name="githubUrl" 
                  placeholder="GitHub or Portfolio URL (e.g., https://github.com/username)" 
                  value={formData.githubUrl} 
                  onChange={handleInputChange} 
                  className={inputClass} 
                />
              </div>

              {/* Other Links - Full Width */}
              <div className="relative group">
                <input 
                  name="portfolioUrl" 
                  placeholder="Other Relevant Links (Behance, Dribbble, Personal Blog)" 
                  value={formData.portfolioUrl} 
                  onChange={handleInputChange} 
                  className={inputClass} 
                />
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Documents</h3>
            {initialData?.resume && !resumeFile && (
              <p className="text-xs text-[#E68736] mb-1 italic">
                Currently: <a href={initialData.resume} target="_blank" rel="noopener noreferrer" className="underline">View Attached Resume</a>
              </p>
            )}
            <input type="file" id="resume-upload" className="hidden" onChange={handleFileChange} accept=".pdf" />
            <label htmlFor="resume-upload" className="w-full flex justify-between items-center border-2 border-dashed border-gray-200 rounded-2xl p-4 cursor-pointer hover:border-[#E68736] transition-colors">
              <span className="truncate pr-4">{fileName || 'Upload New Resume (PDF)'}</span>
              <span className="bg-black text-white px-4 py-2 rounded-lg flex-shrink-0 text-sm">Browse</span>
            </label>
          </div>

          {/* Cover Letter */}
          <textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleInputChange}
            className={`${inputClass} h-32 resize-none`}
            placeholder="Tell us why you are a great fit..."
          />

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full py-5 rounded-[20px] font-black text-xl text-white transition-all ${isSubmitting ? 'bg-gray-400' : 'bg-[#E68736] hover:bg-[#cf762b]'}`}
          >
            {isSubmitting ? 'Saving...' : applicationId ? 'Update Application' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>

  );
};

export default JobApplicationModal;