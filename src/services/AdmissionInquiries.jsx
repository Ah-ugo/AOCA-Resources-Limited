/** @format */

import React, { useState, useEffect } from 'react';
import { adminService } from '../services/admin-service';
import { format } from 'date-fns';

const AdmissionInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    program: '',
    search: '',
  });
  const [newNote, setNewNote] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);

  useEffect(() => {
    fetchData();
  }, [filters]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [inquiriesData, statsData] = await Promise.all([
        adminService.getAdmissionInquiries(filters),
        adminService.getAdmissionStats(),
      ]);
      setInquiries(inquiriesData.inquiries);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (id) => {
    try {
      const data = await adminService.getAdmissionInquiryById(id);
      setSelectedInquiry(data);
      setIsModalOpen(true);
      // Refresh the list to show it's been read
      fetchData();
    } catch (error) {
      alert('Error fetching details');
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await adminService.updateInquiryStatus(id, newStatus);
      fetchData();
      if (selectedInquiry) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      }
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setSubmittingNote(true);
    try {
      await adminService.addInquiryNote(selectedInquiry._id, newNote);
      const updated = await adminService.getAdmissionInquiryById(
        selectedInquiry._id,
      );
      setSelectedInquiry(updated);
      setNewNote('');
    } catch (error) {
      alert('Failed to add note');
    } finally {
      setSubmittingNote(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      contacted: 'bg-blue-100 text-blue-800',
      enrolled: 'bg-green-100 text-green-800',
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${styles[status] || 'bg-gray-100'}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className='p-6 space-y-6 bg-gray-50 min-h-screen'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-gray-800'>
          Admission Inquiries
        </h1>
        <button
          onClick={() => adminService.exportInquiriesCSV()}
          className='bg-primary text-white px-4 py-2 rounded-md hover:opacity-90 transition shadow-sm'
        >
          Export CSV
        </button>
      </div>

      {/* Stats Summary */}
      {stats && (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
            <p className='text-sm text-gray-500'>Total Inquiries</p>
            <p className='text-2xl font-bold'>{stats.total}</p>
          </div>
          <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
            <p className='text-sm text-gray-500'>Unread</p>
            <p className='text-2xl font-bold text-red-600'>{stats.unread}</p>
          </div>
          <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
            <p className='text-sm text-gray-500'>Last 30 Days</p>
            <p className='text-2xl font-bold text-primary'>
              {stats.recent_30_days}
            </p>
          </div>
          <div className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
            <p className='text-sm text-gray-500'>Enrolled</p>
            <p className='text-2xl font-bold text-green-600'>
              {stats.by_status?.find((s) => s._id === 'enrolled')?.count || 0}
            </p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className='bg-white p-4 rounded-lg shadow-sm flex flex-wrap gap-4 items-end border border-gray-100'>
        <div className='flex-1 min-w-[200px]'>
          <label className='block text-xs font-semibold text-gray-500 uppercase mb-1'>
            Search
          </label>
          <input
            type='text'
            placeholder='Name, email, phone...'
            className='w-full border rounded-md px-3 py-2 focus:ring-primary focus:border-primary outline-none'
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <div>
          <label className='block text-xs font-semibold text-gray-500 uppercase mb-1'>
            Status
          </label>
          <select
            className='border rounded-md px-3 py-2 focus:ring-primary focus:border-primary outline-none'
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value=''>All Statuses</option>
            <option value='pending'>Pending</option>
            <option value='contacted'>Contacted</option>
            <option value='enrolled'>Enrolled</option>
          </select>
        </div>
        <div>
          <label className='block text-xs font-semibold text-gray-500 uppercase mb-1'>
            Program
          </label>
          <select
            className='border rounded-md px-3 py-2 focus:ring-primary focus:border-primary outline-none'
            value={filters.program}
            onChange={(e) =>
              setFilters({ ...filters, program: e.target.value })
            }
          >
            <option value=''>All Programs</option>
            <option value='ielts'>IELTS</option>
            <option value='german'>German</option>
            <option value='study-abroad'>Study Abroad</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className='bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100'>
        <table className='w-full text-left'>
          <thead className='bg-gray-50 text-gray-600 text-sm uppercase'>
            <tr>
              <th className='px-6 py-4 font-semibold'>Student</th>
              <th className='px-6 py-4 font-semibold'>Program</th>
              <th className='px-6 py-4 font-semibold'>Location</th>
              <th className='px-6 py-4 font-semibold'>Date</th>
              <th className='px-6 py-4 font-semibold'>Status</th>
              <th className='px-6 py-4 font-semibold text-right'>Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {loading ? (
              <tr>
                <td
                  colSpan='6'
                  className='px-6 py-10 text-center text-gray-400'
                >
                  Loading inquiries...
                </td>
              </tr>
            ) : inquiries.length === 0 ? (
              <tr>
                <td
                  colSpan='6'
                  className='px-6 py-10 text-center text-gray-400'
                >
                  No inquiries found.
                </td>
              </tr>
            ) : (
              inquiries.map((item) => (
                <tr
                  key={item._id}
                  className={`${!item.is_read ? 'bg-blue-50/30' : ''} hover:bg-gray-50 transition`}
                >
                  <td className='px-6 py-4'>
                    <div className='font-medium text-gray-900'>
                      {item.first_name} {item.last_name}
                    </div>
                    <div className='text-sm text-gray-500'>{item.email}</div>
                  </td>
                  <td className='px-6 py-4 text-gray-700 capitalize'>
                    {item.program}
                  </td>
                  <td className='px-6 py-4 text-gray-700 capitalize'>
                    {item.location}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-500'>
                    {format(new Date(item.created_at), 'MMM dd, yyyy')}
                  </td>
                  <td className='px-6 py-4'>{getStatusBadge(item.status)}</td>
                  <td className='px-6 py-4 text-right'>
                    <button
                      onClick={() => handleViewDetails(item._id)}
                      className='text-primary hover:underline font-medium'
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {isModalOpen && selectedInquiry && (
        <div className='fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <div className='p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10'>
              <div>
                <h2 className='text-xl font-bold text-gray-800'>
                  Inquiry Details
                </h2>
                <p className='text-sm text-gray-500'>
                  ID: {selectedInquiry._id}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className='text-gray-400 hover:text-gray-600 text-2xl'
              >
                &times;
              </button>
            </div>

            <div className='p-6 space-y-6'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='text-xs font-bold text-gray-400 uppercase'>
                    Name
                  </label>
                  <p className='text-gray-800 font-medium'>
                    {selectedInquiry.first_name} {selectedInquiry.last_name}
                  </p>
                </div>
                <div>
                  <label className='text-xs font-bold text-gray-400 uppercase'>
                    Status
                  </label>
                  <div className='mt-1 flex items-center gap-2'>
                    {getStatusBadge(selectedInquiry.status)}
                    <select
                      className='text-sm border rounded p-1'
                      value={selectedInquiry.status}
                      onChange={(e) =>
                        handleStatusUpdate(selectedInquiry._id, e.target.value)
                      }
                    >
                      <option value='pending'>Pending</option>
                      <option value='contacted'>Contacted</option>
                      <option value='enrolled'>Enrolled</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className='text-xs font-bold text-gray-400 uppercase'>
                    Email
                  </label>
                  <p className='text-gray-800'>{selectedInquiry.email}</p>
                </div>
                <div>
                  <label className='text-xs font-bold text-gray-400 uppercase'>
                    Phone
                  </label>
                  <p className='text-gray-800'>{selectedInquiry.phone}</p>
                </div>
                <div>
                  <label className='text-xs font-bold text-gray-400 uppercase'>
                    Program
                  </label>
                  <p className='text-gray-800 capitalize'>
                    {selectedInquiry.program}
                  </p>
                </div>
                <div>
                  <label className='text-xs font-bold text-gray-400 uppercase'>
                    Location
                  </label>
                  <p className='text-gray-800 capitalize'>
                    {selectedInquiry.location}
                  </p>
                </div>
              </div>

              <div>
                <label className='text-xs font-bold text-gray-400 uppercase'>
                  Message
                </label>
                <div className='mt-1 p-4 bg-gray-50 rounded-lg text-gray-700 italic border'>
                  "{selectedInquiry.message || 'No message provided'}"
                </div>
              </div>

              {/* Notes Section */}
              <div className='space-y-4'>
                <label className='text-xs font-bold text-gray-400 uppercase block'>
                  Admin Notes
                </label>
                <div className='space-y-3'>
                  {selectedInquiry.admin_notes?.length > 0 ? (
                    selectedInquiry.admin_notes.map((note, idx) => (
                      <div
                        key={idx}
                        className='bg-blue-50/50 p-3 rounded border-l-4 border-primary text-sm'
                      >
                        <div className='flex justify-between mb-1'>
                          <span className='font-bold text-gray-700'>
                            {note.created_by_name}
                          </span>
                          <span className='text-gray-400'>
                            {format(new Date(note.created_at), 'MMM dd, HH:mm')}
                          </span>
                        </div>
                        <p className='text-gray-600'>{note.note}</p>
                      </div>
                    ))
                  ) : (
                    <p className='text-sm text-gray-400 italic'>
                      No notes yet.
                    </p>
                  )}
                </div>

                <form onSubmit={handleAddNote} className='flex gap-2'>
                  <input
                    type='text'
                    className='flex-1 border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary outline-none'
                    placeholder='Add a progress note...'
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  />
                  <button
                    type='submit'
                    disabled={submittingNote || !newNote.trim()}
                    className='bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 disabled:bg-gray-300'
                  >
                    {submittingNote ? 'Saving...' : 'Add Note'}
                  </button>
                </form>
              </div>
            </div>

            <div className='p-6 border-t bg-gray-50 flex justify-between items-center rounded-b-xl'>
              <button
                onClick={async () => {
                  if (window.confirm('Delete this inquiry permanently?')) {
                    await adminService.deleteAdmissionInquiry(
                      selectedInquiry._id,
                    );
                    setIsModalOpen(false);
                    fetchData();
                  }
                }}
                className='text-red-500 hover:text-red-700 text-sm font-medium'
              >
                Delete Inquiry
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className='bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-100'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionInquiries;
