/** @format */

import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Globe,
  Linkedin,
  Loader2,
  Mail,
  Phone,
  Upload,
  User,
} from 'lucide-react';
import {
  applyForJob,
  getJobDetails,
  uploadResume,
} from '../services/career-service';

const emptyForm = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  cover_letter: '',
  resume_url: '',
  linkedin_url: '',
  portfolio_url: '',
  referral: '',
  additional_info: '',
};

export default function JobApplication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    const loadJob = async () => {
      try {
        setLoading(true);
        const data = await getJobDetails(id);
        setJob(data);

        const persistedUser = JSON.parse(
          localStorage.getItem('user') || 'null',
        );
        if (persistedUser) {
          setFormData((current) => ({
            ...current,
            first_name: persistedUser.first_name || '',
            last_name: persistedUser.last_name || '',
            email: persistedUser.email || '',
            phone: persistedUser.phone || '',
          }));
        }
      } catch (err) {
        setError(err.message || 'Unable to load the job opportunity.');
      } finally {
        setLoading(false);
      }
    };

    if (id) loadJob();
  }, [id]);

  const formattedSalary = useMemo(() => {
    if (!job) return 'Competitive';

    if (job.salary_min && job.salary_max) {
      const currency = job.salary_currency || '$';
      return `${currency}${job.salary_min.toLocaleString()} - ${currency}${job.salary_max.toLocaleString()}`;
    }
    if (job.salary_min) {
      const currency = job.salary_currency || '$';
      return `From ${currency}${job.salary_min.toLocaleString()}`;
    }
    if (job.salary_max) {
      const currency = job.salary_currency || '$';
      return `Up to ${currency}${job.salary_max.toLocaleString()}`;
    }

    return 'Competitive';
  }, [job]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const validate = () => {
    if (!formData.first_name.trim()) {
      setError('First name is required.');
      return false;
    }
    if (!formData.last_name.trim()) {
      setError('Last name is required.');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (!formData.phone.trim()) {
      setError('Phone number is required.');
      return false;
    }
    if (!resumeFile && !formData.resume_url) {
      setError('Please upload your resume or provide an existing resume URL.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!validate()) return;

    try {
      setSubmitting(true);

      let resumeUrl = formData.resume_url;
      if (resumeFile) {
        const uploadResult = await uploadResume(resumeFile);
        resumeUrl = uploadResult.url;
      }

      await applyForJob(id, {
        ...formData,
        resume_url: resumeUrl,
        job_id: id,
      });

      setSuccess(true);
      setResumeFile(null);
      setFormData(emptyForm);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => navigate('/careers'), 1800);
    } catch (err) {
      setError(
        err.message || 'Failed to submit your application. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-emerald-600" />
          <p className="mt-4 text-gray-600">Preparing your application…</p>
        </div>
      </main>
    );
  }

  if (error && !job) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-lg rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <AlertCircle className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <h1 className="text-2xl font-bold text-gray-900">
            Opportunity unavailable
          </h1>
          <p className="mt-3 text-red-700">{error}</p>
          <Link
            to="/careers"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            <ArrowLeft size={16} /> Back to careers
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Link
          to={`/careers/${id}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
        >
          <ArrowLeft size={16} /> Back to job details
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_1.4fr]">
        <aside className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
            Application
          </p>
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            {job?.title}
          </h1>
          <p className="mt-2 text-lg text-gray-700">{job?.company}</p>

          <div className="mt-6 space-y-3 text-sm text-gray-600">
            <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-2">
              <span>Location</span>
              <span className="font-medium text-gray-800">
                {job?.location?.city || 'Flexible'}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-2">
              <span>Salary</span>
              <span className="font-medium text-gray-800">
                {formattedSalary}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-2">
              <span>Employment</span>
              <span className="font-medium text-gray-800">
                {job?.employment_type || 'Full-time'}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
            Please upload your resume in PDF, DOC, or DOCX format. We use secure
            Cloudinary storage for job applications.
          </div>
        </aside>

        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          {success ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h2 className="mt-6 text-2xl font-bold text-gray-900">
                Application sent successfully
              </h2>
              <p className="mt-3 max-w-md text-gray-600">
                Your application for {job?.title} has been received and is under
                review.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-3 text-gray-900 outline-none ring-0 transition focus:border-emerald-500"
                      placeholder="John"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-3 text-gray-900 outline-none ring-0 transition focus:border-emerald-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-3 text-gray-900 outline-none ring-0 transition focus:border-emerald-500"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-3 text-gray-900 outline-none ring-0 transition focus:border-emerald-500"
                      placeholder="+234 800 000 0000"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Resume / CV
                </label>
                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-center transition hover:border-emerald-400 hover:bg-emerald-50">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                    <Upload className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-gray-700">
                    {resumeFile ? resumeFile.name : 'Upload your resume'}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    PDF, DOC, or DOCX • Max 5MB
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(event) =>
                      setResumeFile(event.target.files?.[0] || null)
                    }
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Cover letter
                </label>
                <textarea
                  name="cover_letter"
                  value={formData.cover_letter}
                  onChange={handleChange}
                  rows="5"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500"
                  placeholder="Tell us why you are a strong fit for this role."
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    LinkedIn URL
                  </label>
                  <div className="relative">
                    <Linkedin className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                    <input
                      type="url"
                      name="linkedin_url"
                      value={formData.linkedin_url}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-3 text-gray-900 outline-none transition focus:border-emerald-500"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Portfolio / Website
                  </label>
                  <div className="relative">
                    <Globe className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
                    <input
                      type="url"
                      name="portfolio_url"
                      value={formData.portfolio_url}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-3 text-gray-900 outline-none transition focus:border-emerald-500"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  How did you hear about us?
                </label>
                <input
                  type="text"
                  name="referral"
                  value={formData.referral}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500"
                  placeholder="LinkedIn, referral, website, etc."
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Additional information
                </label>
                <textarea
                  name="additional_info"
                  value={formData.additional_info}
                  onChange={handleChange}
                  rows="4"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-500"
                  placeholder="Anything else we should know?"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-400"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4" />
                    Submit application
                  </>
                )}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
