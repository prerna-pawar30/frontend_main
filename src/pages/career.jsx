/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import apiService from '../api/ApiService';
import JobCard from '../components/career/JobCard';
import JobDetailsModal from '../components/career/JobDetailsModal';
import JobApplicationModal from '../components/career/JobApplicationModal';

/* ── Skeleton Component for Jobs ── */
const JobSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-44 sm:h-48 w-full animate-pulse rounded-2xl bg-slate-100" />
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
    
    // Inject global keyframe animations clean and safe from structural rendering cycles
    const styleNode = document.createElement("style");
    styleNode.innerHTML = `
      @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
      @keyframes expandWidth { to { width: 80px; } }
      .hero-anim { animation: fadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) both; }
    `;
    document.head.appendChild(styleNode);
    return () => styleNode.remove();
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
    <div className="min-h-screen overflow-x-hidden bg-white py-6 sm:py-10 lg:py-14 w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        
        {/* ── HERO SECTION: Dark Theme ── */}
        <section
          className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] px-4 py-8 sm:p-12 lg:p-20 border border-slate-800 w-full"
          style={{ background: 'linear-gradient(135deg, #0f172a 20%, #1e293b 100%)' }}
        >
          {/* Decorative Backdrops */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full border-[25px] border-orange-500 opacity-[0.02] blur-sm hidden md:block" />
          <div className="pointer-events-none absolute bottom-[-30px] left-[40%] h-32 w-32 rounded-full bg-orange-500 opacity-[0.02] blur-xl" />

          <div className="hero-anim relative z-10 w-full">
            <p className="mb-2 sm:mb-4 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] sm:tracking-[0.4em] text-orange-400">
              Join Our Team
            </p>

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between w-full">
              <div className="w-full lg:max-w-2xl min-w-0">
                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-white tracking-tight break-words">
                  Build the future <span className="text-orange-400">with Digident.</span>
                </h1>

                <p className="mt-3 sm:mt-6 max-w-xl text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-medium break-words">
                  We're looking for passionate individuals to help us revolutionize dental
                  manufacturing through cutting-edge technology and innovation.
                </p>
                
                {/* Animated underline indicator line bar */}
                <div
                  className="mt-5 sm:mt-8 h-[4px] bg-orange-500 rounded-full"
                  style={{ width: 0, animation: 'expandWidth 0.8s 0.4s ease-out forwards' }}
                />
              </div>

              {/* Stats Layout Panel Module Frame */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-slate-800 backdrop-blur-sm shadow-xl shadow-slate-950/20 w-full lg:w-auto lg:min-w-[400px]">
                {[
                  { val: loading ? '...' : (jobs.length || 0), lbl: 'Open Roles' },
                  { val: 'Surat', lbl: 'Location' },
                  { val: '2016', lbl: 'Founded' },
                ].map((s, i) => (
                  <div key={i} className="text-center min-w-0 flex flex-col justify-center border-r last:border-r-0 border-slate-800/80 pr-1 last:pr-0">
                    <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-white tracking-tight truncate">
                      {s.val}
                    </p>
                    <p className="mt-1 text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-wider sm:tracking-widest text-slate-400 truncate">
                      {s.lbl}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── JOB GRID AREA: Light Theme ── */}
        <div className="py-8 sm:py-16 w-full">
          <div className="mb-6 sm:mb-10 flex items-center gap-2 sm:gap-4">
            <span className="h-[3px] w-4 sm:w-6 bg-orange-500 rounded-full flex-shrink-0" />
            <h2 className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-orange-500">
              Open Positions
            </h2>
          </div>

          {loading ? (
            <JobSkeleton />
          ) : jobs.length === 0 ? (
            <div className="rounded-2xl sm:rounded-3xl border-2 border-dashed border-slate-100 bg-slate-50/50 p-8 sm:p-20 text-center shadow-inner w-full">
              <p className="text-xs sm:text-base font-semibold text-slate-500 break-words">
                No open positions right now. Check back soon!
              </p>
              <p className="mt-1.5 text-[11px] sm:text-sm text-slate-400 break-all px-2">
                Or send us your resume at careers@digident.com
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 w-full">
              {jobs.map((job, index) => (
                <div key={job._id || index} className="w-full min-w-0 overflow-hidden">
                  <JobCard
                    job={job}
                    index={index}
                    onViewDetails={(j) => { setSelectedJob(j); setIsApplying(false); }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MODALS LAYOUT DOM RENDERING ENTRY CONFIG */}
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
              setSelectedJob(null);
              fetchJobs();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CareerPage;