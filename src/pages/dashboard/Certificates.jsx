/** @format */

import React, { useEffect, useState } from 'react';
import { Award, Download, ExternalLink, Loader2, ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';
import apiClient from '../../services/api-client';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const res = await apiClient.get('/dashboard/certificates');
        const data = Array.isArray(res.data) ? res.data : (res.data.certificates || []);
        setCertificates(data);
      } catch (err) {
        console.error('Failed to load certificates:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCerts();
  }, []);

  if (loading)
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-emerald-100">
          <Award className="w-7 h-7 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Certificates</h1>
          <p className="text-sm text-gray-500">
            Certificates you have earned upon completing courses.
          </p>
        </div>
      </div>

      {certificates.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 py-16 text-center">
          <Award className="mx-auto mb-3 text-slate-300" size={48} />
          <p className="text-lg font-semibold text-slate-500">No certificates yet</p>
          <p className="text-sm text-slate-400 mt-1">
            Complete an enrolled course and pass the final assessment to earn your certificate.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert._id || cert.certificate_id}
              className="group rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              {/* Certificate Card Header */}
              <div className="relative h-36 bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                <Award className="w-16 h-16 text-white/30" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <ShieldCheck className="w-8 h-8 mb-1 text-emerald-200" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-100">
                    Certificate of Completion
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="font-bold text-slate-900 text-base line-clamp-2">
                  {cert.course_name || cert.title || 'Course Certificate'}
                </h3>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>
                    Issued:{' '}
                    {cert.issued_at
                      ? format(new Date(cert.issued_at), 'MMM dd, yyyy')
                      : 'N/A'}
                  </span>
                  {cert.verification_code && (
                    <span className="font-mono font-bold text-emerald-600">
                      #{cert.verification_code}
                    </span>
                  )}
                </div>
                <div className="flex gap-2 pt-1">
                  {cert.certificate_url && (
                    <a
                      href={cert.certificate_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
                    >
                      <Download size={14} /> Download
                    </a>
                  )}
                  {cert.verification_code && (
                    <a
                      href={`/verify/${cert.verification_code}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border border-emerald-200 text-emerald-700 text-xs font-bold hover:bg-emerald-50 transition"
                    >
                      <ExternalLink size={14} /> Verify
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Certificates;
