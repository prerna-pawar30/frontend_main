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
  ChevronRight,
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
          const appRes = await apiService.getJobApplication(jobData.applicationId);
          setApplicationData(appRes.data?.data);
        }
      }
    } catch (err) {
      console.error('Error fetching job details:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchJobDetails();
  }, [id, fetchJobDetails]);

  const formatSalary = (val) => (val / 100000).toFixed(1) + 'L';

  const handleModalClose = (newId) => {
    setIsApplying(false);
    if (newId) {
      setExistingAppId(newId);
      fetchJobDetails();
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-100 border-t-[#E68736]" />
        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-gray-400 animate-pulse">
          Loading Role Details
        </p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-white">
        <h2 className="text-3xl font-black text-gray-900">Job Not Found</h2>
        <button
          onClick={() => navigate('/career')}
          className="rounded-2xl bg-[#E68736] px-8 py-3 font-bold text-white shadow-lg shadow-orange-200"
        >
          Return to Careers
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white py-14">
      <div className="mx-auto max-w-7xl">
              <style>{`
        @keyframes fadeUp   { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeLeft { from { opacity:0; transform:translateX(-24px);} to { opacity:1; transform:translateX(0); } }
        @keyframes fadeRight{ from { opacity:0; transform:translateX(24px); } to { opacity:1; transform:translateX(0); } }
        @keyframes expandWidth { to { width: 72px; } }
        .anim-up    { animation: fadeUp    0.65s ease-out both; }
        .anim-left  { animation: fadeLeft  0.65s ease-out both; }
        .anim-right { animation: fadeRight 0.65s ease-out both; }
      `}</style>

      {/* ── BLACK HERO ── */}
      <section className="anim-up relative overflow-hidden rounded-2xl  bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-10 sm:px-10 lg:px-20">
        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border-[22px] border-[#E68736] opacity-10" />
        <div className="pointer-events-none absolute bottom-[-20px] left-[42%] h-24 w-24 rounded-full bg-[#E68736] opacity-[0.08]" />

        <div className="mx-auto max-w-7xl">
          {/* Back button */}
          <button
            onClick={() => navigate('/career')}
            className="mb-6 flex items-center gap-2 text-gray-500 transition-colors hover:text-[#E68736]"
          >
            <div className="rounded-lg border border-white/10 p-1.5 transition-colors hover:border-[#E68736]">
              <ArrowLeft size={15} className="text-gray-400" />
            </div>
            <span className="text-[12px] font-bold uppercase tracking-widest">Back to Careers</span>
          </button>

          <p className="mb-2 text-[26px] font-bold uppercase  text-[#E68736]">
            Career Opportunity
          </p>

          {/* Badges */}
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#E68736] px-3 py-1 text-[12px] font-bold uppercase tracking-widest text-white">
              {job.employmentType?.replace('_', ' ')}
            </span>
            <span className="rounded-full border border-white/20 px-3 py-1 text-[12px] font-bold uppercase tracking-widest text-white">
              {job.experienceLevel} Level
            </span>
          </div>

          {/* Title + stats two-col */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-14">
            <div className="flex-1">
              <h1 className="text-3xl font-black leading-tight text-white lg:text-5xl">{job.title}</h1>
              <div className="mt-3 flex flex-wrap gap-4 text-xm text-gray-400">
                <span className="flex items-center gap-1.5">
                  <Briefcase size={12} className="text-[#E68736]" /> {job.department}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-[#E68736]" /> {job.location} ({job.workplaceType})
                </span>
              </div>
              <div
                className="mt-5 h-[3px] bg-[#E68736]"
                style={{ width: 0, animation: 'expandWidth 0.9s 0.5s ease-out forwards' }}
              />
            </div>

            {/* Quick stats */}
           <div className="mt-10 self-end">
      <div className="flex items-center gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
        {[
          { val: `${job.openings}`, lbl: 'Openings' },
          { val: `${job.minExperienceYears}–${job.maxExperienceYears}yr`, lbl: 'Experience' },
          {
            val: job.salary?.isVisible ? `₹${formatSalary(job.salary.min)} yr` : 'N/A',
            lbl: 'Min Salary',
          },
        ].map((s, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div className="h-7 w-px bg-gray-700" />}
                  <div className="text-center">
                    <p className="text-[16px] font-extrabold text-[#E68736]">{s.val}</p>
                    <p className="text-[12px] uppercase font-bold text-gray-500">{s.lbl}</p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* ── MAIN CONTENT + SIDEBAR ── */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">

          {/* ── Article-style content ── */}
          <div className="anim-left lg:col-span-7" style={{ animationDelay: '150ms' }}>

            {/* Role Overview */}
            <ContentSection label="Role Overview">
              <p className="text-[18px] leading-relaxed text-gray-400">{job.shortDescription}</p>
            </ContentSection>

            {/* Description blocks */}
            {job.description?.length > 0 && (
              <ContentSection label="Detailed Description">
                <div className="flex flex-col gap-3">
                  {job.description.map((para, i) =>
                    para.type === 'heading' ? (
                      <h4 key={i} className="mt-4 text-base font-extrabold text-black">
                        {para.text}
                      </h4>
                    ) : (
                      <p key={i} className="text-[18px] leading-relaxed text-gray-400">
                        {para.text}
                      </p>
                    )
                  )}
                </div>
              </ContentSection>
            )}

            {/* Responsibilities + Requirements side-by-side on desktop */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-1">
              <BulletCard title="Responsibilities" data={job.responsibilities} />
              <BulletCard title="Requirements" data={job.requirements} />
            </div>
          </div>

          {/* ── Sticky Sidebar ── */}
          <div className="anim-right lg:col-span-5" style={{ animationDelay: '250ms' }}>
            <div className="sticky top-20 flex flex-col gap-5">

              {/* Job highlights card — black */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-7 ">
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full border-[14px] border-[#E68736] opacity-10" />

                <h4 className="mb-5 text-xl font-extrabold text-white">Job Highlights</h4>

                <div className="mb-6 flex flex-col gap-4">
                  <SidebarTile
                    icon={<Users size={14} />}
                    label="Vacancies"
                    value={`${job.openings} Openings`}
                  />
                  <SidebarTile
                    icon={<Briefcase size={14} />}
                    label="Experience"
                    value={`${job.minExperienceYears}–${job.maxExperienceYears} Years`}
                  />
                  <SidebarTile
                    icon={<CircleDollarSign size={14} />}
                    label="Salary"
                    value={
                      job.salary?.isVisible
                        ? `₹${formatSalary(job.salary.min)} – ₹${formatSalary(job.salary.max)}`
                        : 'Not Disclosed'
                    }
                  />
                  <SidebarTile
                    icon={<ShieldCheck size={14} />}
                    label="Status"
                    value={job.status}
                  />
                </div>

                <button
                  onClick={() => setIsApplying(true)}
                  className={`w-full rounded-full py-4 text-xs font-black uppercase tracking-widest text-white shadow-lg transition-all active:scale-[0.97] ${
                    existingAppId
                      ? 'bg-white/10 hover:bg-white/20'
                      : 'bg-[#E68736] shadow-orange-600/20 hover:opacity-90'
                  }`}
                >
                  {existingAppId ? 'Update Application ' : 'Apply Now '}
                </button>

                <p className="mt-4 text-center text-[12px] font-bold uppercase  text-gray-500">
                  Digident Recruitment Team
                </p>
              </div>

              {/* Help card — white with orange border accent */}
              <div className="overflow-hidden rounded-2xl border border-orange-200 bg-white p-6">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#fdf5ec]">
                  <Mail size={20} className="text-[#E68736]" />
                </div>
                <h4 className="mb-1 text-[16px] font-extrabold text-black">Have Questions?</h4>
                <p className="mb-3 text-[16px] leading-relaxed text-gray-500">
                  Interested in the role but need more details? Our team is here to help.
                </p>
                <a
                  href="mailto:info@digident.in"
                  className="text-xs font-black uppercase tracking-widest text-[#E68736] hover:underline"
                >
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
    </div>
  );
};

/* ── Sub-components ── */

const ContentSection = ({ label, children }) => (
  <div className="mb-6">
    <div className="mb-4 flex items-center gap-3">
      <span className="h-[2px] w-5 bg-[#E68736]" />
      <span className="text-[18px] font-bold uppercase tracking-[0.25em] text-[#E68736]">{label}</span>
    </div>
    {children}
  </div>
);

const BulletCard = ({ title, data }) => (
  <div className="rounded-xl border border-orange-200 bg-white p-5">
    <div className="mb-4 flex items-center gap-3">
      <span className="h-[2px] w-4 bg-[#E68736]" />
      <span className="text-[16px] font-bold  tracking-[0.2em] text-[#E68736]">{title}</span>
    </div>
    {data?.length ? (
      <ul className="flex flex-col gap-2.5">
        {data.map((item, i) => (
          <li key={i} className="flex gap-3 text-[16px] leading-relaxed text-gray-600">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full border-2 border-[#E68736]" />
            {item}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-xs italic text-gray-400">No specific details provided.</p>
    )}
  </div>
);

const SidebarTile = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#E68736]">
      {icon}
    </div>
    <div>
      <p className="text-[16px] font-bold text-gray-400">{label}</p>
      <p className="text-[15px] font-bold text-white">{value}</p>
    </div>
  </div>
);

export default JobDetailsPage;
