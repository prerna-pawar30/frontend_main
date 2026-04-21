/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, ArrowRight } from 'lucide-react';

const JobCard = ({ job, index, applicationId }) => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    const id = job.jobId || job._id;
    navigate(`/career/job/${id}`);
  };

  const formatSalary = (val) => (val / 100000).toFixed(1) + 'L';

  return (
    <div
      className="group flex flex-col overflow-hidden rounded-2xl border border-orange-100 bg-white transition-all duration-300 hover:shadow-xl hover:shadow-orange-100/30"
      style={{
        opacity: 0,
        animation: `cardIn 0.55s ease-out ${index * 100}ms both`,
        maxWidth: '400px', // Slightly wider for better text flow
      }}
    >
      <style>{`@keyframes cardIn { from { opacity:0; transform:translateY(15px); } to { opacity:1; transform:translateY(0); } }`}</style>

      {/* Hero Header - Balanced Size */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-5 overflow-hidden">
        <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full border-[10px] border-[#E68736] opacity-10" />
        
        <div className="relative z-10">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#E68736] bg-[#E68736]/15 px-2.5 py-1 rounded">
              {job.employmentType?.replace('_', ' ')}
            </span>
            <div className="flex gap-2">
               {job.isFeatured && (
                <span className="rounded-full bg-[#E68736] px-2.5 py-1 text-[10px] font-black uppercase tracking-tight text-white shadow-md">
                  Featured
                </span>
              )}
              {applicationId && (
                <span className="rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-black uppercase tracking-tight text-white">
                  Applied
                </span>
              )}
            </div>
          </div>

          <h3 className="text-xl font-black leading-tight text-white transition-colors duration-300 group-hover:text-[#E68736]">
            {job.title}
          </h3>

          <div className="mt-3 flex flex-wrap gap-4 text-[13px] font-semibold text-gray-400">
            <span className="flex items-center gap-1.5">
              <Briefcase size={14} className="text-[#E68736]" />
              {job.department}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-[#E68736]" />
              {job.location}
            </span>
          </div>
        </div>
      </div>

      {/* Card Content - Better Breathing Room */}
      <div className="flex flex-1 flex-col p-6">
        
        {/* Quick Stats Grid - Readable Tiles */}
        <div className="mb-5 grid grid-cols-2 gap-3">
          <MetaTile label="Experience" value={`${job.minExperienceYears}–${job.maxExperienceYears} Yr`} />
          <MetaTile label="Level" value={job.experienceLevel} />
          <MetaTile
            label="Vacancies"
            value={`${job.openings} Post${job.openings > 1 ? 's' : ''}`}
          />
          {job.salary?.isVisible ? (
            <MetaTile
              label="Salary (PA)"
              value={`₹${formatSalary(job.salary.min)}–${formatSalary(job.salary.max)}`}
            />
          ) : (
            <MetaTile label="Salary" value="Competitive" />
          )}
        </div>

        {/* Description - Readable Body Text */}
        {job.shortDescription && (
          <p className="mb-5 line-clamp-2 text-[14px] font-medium leading-relaxed text-gray-600">
            {job.shortDescription}
          </p>
        )}

        {/* Skills - Standard Sized Tags */}
        {job.skills?.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-lg bg-slate-50 border border-orange-100 px-3 py-1.5 text-[12px] font-bold text-slate-600 hover:border-[#E68736] hover:text-[#E68736] hover:bg-orange-50 transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Action Button - High Visibility */}
        <div className="mt-auto pt-4 border-t border-slate-100">
          <button
            onClick={handleApplyClick}
            className="group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-[#E68736] py-3.5 text-[13px] font-black uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-slate-900 active:scale-[0.98] shadow-lg shadow-orange-200/50 hover:shadow-slate-200"
          >
            <span>View Details & Apply</span>
            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* Reusable Meta Component - Balanced Hierarchy */
const MetaTile = ({ label, value }) => (
  <div className="rounded-xl bg-[#FFF9F2] px-3 py-2.5 border border-orange-100/30">
    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">{label}</p>
    <p className="text-[14px] font-black text-slate-800 leading-tight">{value}</p>
  </div>
);

export default JobCard;