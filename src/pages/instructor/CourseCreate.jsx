/** @format */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, X, Plus, Trash2, Loader2 } from 'lucide-react';
import { authService } from '../../services/auth-service';

export default function InstructorCourseCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    level: 'beginner',
    price: '',
    duration: '',
    image: '',
    syllabus: [''],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSyllabusChange = (index, value) => {
    const newSyllabus = [...formData.syllabus];
    newSyllabus[index] = value;
    setFormData((prev) => ({ ...prev, syllabus: newSyllabus }));
  };

  const addSyllabusItem = () => {
    setFormData((prev) => ({ ...prev, syllabus: [...prev.syllabus, ''] }));
  };

  const removeSyllabusItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      syllabus: prev.syllabus.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = authService.getToken();
      const currentUser = authService.getCurrentUser();

      // Prepare payload with instructor_id
      const payload = {
        ...formData,
        instructor_id: currentUser?.id || currentUser?._id,
      };

      // Using the backend URL directly. Ensure this endpoint exists on your backend.
      // Updated to use /admin/courses as /instructor/courses POST does not exist on backend
      const response = await fetch(
        'https://aoca-resources-backend.onrender.com/admin/courses',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) throw new Error('Failed to create course');
      navigate('/instructor/dashboard');
    } catch (error) {
      console.error(error);
      alert('Error creating course: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-6 md:p-8 max-w-4xl mx-auto'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-2xl font-serif font-bold text-gray-900'>
            Create New Course
          </h1>
          <p className='text-gray-500 text-sm mt-1'>
            Share your knowledge with students.
          </p>
        </div>
        <button
          onClick={() => navigate('/instructor/dashboard')}
          className='p-2 hover:bg-gray-100 rounded-full'
        >
          <X className='h-6 w-6 text-gray-500' />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6'
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='md:col-span-2'>
            <label className='block text-sm font-bold text-gray-700 mb-2'>
              Course Title
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              className='w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-200 focus:outline-none focus:border-emerald-500'
              placeholder='e.g. Advanced German Grammar'
            />
          </div>

          <div className='md:col-span-2'>
            <label className='block text-sm font-bold text-gray-700 mb-2'>
              Description
            </label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className='w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-200 focus:outline-none focus:border-emerald-500 resize-none'
              placeholder='What will students learn?'
            />
          </div>

          <div>
            <label className='block text-sm font-bold text-gray-700 mb-2'>
              Level
            </label>
            <select
              name='level'
              value={formData.level}
              onChange={handleChange}
              className='w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-200 focus:outline-none focus:border-emerald-500'
            >
              <option value='beginner'>Beginner</option>
              <option value='intermediate'>Intermediate</option>
              <option value='advanced'>Advanced</option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-bold text-gray-700 mb-2'>
              Price ($)
            </label>
            <input
              type='number'
              name='price'
              value={formData.price}
              onChange={handleChange}
              required
              min='0'
              className='w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-200 focus:outline-none focus:border-emerald-500'
            />
          </div>

          <div>
            <label className='block text-sm font-bold text-gray-700 mb-2'>
              Duration (Weeks)
            </label>
            <input
              type='number'
              name='duration'
              value={formData.duration}
              onChange={handleChange}
              required
              min='1'
              className='w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-200 focus:outline-none focus:border-emerald-500'
            />
          </div>

          <div className='md:col-span-2'>
            <label className='block text-sm font-bold text-gray-700 mb-2'>
              Cover Image URL
            </label>
            <input
              type='url'
              name='image'
              value={formData.image}
              onChange={handleChange}
              className='w-full px-4 py-3 rounded-xl bg-gray-50 border-gray-200 focus:outline-none focus:border-emerald-500'
              placeholder='https://...'
            />
          </div>

          <div className='md:col-span-2'>
            <label className='block text-sm font-bold text-gray-700 mb-2'>
              Syllabus
            </label>
            <div className='space-y-3'>
              {formData.syllabus.map((item, index) => (
                <div key={index} className='flex gap-2'>
                  <input
                    type='text'
                    value={item}
                    onChange={(e) =>
                      handleSyllabusChange(index, e.target.value)
                    }
                    className='flex-1 px-4 py-3 rounded-xl bg-gray-50 border-gray-200 focus:outline-none focus:border-emerald-500'
                    placeholder={`Module ${index + 1}`}
                  />
                  {formData.syllabus.length > 1 && (
                    <button
                      type='button'
                      onClick={() => removeSyllabusItem(index)}
                      className='p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors'
                    >
                      <Trash2 className='h-5 w-5' />
                    </button>
                  )}
                </div>
              ))}
              <button
                type='button'
                onClick={addSyllabusItem}
                className='flex items-center gap-2 text-emerald-600 font-bold text-sm hover:text-emerald-700'
              >
                <Plus className='h-4 w-4' /> Add Module
              </button>
            </div>
          </div>
        </div>

        <div className='pt-4 border-t border-gray-100 flex justify-end gap-3'>
          <button
            type='button'
            onClick={() => navigate('/instructor/dashboard')}
            className='px-6 py-3 rounded-xl text-gray-500 font-bold hover:bg-gray-50 transition-colors'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={loading}
            className='px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-500 transition-colors flex items-center gap-2 disabled:opacity-70'
          >
            {loading ? (
              <Loader2 className='h-5 w-5 animate-spin' />
            ) : (
              <Save className='h-5 w-5' />
            )}
            Publish Course
          </button>
        </div>
      </form>
    </div>
  );
}
