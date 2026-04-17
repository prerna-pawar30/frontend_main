import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../../api/ApiService';
import JobApplicationModal from './JobApplicationModal';
import { 
  ArrowLeft, 
  Briefcase, 
  MapPin, 
  CircleDollarSign, 
  Users, 
  ShieldCheck, 
  Mail,
  ChevronRight
} from 'lucide-react';

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [existingAppId, setExistingAppId] = useState(null);
  const [applicationData, setApplicationData] = useState(null);

  const fetchJobDetails = useCallback(async () => {
    try {
      const response = await apiService.getJobDetails(id);
      const jobData = response.data?.data;

      if (jobData) {
        setJob(jobData);
        if (jobData.applicationId) {
          setExistingAppId(jobData.applicationId);
          const appResponse = await apiService.getJobApplication(jobData.applicationId);
          setApplicationData(appResponse.data?.data);
        }
      }
    } catch (err) {
      console.error("Error fetching job details:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchJobDetails();
  }, [id, fetchJobDetails]);

  const formatSalary = (val) => (val / 100000).toFixed(1) + "L";

  const handleModalClose = (newId) => {
    setIsApplying(false);
    if (newId) {
      setExistingAppId(newId);
      fetchJobDetails();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-orange-100 border-t-[#E68736] rounded-full animate-spin"></div>
        <p className="mt-4 text-zinc-400 font-bold animate-pulse tracking-widest uppercase text-xs">Loading Role Details</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#FAFBFF]">
        <h2 className="text-3xl font-black text-zinc-900">Job Not Found</h2>
        <button 
          onClick={() => navigate('/career')} 
          className="bg-[#E68736] text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-orange-200"
        >
          Return to Careers
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFBFF] py-12 px-4 sm:px-6 lg:px-8 selection:bg-orange-100 selection:text-[#E68736]">
      {/* Animation Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-reveal-up { animation: slideUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-reveal-right { animation: slideInRight 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
      `}} />

      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="animate-reveal-up" style={{ animationDelay: '50ms', opacity: 0 }}>
          <button
            onClick={() => navigate('/career')}
            className="flex items-center gap-2 text-zinc-400 hover:text-[#E68736] mb-10 font-bold transition-all group"
          >
            <div className="p-2 rounded-xl bg-white border border-zinc-100 group-hover:border-orange-200 shadow-sm transition-colors">
              <ArrowLeft size={18} />
            </div>
          
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 animate-reveal-up" style={{ animationDelay: '150ms', opacity: 0 }}>
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12  border border-orange-100">
              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="bg-orange-50 text-[#E68736] px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-orange-100">
                  {job.employmentType?.replace('_', ' ')}
                </span>
                <span className="bg-zinc-900 text-white px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-zinc-200">
                  {job.experienceLevel} Level
                </span>
              </div>

              <h1 className="text-4xl md:text-3xl font-black text-zinc-900 mb-6 leading-tight tracking-tight">
                {job.title}
              </h1>
              
              <div className="flex flex-wrap gap-6 text-zinc-400 font-semibold mb-12">
                <div className="flex items-center gap-2">
                  <Briefcase size={18} className="text-[#E68736]" /> {job.department}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-[#E68736]" /> {job.location} ({job.workplaceType})
                </div>
              </div>

              <div className="space-y-16">
                <section>
                  <h3 className="text-xl font-black text-zinc-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-1 bg-[#E68736] rounded-full"></span> 
                    Role Overview
                  </h3>
                  <p className="text-zinc-600 text-lg leading-relaxed font-medium">
                    {job.shortDescription}
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-black text-zinc-900 mb-6 flex items-center gap-3">
                    <span className="w-8 h-1 bg-[#E68736] rounded-full"></span> 
                    Detailed Description
                  </h3>
                  <div className="space-y-5 text-zinc-600 leading-relaxed text-lg">
                    {job.description?.map((para, i) => (
                      <p key={i} className={para.type === 'heading' ? "font-bold text-zinc-900 text-xl pt-4" : ""}>
                        {para.text}
                      </p>
                    ))}
                  </div>
                </section>

                <div>
                  <ListSection title="Responsibilities" data={job.responsibilities} />
                 
                </div>
                <div>
                 <ListSection title="Requirements" data={job.requirements} />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-10 space-y-6 animate-reveal-right" style={{ animationDelay: '300ms', opacity: 0 }}>
              
              {/* Stats Card */}
              <div className="bg-white rounded-[2.5rem] p-8  border border-orange-100 relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-50 rounded-full blur-3xl group-hover:bg-orange-100 transition-colors duration-700"></div>
                
                <h4 className="text-zinc-900 font-black text-lg mb-8 relative z-10">Job Highlights</h4>
                
                <div className="space-y-6 mb-10 relative z-10">
                  <SidebarInfo icon={<Users />} label="Vacancies" value={`${job.openings} Openings`} />
                  <SidebarInfo icon={<Briefcase />} label="Experience" value={`${job.minExperienceYears}-${job.maxExperienceYears} Years`} />
                  <SidebarInfo icon={<CircleDollarSign />} label="Salary Range" value={job.salary?.isVisible ? `₹${formatSalary(job.salary.min)} - ${formatSalary(job.salary.max)}` : "Not Disclosed"} />
                  <SidebarInfo icon={<ShieldCheck />} label="Role Status" value={job.status} isStatus />
                </div>

                <button
                  onClick={() => setIsApplying(true)}
                  className={`w-full py-5 flex items-center justify-center gap-3 rounded-2xl font-black text-lg transition-all duration-300 transform active:scale-[0.98] shadow-lg relative z-10 ${
                    existingAppId 
                    ? "bg-zinc-900 text-white hover:bg-black" 
                    : "bg-[#E68736] text-white hover:bg-[#d1762d] shadow-orange-200/50"
                  }`}
                >
                  <span>{existingAppId ? "Update Application" : "Apply Now"}</span>
                  <ChevronRight size={20} />
                </button>
                
                <p className="text-center text-[10px] text-zinc-400 mt-5 font-bold uppercase tracking-[0.1em] relative z-10">
                  Digident Recruitment Team
                </p>
              </div>
              
              {/* Help Box */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[2.2rem] p-8 text-white transition-all hover:translate-y-[-5px]">
                <div className="bg-[#E68736]/20 p-3 rounded-xl w-fit mb-5">
                   <Mail className="text-[#E68736]" size={24} />
                </div>
                <h4 className="font-bold text-lg mb-2">Have Questions?</h4>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  Interested in the role but need more details? Our team is here to help.
                </p>
                <a href="mailto:info@digident.in" className="text-[#E68736] font-black text-sm hover:underline">
                  info@digident.in
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {isApplying && (
        <JobApplicationModal
          selectedJob={job}
          applicationId={existingAppId}
          initialData={applicationData}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

/* 🔹 SUB-COMPONENTS */

const SidebarInfo = ({ icon, label, value, isStatus }) => (
  <div className="flex items-start gap-4">
    <div className="mt-0.5 p-2 bg-zinc-50 rounded-xl text-[#E68736] group-hover:bg-orange-50 transition-colors">
      {React.cloneElement(icon, { size: 18 })}
    </div>
    <div>
      <p className="text-[10px] text-zinc-400 uppercase font-black tracking-widest mb-0.5">{label}</p>
      <p className={`font-bold text-zinc-800 ${isStatus ? 'capitalize' : ''}`}>{value}</p>
    </div>
  </div>
);

const ListSection = ({ title, data }) => (
  <section className="h-full">
    <h4 className="text-lg font-black text-zinc-900 mb-6 flex items-center gap-2">
      {title}
    </h4>
    {data?.length ? (
      <ul className="space-y-4">
        {data.map((item, i) => (
          <li key={i} className="flex gap-4 text-zinc-600 text-md leading-relaxed group">
            <div className="min-w-[8px] h-[8px] rounded-full border-2 border-[#E68736] mt-[9px] group-hover:bg-[#E68736] transition-colors" />
            <span className="font-medium">{item}</span>
          </li>
        ))}
      </ul>
    ) : (
      <div className="p-4 rounded-xl bg-zinc-50 border border-dashed border-zinc-200 text-zinc-400 text-sm italic">
        No specific details provided.
      </div>
    )}
  </section>
);

export default JobDetailsPage;