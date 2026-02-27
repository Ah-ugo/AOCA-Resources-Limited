/** @format */

'use client';

import { useState, useEffect } from 'react';
import {
  Book,
  FileText,
  Video,
  Download,
  ExternalLink,
  Search,
} from 'lucide-react';
import {
  getResources,
  getResourceCategories,
} from '../../services/dashboard-service';

function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchResourceData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch resources based on category and search
        const resourcesData = await getResources(
          activeCategory !== 'all' ? activeCategory : null,
          searchQuery || null,
        );

        setResources(resourcesData.resources || []);

        // Fetch categories
        try {
          const categoriesData = await getResourceCategories();
          if (categoriesData && categoriesData.categories) {
            setCategories([
              { id: 'all', name: 'All Resources' },
              ...categoriesData.categories.map((cat) => ({
                id: cat.id || cat._id || cat.name,
                name: cat.name,
              })),
            ]);
          }
        } catch (catErr) {
          console.error('Error fetching categories:', catErr);
          // Don't fail if categories fail - just use default categories
          setCategories([{ id: 'all', name: 'All Resources' }]);
        }
      } catch (err) {
        console.error('Error fetching resources:', err);
        setError(err.message || 'Failed to load resources');
        setResources([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search to avoid too many requests
    const timeoutId = setTimeout(fetchResourceData, 300);
    return () => clearTimeout(timeoutId);
  }, [activeCategory, searchQuery]);

  const getResourceIcon = (type) => {
    const icons = {
      document: <FileText className='h-5 w-5 text-blue-500' />,
      video: <Video className='h-5 w-5 text-red-500' />,
      audio: <FileText className='h-5 w-5 text-purple-500' />,
      interactive: <Book className='h-5 w-5 text-green-500' />,
    };
    return icons[type] || <FileText className='h-5 w-5 text-gray-500' />;
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading && resources.length === 0) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600'></div>
      </div>
    );
  }

  return (
    <div>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold mb-2'>Learning Resources</h1>
        <p className='text-gray-600'>
          Access study materials for your German language course
        </p>
      </div>

      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <div className='p-4 border-b'>
          <div className='flex flex-col md:flex-row justify-between gap-4'>
            <div className='relative flex-1'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <Search className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='text'
                placeholder='Search resources...'
                className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            <div className='flex flex-wrap gap-2'>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    activeCategory === category.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error ? (
          <div className='p-6 text-center'>
            <p className='text-red-500'>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className='mt-2 text-sm underline text-emerald-600'
            >
              Try again
            </button>
          </div>
        ) : resources.length === 0 ? (
          <div className='p-8 text-center'>
            <p className='text-gray-500'>
              No resources found matching your search.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
            {resources.map((resource) => (
              <div
                key={resource.id || resource._id}
                className='border rounded-lg p-4 hover:shadow-md transition-shadow'
              >
                <div className='flex items-start gap-3'>
                  <div className='mt-1'>{getResourceIcon(resource.type)}</div>
                  <div className='flex-1'>
                    <h3 className='font-medium'>{resource.title}</h3>
                    <p className='text-sm text-gray-600 mt-1'>
                      {resource.description}
                    </p>
                    <div className='mt-3'>
                      <a
                        href={resource.link || resource.url || '#'}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-emerald-600 text-sm font-medium inline-flex items-center hover:underline'
                      >
                        {resource.type === 'document' ? (
                          <>
                            <Download className='h-4 w-4 mr-1' />
                            Download
                          </>
                        ) : (
                          <>
                            <ExternalLink className='h-4 w-4 mr-1' />
                            Access Resource
                          </>
                        )}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Resources;
