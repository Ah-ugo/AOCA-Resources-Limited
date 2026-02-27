/** @format */

'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, Book, Calendar, Edit, Save, X } from 'lucide-react';
import {
  getUserProfile,
  updateUserProfile,
  getUserCourses,
} from '../../services/dashboard-service';
import { getCurrentUser } from '../../services/auth-service';

function Profile() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get user from auth service first
        const currentUser = getCurrentUser();
        setUser(currentUser);

        // Fetch detailed profile from API
        const profileData = await getUserProfile();

        if (profileData?.user) {
          // Update form data with profile data
          setFormData({
            name:
              profileData.user.name ||
              `${profileData.user.first_name || ''} ${profileData.user.last_name || ''}`.trim() ||
              currentUser?.name ||
              '',
            email: profileData.user.email || currentUser?.email || '',
            phone: profileData.user.phone || '',
            address: profileData.user.address || '',
            bio: profileData.user.bio || '',
          });
        } else {
          // Fallback to auth user data
          setFormData({
            name:
              currentUser?.name ||
              `${currentUser?.first_name || ''} ${currentUser?.last_name || ''}`.trim() ||
              'User',
            email: currentUser?.email || '',
            phone: '',
            address: '',
            bio: '',
          });
        }

        // Fetch courses
        try {
          const coursesData = await getUserCourses();
          if (Array.isArray(coursesData)) {
            setCourses(coursesData);
          } else if (coursesData?.courses) {
            setCourses(coursesData.courses);
          }
        } catch (courseErr) {
          console.error('Error fetching courses:', courseErr);
          // Don't fail if courses fail - just show empty courses
          setCourses([]);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message || 'Failed to load profile data');

        // Use auth user data as fallback
        const currentUser = getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setFormData({
            name:
              currentUser.name ||
              `${currentUser.first_name || ''} ${currentUser.last_name || ''}`.trim() ||
              'User',
            email: currentUser.email || '',
            phone: '',
            address: '',
            bio: '',
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      // Update profile via API
      const updatedProfile = await updateUserProfile(formData);

      // Update local user state
      if (updatedProfile?.user) {
        setUser((prev) => ({ ...prev, ...updatedProfile.user }));

        // Update user in localStorage
        const currentUser = getCurrentUser();
        const updatedUser = {
          ...currentUser,
          ...updatedProfile.user,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const calculateOverallProgress = () => {
    if (courses.length === 0) return 0;
    return Math.round(
      courses.reduce((sum, course) => sum + (course.progress || 0), 0) /
        courses.length,
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'March 2025';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading && !user) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600'></div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md'>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className='mt-2 text-sm underline'
        >
          Try again
        </button>
      </div>
    );
  }

  if (!user) return null;

  const overallProgress = calculateOverallProgress();

  return (
    <div>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold mb-2'>Your Profile</h1>
        <p className='text-gray-600'>Manage your account information</p>
      </div>

      {updateSuccess && (
        <div className='mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md'>
          Profile updated successfully!
        </div>
      )}

      {error && (
        <div className='mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md'>
          {error}
        </div>
      )}

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Profile Summary */}
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <div className='p-6 text-center border-b'>
            <div className='w-24 h-24 rounded-full bg-emerald-100 mx-auto flex items-center justify-center'>
              <User className='h-12 w-12 text-emerald-600' />
            </div>
            <h2 className='mt-4 text-xl font-bold'>{formData.name}</h2>
            <p className='text-gray-500'>
              {courses.length > 0
                ? courses[0]?.name
                : user.course || user.role || 'Student'}
            </p>
          </div>

          <div className='p-4'>
            <div className='space-y-3'>
              <div className='flex items-center gap-3'>
                <Mail className='h-5 w-5 text-gray-400' />
                <span className='text-sm'>{formData.email}</span>
              </div>
              <div className='flex items-center gap-3'>
                <Phone className='h-5 w-5 text-gray-400' />
                <span className='text-sm'>
                  {formData.phone || 'Not provided'}
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <Book className='h-5 w-5 text-gray-400' />
                <span className='text-sm'>
                  {courses.length > 0
                    ? courses.map((c) => c.name).join(', ')
                    : user.course || 'German Course'}
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <Calendar className='h-5 w-5 text-gray-400' />
                <span className='text-sm'>
                  Joined {formatDate(user.created_at)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className='bg-white rounded-lg shadow overflow-hidden lg:col-span-2'>
          <div className='p-4 bg-emerald-600 text-white flex justify-between items-center'>
            <h2 className='text-lg font-semibold'>Profile Information</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className='inline-flex items-center text-sm bg-white text-emerald-600 px-3 py-1 rounded-md hover:bg-gray-100'
              >
                <Edit className='h-4 w-4 mr-1' />
                Edit
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className='inline-flex items-center text-sm bg-white text-gray-700 px-3 py-1 rounded-md hover:bg-gray-100'
              >
                <X className='h-4 w-4 mr-1' />
                Cancel
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className='p-4'>
              <div className='space-y-4'>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Full Name
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Email Address
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor='phone'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Phone Number
                  </label>
                  <input
                    type='tel'
                    id='phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'
                  />
                </div>

                <div>
                  <label
                    htmlFor='address'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Address
                  </label>
                  <input
                    type='text'
                    id='address'
                    name='address'
                    value={formData.address}
                    onChange={handleChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'
                  />
                </div>

                <div>
                  <label
                    htmlFor='bio'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Bio
                  </label>
                  <textarea
                    id='bio'
                    name='bio'
                    rows={3}
                    value={formData.bio}
                    onChange={handleChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500'
                  />
                </div>

                <div className='pt-2'>
                  <button
                    type='submit'
                    disabled={loading}
                    className='inline-flex items-center bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors disabled:opacity-50'
                  >
                    {loading ? (
                      <>
                        <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className='h-4 w-4 mr-2' />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className='p-4 space-y-4'>
              <div>
                <h3 className='text-sm font-medium text-gray-500'>Full Name</h3>
                <p className='mt-1'>{formData.name}</p>
              </div>

              <div>
                <h3 className='text-sm font-medium text-gray-500'>
                  Email Address
                </h3>
                <p className='mt-1'>{formData.email}</p>
              </div>

              <div>
                <h3 className='text-sm font-medium text-gray-500'>
                  Phone Number
                </h3>
                <p className='mt-1'>{formData.phone || 'Not provided'}</p>
              </div>

              <div>
                <h3 className='text-sm font-medium text-gray-500'>Address</h3>
                <p className='mt-1'>{formData.address || 'Not provided'}</p>
              </div>

              <div>
                <h3 className='text-sm font-medium text-gray-500'>Bio</h3>
                <p className='mt-1'>{formData.bio || 'No bio provided'}</p>
              </div>
            </div>
          )}
        </div>

        {/* Course Progress */}
        {courses.length > 0 && (
          <div className='bg-white rounded-lg shadow overflow-hidden lg:col-span-3'>
            <div className='p-4 bg-emerald-600 text-white'>
              <h2 className='text-lg font-semibold'>Course Progress</h2>
            </div>

            <div className='p-4'>
              <div className='mb-4'>
                <div className='flex justify-between mb-1'>
                  <span className='text-sm font-medium'>Overall Progress</span>
                  <span className='text-sm font-medium'>
                    {overallProgress}%
                  </span>
                </div>
                <div className='w-full bg-gray-200 rounded-full h-2.5'>
                  <div
                    className='bg-emerald-600 h-2.5 rounded-full'
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6'>
                {courses.map((course, index) => {
                  const colors = [
                    'bg-blue-500',
                    'bg-green-500',
                    'bg-yellow-500',
                    'bg-purple-500',
                  ];
                  return (
                    <div
                      key={course.id || course._id}
                      className='border rounded-lg p-4'
                    >
                      <h3 className='font-medium mb-2'>{course.name}</h3>
                      <div className='flex justify-between mb-1'>
                        <span className='text-xs text-gray-500'>Progress</span>
                        <span className='text-xs font-medium'>
                          {course.progress || 0}%
                        </span>
                      </div>
                      <div className='w-full bg-gray-200 rounded-full h-1.5'>
                        <div
                          className={`${colors[index % colors.length]} h-1.5 rounded-full`}
                          style={{ width: `${course.progress || 0}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
