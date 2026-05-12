/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, ArrowRight, Star } from 'lucide-react';

const JobCard = ({ job, index }) => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    const id = job.jobId || job._id;
    navigate(`/career/job/${id}`);
  };

  const formatSalary = (val) => (val / 100000).toFixed(1) + 'L';

  return (
    <div
      className="group flex flex-col overflow-hidden rounded-[2rem] border border-orange-200 bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-orange-200/50 hover:-translate-y-1"
      style={{
        opacity: 0,
        animation: `cardIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${index * 100}ms both`,
        maxWidth: '400px',
      }}
    >
      <style>{`@keyframes cardIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>

      {/* --- DARK HEADER SECTION --- */}
      <div
        className="relative px-6 py-8 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 20%, #1e293b 100%)' }}
      >
        {/* Decorative Glow */}
        <div className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full border-[12px] border-orange-500 opacity-10 blur-xl transition-all duration-500 group-hover:opacity-25 group-hover:scale-125" />

        {/* Badge Row */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#E68736] bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-lg backdrop-blur-md">
            {job.employmentType?.replace('_', ' ')}
          </span>
          <Star size={16} className="text-slate-500 group-hover:text-orange-400 transition-colors" />
        </div>

        {/* Job Title */}
        <h3 className="text-2xl font-bold leading-tight text-white transition-colors duration-300 group-hover:text-orange-400">
          {job.title}
        </h3>

        {/* Header Meta Icons */}
        <div className="mt-5 flex flex-wrap gap-4 text-[16px] font-medium text-slate-400">
          <span className="flex items-center gap-1.5 transition-colors group-hover:text-slate-200">
            <Briefcase size={16} className="text-orange-500" /> 
            {job.department}
          </span>
          <span className="flex items-center gap-1.5 transition-colors group-hover:text-slate-200">
            <MapPin size={16} className="text-orange-500" /> 
            {job.location}
          </span>
        </div>

        {/* Animated bottom line */}
        <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-orange-500 transition-all duration-700 group-hover:w-full" />
      </div>

      {/* --- LIGHT BODY SECTION --- */}
      <div className="flex flex-1 flex-col p-6 bg-white">
        
        {/* Stats Grid */}
        <div className="mb-6 grid grid-cols-2 gap-3 ">
          <MetaTile label="Experience " value={`${job.minExperienceYears}–${job.maxExperienceYears} Yr`} />
          <MetaTile label="Level" value={job.experienceLevel} />
          <MetaTile
            label="Vacancies"
            value={`${job.openings} Post${job.openings > 1 ? 's' : ''}`}
          />
          <MetaTile
            label="Salary (PA)"
            value={job.salary?.isVisible ? `₹${formatSalary(job.salary.min)}–${formatSalary(job.salary.max)}` : "Competitive"}
          />
        </div>

        {/* Short Description */}
        {job.shortDescription && (
          <p className="mb-6 line-clamp-2 text-[14px] font-medium leading-relaxed text-gray-500 italic">
            "{job.shortDescription}"
          </p>
        )}

        {/* Skills Tags */}
        {job.skills?.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {job.skills.slice(0, 4).map((skill) => (
              <span
                key={skill}
                className="rounded-lg bg-slate-50 border border-slate-100 px-3 py-1.5 text-[13px] font-bold text-slate-600 transition-all hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Action Button - Vivid Orange */}
        <div className="mt-auto pt-6 border-t border-slate-50">
          <button
            onClick={handleApplyClick}
            className="group/btn relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl py-4 text-[14px] font-black uppercase tracking-[0.1em] text-white transition-all duration-300 active:scale-[0.96]  hover:shadow-orange-400/40"
            style={{ background: 'linear-gradient(135deg, #FF9D4D 0%, #E68736 100%)' }}
          >
            <span className="relative z-10">View Details & Apply</span>
            <ArrowRight size={18} className="relative z-10 transition-transform group-hover/btn:translate-x-1.5" />
            
            {/* Glossy Overlay effect on hover */}
            <div className="absolute inset-0 z-0 bg-white opacity-0 transition-opacity duration-300 group-hover/btn:opacity-10" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* Reusable Meta Tile - Matches Light Body */
const MetaTile = ({ label, value }) => (
  <div className="rounded-2xl bg-orange-50/50 px-4 py-3 border border-orange-100/50 transition-colors hover:bg-orange-50 hover:border-orange-200">
    <p className="text-[13px] font-bold  text-orange-400 mb-1">{label}</p>
    <p className="text-[13px] font-extrabold text-slate-800 leading-tight">{value}</p>
  </div>
);

export default JobCard;