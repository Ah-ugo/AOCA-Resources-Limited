import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Search, ShieldCheck, Download, Award, Loader2 } from 'lucide-react';
import apiClient from '../services/api-client';

export default function CertificateVerification() {
  const { id } = useParams();
  const [searchId, setSearchId] = useState(id || '');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    if (!searchId) return;

    setIsVerifying(true);
    setError('');
    try {
      const res = await apiClient.get(`/certificates/${searchId}`);
      setResult({ valid: true, ...res.data });
    } catch (err) {
      setResult({ valid: false });
    } finally {
      setIsVerifying(false);
    }
  };

  React.useEffect(() => {
    if (id) {
      handleVerify();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center pt-20 px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Certificate Verification</h1>
          <p className="text-slate-600">Enter a certificate verification code to check its authenticity.</p>
        </div>

        <form onSubmit={handleVerify} className="mb-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="e.g., A1B2C3D4"
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-lg transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isVerifying || !searchId}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-medium transition-colors disabled:opacity-50"
            >
              {isVerifying ? <Loader2 className="animate-spin" /> : 'Verify'}
            </button>
          </div>
        </form>

        {result && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
            {result.valid ? (
              <div>
                <div className="bg-emerald-50 border-b border-emerald-100 p-6 flex flex-col items-center text-center">
                  <CheckCircle className="h-16 w-16 text-emerald-500 mb-4" />
                  <h2 className="text-2xl font-bold text-emerald-800">Verified Certificate</h2>
                  <p className="text-emerald-600">This certificate is valid and issued by AOCA Resources Limited.</p>
                </div>
                <div className="p-8">
                  <div className="grid gap-6">
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Student Name</p>
                      <p className="text-lg font-bold text-slate-900">{result.user_name || result.studentName || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">Course / Program</p>
                      <p className="text-lg font-bold text-slate-900">{result.course_name || result.courseName || 'N/A'}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Issue Date</p>
                        <p className="font-medium text-slate-900">
                          {result.issued_at ? new Date(result.issued_at).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Verification Code</p>
                        <p className="font-mono font-bold text-emerald-600">{result.verification_code || searchId}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-100 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <Award className="h-4 w-4" />
                      Certificate ID: {result.verification_code || searchId}
                    </div>
                    <button className="flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700">
                      <Download className="h-4 w-4" />
                      Download Copy
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-red-800 mb-2">Invalid Certificate</h2>
                <p className="text-slate-600">
                  We could not find a certificate matching the ID "{searchId}". Please check the ID and try again.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 text-center text-sm text-slate-500">
          <Link to="/" className="text-emerald-600 hover:underline">Return to Homepage</Link>
        </div>
      </div>
    </div>
  );
}
