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
      <div key={i} className="h-48 w-full animate-pulse rounded-2xl bg-slate-100" />
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ── HERO SECTION: Dark Theme ── */}
        <section
          className="relative overflow-hidden rounded-[2rem] px-6 py-16 sm:px-10 lg:px-20 border border-slate-800"
          style={{ background: 'linear-gradient(135deg, #0f172a 20%, #1e293b 100%)' }}
        >
          {/* Global Animations */}
          <style>{`
            @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
            @keyframes expandWidth { to { width: 80px; } }
            .hero-anim { animation: fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
          `}</style>

          {/* Decorative Elements */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full border-[25px] border-orange-500 opacity-[0.03] blur-sm" />
          <div className="pointer-events-none absolute bottom-[-30px] left-[40%] h-32 w-32 rounded-full bg-orange-500 opacity-[0.02] blur-xl" />

          <div className="hero-anim relative z-10">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.4em] text-orange-400">Join Our Team</p>

            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1 max-w-2xl">
                <h1 className="text-xl font-extrabold leading-tight text-white lg:text-4xl tracking-tight">
                  Build the future <span className="text-orange-400">with Digident.</span>
                </h1>

                <p className="mt-6 max-w-xl text-base text-slate-300 leading-relaxed font-medium">
                  We're looking for passionate individuals to help us revolutionize dental
                  manufacturing through cutting-edge technology and innovation.
                </p>
                
                {/* Animated underline */}
                <div
                  className="mt-8 h-[4px] bg-orange-500 rounded-full"
                  style={{ width: 0, animation: 'expandWidth 1s 0.6s ease-out forwards' }}
                />
              </div>

              {/* Stats: Dark Mode Optimized */}
              <div className="flex items-center gap-8 bg-slate-900/60 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm shadow-xl shadow-slate-950/20">
                {[
                  { val: loading ? '...' : (jobs.length || 0), lbl: 'Open Roles' },
                  { val: 'Surat', lbl: 'Location' },
                  { val: '2016', lbl: 'Founded' },
                ].map((s, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <div className="h-10 w-px bg-slate-700" />}
                    <div className="text-center">
                      <p className="text-3xl font-extrabold text-white tracking-tight">{s.val}</p>
                      <p className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">{s.lbl}</p>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── JOB GRID AREA: Light Theme ── */}
        <div className="py-16">
          <div className="mb-10 flex items-center gap-4">
            <span className="h-[3px] w-6 bg-orange-500 rounded-full" />
            <h2 className="text-[12px] font-black uppercase tracking-[0.3em] text-orange-500">
              Open Positions
            </h2>
          </div>

          {loading ? (
            <JobSkeleton />
          ) : jobs.length === 0 ? (
            <div className="rounded-3xl border-2 border-dashed border-slate-100 bg-slate-50/50 p-20 text-center shadow-inner">
              <p className="text-base font-semibold text-slate-500">
                No open positions right now. Check back soon!
              </p>
              <p className="mt-2 text-sm text-slate-400">Or send us your resume at careers@digident.com</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        )
}

        {selectedJob && isApplying && (
          <JobApplicationModal
            selectedJob={selectedJob}
            onClose={(newAppId) => {
              setIsApplying(false);
              setSelectedJob(null);
              fetchJobs(); // Refresh list after application
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CareerPage;