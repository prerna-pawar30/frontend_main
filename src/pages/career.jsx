/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import apiService from '../api/ApiService';
import JobCard from '../components/career/JobCard';
import JobDetailsModal from '../components/career/JobDetailsModal';
import JobApplicationModal from '../components/career/JobApplicationModal';

/* ── Skeleton Component for Jobs ── */
const JobSkeleton = () => (
  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-48 w-full animate-pulse rounded-2xl bg-gray-100" />
    ))}
  </div>
);

const CareerPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await apiService.getCareerJobs();
      const jobList = response.data?.data?.jobs || response.data?.jobs || response.data;
      if (Array.isArray(jobList)) setJobs(jobList);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white py-14">
      <div className="mx-auto max-w-7xl">
        
        {/* ── HERO SECTION: Renders immediately ── */}
        <section
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-14 sm:px-10 lg:px-20"
        >
          {/* Keyframes moved to a global/higher level or kept here */}
          <style>{`
            @keyframes fadeUp { from { opacity:0; transform:translateY(15px); } to { opacity:1; transform:translateY(0); } }
            @keyframes expandWidth { to { width: 72px; } }
            .hero-anim { animation: fadeUp 0.6s ease-out both; }
          `}</style>

          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border-[22px] border-[#E68736] opacity-10" />
          <div className="pointer-events-none absolute bottom-[-20px] left-[44%] h-24 w-24 rounded-full bg-[#E68736] opacity-[0.08]" />

          <div className="hero-anim">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#E68736]">
              We're Hiring
            </p>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <h1 className="text-4xl font-black leading-tight text-white lg:text-5xl">
                  Build the future <span className="text-[#E68736]">with Digident.</span>
                </h1>
                <p className="mt-4 max-w-xl text-sm text-gray-400 leading-relaxed">
                  We're looking for passionate individuals to help us revolutionize dental
                  manufacturing through technology.
                </p>
                <div
                  className="mt-6 h-[3px] bg-[#E68736]"
                  style={{ width: 0, animation: 'expandWidth 0.9s 0.5s ease-out forwards' }}
                />
              </div>

              {/* Stats: Shows "..." while loading so layout doesn't shift */}
              <div className="flex items-center gap-6">
                {[
                  { val: loading ? '...' : (jobs.length || 0), lbl: 'Open Roles' },
                  { val: 'Surat', lbl: 'Location' },
                  { val: '2019', lbl: 'Founded' },
                ].map((s, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <div className="h-8 w-px bg-gray-700" />}
                    <div className="text-center">
                      <p className="text-xl font-extrabold text-[#E68736]">{s.val}</p>
                      <p className="text-[9px] uppercase tracking-widest text-gray-500">{s.lbl}</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── JOB GRID AREA ── */}
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-[2px] w-5 bg-[#E68736]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E68736]">
              Open Positions
            </span>
          </div>

          {loading ? (
            <JobSkeleton />
          ) : jobs.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-orange-100 p-16 text-center">
              <p className="text-sm font-medium text-gray-400">
                No open positions right now. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job, index) => (
                <JobCard
                  key={job._id || index}
                  job={job}
                  index={index}
                  onViewDetails={(j) => { setSelectedJob(j); setIsApplying(false); }}
                />
              ))}
            </div>
          )}
        </div>

        {/* MODALS */}
        {selectedJob && !isApplying && (
          <JobDetailsModal
            job={selectedJob}
            onClose={() => setSelectedJob(null)}
            onApply={() => setIsApplying(true)}
          />
        )}

        {selectedJob && isApplying && (
          <JobApplicationModal
            selectedJob={selectedJob}
            onClose={(newAppId) => {
              setIsApplying(false);
              fetchJobs(); // Refresh list after application
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CareerPage;