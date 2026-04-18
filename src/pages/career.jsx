/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import apiService from '../api/ApiService';
import JobCard from '../components/career/JobCard';
import JobDetailsModal from '../components/career/JobDetailsModal';
import JobApplicationModal from '../components/career/JobApplicationModal';

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
      {/* ── BLACK HERO ── */}
      <section
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-14 sm:px-10 lg:px-20"
        style={{ animation: 'fadeUp 0.7s ease-out both' }}
      >
        <style>{`
          @keyframes fadeUp   { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
          @keyframes fadeLeft { from { opacity:0; transform:translateX(-24px);} to { opacity:1; transform:translateX(0); } }
          @keyframes fadeRight{ from { opacity:0; transform:translateX(24px); } to { opacity:1; transform:translateX(0); } }
          @keyframes scaleIn  { from { opacity:0; transform:scale(0.94);      } to { opacity:1; transform:scale(1);      } }
          .anim-up    { animation: fadeUp    0.6s ease-out both; }
          .anim-left  { animation: fadeLeft  0.6s ease-out both; }
          .anim-right { animation: fadeRight 0.6s ease-out both; }
          .anim-scale { animation: scaleIn   0.5s ease-out both; }
        `}</style>

        {/* Decorative circles */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border-[22px] border-[#E68736] opacity-10" />
        <div className="pointer-events-none absolute bottom-[-20px] left-[44%] h-24 w-24 rounded-full bg-[#E68736] opacity-[0.08]" />

        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#E68736]">
            We're Hiring
          </p>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-black leading-tight text-white lg:text-5xl">
                Build the future{' '}
                <span className="text-[#E68736]">with Digident.</span>
              </h1>
              <p className="mt-4 max-w-xl text-sm text-gray-400 leading-relaxed">
                We're looking for passionate individuals to help us revolutionize dental
                manufacturing through technology.
              </p>
              <div
                className="mt-6 h-[3px] bg-[#E68736]"
                style={{ width: 0, animation: 'expandWidth 0.9s 0.5s ease-out forwards' }}
              />
              <style>{`@keyframes expandWidth { to { width: 72px; } }`}</style>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              {[
                { val: jobs.length || '—', lbl: 'Open Roles' },
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

      {/* ── JOB GRID ── */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-7 flex items-center gap-3">
          <span className="h-[2px] w-5 bg-[#E68736]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E68736]">
            Open Positions
          </span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-24 gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-100 border-t-[#E68736]" />
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Finding opportunities...
            </p>
          </div>
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
                applicationId={job.applicationId}
                onViewDetails={(j) => { setSelectedJob(j); setIsApplying(false); }}
              />
            ))}
          </div>
        )}
      </div>

      {/* DETAILS MODAL */}
      {selectedJob && !isApplying && (
        <JobDetailsModal
          job={selectedJob}
          applicationId={selectedJob.applicationId}
          onClose={() => setSelectedJob(null)}
          onApply={() => setIsApplying(true)}
        />
      )}

      {/* APPLICATION MODAL */}
      {selectedJob && isApplying && (
        <JobApplicationModal
          selectedJob={selectedJob}
          applicationId={selectedJob.applicationId}
          onClose={(newAppId) => {
            setIsApplying(false);
            if (newAppId) {
              setJobs((prev) =>
                prev.map((j) =>
                  j._id === selectedJob._id ? { ...j, applicationId: newAppId } : j
                )
              );
            }
            fetchJobs();
          }}
        />
      )}
      </div>
    </div>
  );
};

export default CareerPage;
