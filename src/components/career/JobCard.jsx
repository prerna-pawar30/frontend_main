import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job, index }) => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    const id = job.jobId || job._id;
    navigate(`/career/job/${id}`);
  };

  return (
    <div
      className="bg-white border border-orange-200 rounded-xl p-5 flex flex-col gap-3 animate-fadeInUp hover:border-[#E68736]/40 hover:shadow-md transition-all duration-200"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Top: Title + badges */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[15px] font-black uppercase tracking-widest text-[#E68736]">
            {job.employmentType?.replace('_', ' ')}
          </span>
          {job.isFeatured && (
            <span className="text-[9px] bg-black text-white px-2 py-0.5 rounded font-black uppercase tracking-tight">
              Featured
            </span>
          )}
        </div>
        <h3 className="text-[20px] font-black text-gray-900 leading-tight">
          {job.title}
        </h3>
        <p className="text-[14px] text-gray-400 mt-0.5">
          {job.department} • {job.location}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-orange-50" />

      {/* Meta info — inline label: value pairs like Library cards */}
<div className="flex flex-col gap-1.5">
  <MetaRow label="Experience" value={`${job.minExperienceYears}–${job.maxExperienceYears} Years`} />
  <MetaRow label="Level" value={job.experienceLevel} />
  <MetaRow label="Vacancy" value={`${job.openings} Opening${job.openings > 1 ? 's' : ''}`} />
  
  {job.salary?.isVisible && (
    <MetaRow 
      label="Salary" 
      value={`₹${(job.salary.min / 100000).toFixed(1)}L – ₹${(job.salary.max / 100000).toFixed(1)}L PA`} 
    />
  )}
</div>

      {/* Short Description */}
      {job.shortDescription && (
        <p className="text-[14px] text-gray-500 leading-relaxed line-clamp-2">
         <span className="font-bold text-gray-500 text-[14px]">Job Description: </span> {job.shortDescription}
        </p>
      )}

      {/* Skills */}
      <div className="flex flex-wrap gap-1">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="text-[12px] font-medium px-2 py-0.5 rounded border border-orange-200 text-gray-500 hover:border-[#E68736] hover:text-[#E68736] transition-all duration-150 "
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Button — same style as Library DOWNLOAD button */}
      <button
        onClick={handleApplyClick}
        className="mt-auto w-full flex items-center justify-center gap-2 border border-[#E68736] text-[#E68736] text-xs font-black uppercase tracking-widest py-2.5 rounded-lg hover:bg-[#E68736] hover:text-white transition-all duration-200 active:scale-[0.98]"
      >
        View Details & Apply
      </button>
    </div>
  );
};

/* Inline label: value row — matches Library card meta style */
const MetaRow = ({ label, value }) => (
  <div className="flex items-center gap-1.5 text-[14px]">
    <span className="text-gray-600 font-bold tracking-wider">{label}:</span>
    <span className="text-[#E68736] font-semibold">{value}</span>
  </div>
);

export default JobCard;