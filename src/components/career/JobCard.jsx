/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Users, CircleDollarSign } from 'lucide-react';

const JobCard = ({ job, index, applicationId, onViewDetails }) => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    const id = job.jobId || job._id;
    navigate(`/career/job/${id}`);
  };

  const formatSalary = (val) => (val / 100000).toFixed(1) + 'L';

  return (
    <div
      className="group flex flex-col overflow-hidden rounded-xl border border-orange-200 bg-white transition-shadow duration-300 hover:shadow-md"
      style={{
        opacity: 0,
        animation: `cardIn 0.55s ease-out ${index * 100}ms both`,
      }}
    >
      <style>{`@keyframes cardIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`}</style>

      {/* Image-style top bar — orange accent bottom border like BlogList cards */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-5 pt-5 pb-4 overflow-hidden">
        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full border-[10px] border-[#E68736] opacity-10" />

        {/* Employment type + featured badge */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#E68736]">
            {job.employmentType?.replace('_', ' ')}
          </span>
          {job.isFeatured && (
            <span className="rounded bg-[#E68736] px-2 py-0.5 text-[8px] font-black uppercase tracking-tight text-white">
              Featured
            </span>
          )}
          {applicationId && (
            <span className="rounded bg-white/10 px-2 py-0.5 text-[8px] font-black uppercase tracking-tight text-white">
              Applied
            </span>
          )}
        </div>

        <h3 className="text-base font-extrabold leading-snug text-white transition-colors duration-300 group-hover:text-[#E68736]">
          {job.title}
        </h3>

        <div className="mt-2 flex flex-wrap gap-3 text-[10px] text-gray-400">
          <span className="flex items-center gap-1">
            <Briefcase size={10} className="text-[#E68736]" />
            {job.department}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={10} className="text-[#E68736]" />
            {job.location}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">

        {/* Meta grid */}
        <div className="mb-3 grid grid-cols-2 gap-2">
          <MetaTile label="Experience" value={`${job.minExperienceYears}–${job.maxExperienceYears} yrs`} />
          <MetaTile label="Level" value={job.experienceLevel} />
          <MetaTile
            label="Vacancies"
            value={`${job.openings} Opening${job.openings > 1 ? 's' : ''}`}
          />
          {job.salary?.isVisible && (
            <MetaTile
              label="Salary"
              value={`₹${formatSalary(job.salary.min)}–${formatSalary(job.salary.max)} PA`}
            />
          )}
        </div>

        {/* Short description */}
        {job.shortDescription && (
          <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-gray-500">
            {job.shortDescription}
          </p>
        )}

        {/* Skills */}
        {job.skills?.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="rounded border border-orange-100 px-2 py-0.5 text-[10px] font-medium text-gray-500 transition-all duration-150 hover:border-[#E68736] hover:text-[#E68736]"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto border-t border-dashed border-orange-100 pt-3">
          <button
            onClick={handleApplyClick}
            className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#E68736] py-2.5 text-[9px] font-black uppercase tracking-widest text-white bg-[#E68736] transition-all duration-200 hover:bg-white hover:text-[#E68736] active:scale-[0.98]"
          >
            <span>View Details & Apply</span>
            
          </button>
        </div>
      </div>
    </div>
  );
};

/* 2-column meta tile */
const MetaTile = ({ label, value }) => (
  <div className="rounded-lg bg-[#fdf5ec] px-3 py-2">
    <p className="text-[8px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
    <p className="mt-0.5 text-xs font-extrabold text-[#E68736] leading-tight">{value}</p>
  </div>
);

export default JobCard;
