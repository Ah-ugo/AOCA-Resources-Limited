"use client";

import { useState, useEffect } from "react";
import {
  Book,
  FileText,
  Video,
  Download,
  ExternalLink,
  Search,
  Loader,
} from "lucide-react";
import {
  getResources,
  getResourceCategories,
} from "../../services/dashboard-service";

function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchResourceData = async () => {
      try {
        setLoading(true);

        // Fetch categories
        const categoriesData = await getResourceCategories();
        if (categoriesData && categoriesData.categories) {
          setCategories([
            { id: "all", name: "All Resources" },
            ...categoriesData.categories.map((cat) => ({
              id: cat.id || cat._id || cat.name,
              name: cat.name,
            })),
          ]);
        } else {
          // Fallback categories
          setCategories([
            { id: "all", name: "All Resources" },
            { id: "grammar", name: "Grammar" },
            { id: "vocabulary", name: "Vocabulary" },
            { id: "pronunciation", name: "Pronunciation" },
            { id: "conversation", name: "Conversation" },
            { id: "exam", name: "Exam Prep" },
            { id: "culture", name: "Culture" },
          ]);
        }

        // Fetch resources
        const resourcesData = await getResources(
          activeCategory !== "all" ? activeCategory : null,
          searchQuery || null
        );

        if (resourcesData && resourcesData.resources) {
          setResources(resourcesData.resources);
        } else {
          // Fallback resources
          setResources([
            {
              id: 1,
              title: "A1 Grammar Guide",
              type: "document",
              description:
                "Comprehensive guide to German A1 grammar rules and examples.",
              link: "#",
              category: "grammar",
            },
            {
              id: 2,
              title: "Vocabulary Flashcards - Basics",
              type: "interactive",
              description:
                "Interactive flashcards to help you memorize essential German vocabulary.",
              link: "#",
              category: "vocabulary",
            },
            {
              id: 3,
              title: "Pronunciation Guide",
              type: "audio",
              description:
                "Audio examples and tips for proper German pronunciation.",
              link: "#",
              category: "pronunciation",
            },
            {
              id: 4,
              title: "German Alphabet and Sounds",
              type: "video",
              description:
                "Video tutorial on the German alphabet and pronunciation.",
              link: "#",
              category: "pronunciation",
            },
            {
              id: 5,
              title: "Common Phrases for Beginners",
              type: "document",
              description:
                "PDF with essential phrases for everyday conversations.",
              link: "#",
              category: "conversation",
            },
            {
              id: 6,
              title: "Numbers and Counting Practice",
              type: "interactive",
              description:
                "Interactive exercises to practice numbers in German.",
              link: "#",
              category: "vocabulary",
            },
            {
              id: 7,
              title: "A1 Practice Tests",
              type: "document",
              description:
                "Sample tests to prepare for the A1 certification exam.",
              link: "#",
              category: "exam",
            },
            {
              id: 8,
              title: "German Culture - Introduction",
              type: "video",
              description: "Video introduction to German culture and customs.",
              link: "#",
              category: "culture",
            },
          ]);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError("Failed to load resources. Please try again later.");
        setLoading(false);
      }
    };

    fetchResourceData();
  }, [activeCategory, searchQuery]);

  const filteredResources = resources.filter((resource) => {
    if (searchQuery) {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
    }

    if (activeCategory !== "all") {
      return resource.category === activeCategory;
    }

    return true;
  });

  const getResourceIcon = (type) => {
    switch (type) {
      case "document":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "video":
        return <Video className="h-5 w-5 text-red-500" />;
      case "audio":
        return <FileText className="h-5 w-5 text-purple-500" />;
      case "interactive":
        return <Book className="h-5 w-5 text-green-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Learning Resources</h1>
        <p className="text-gray-600">
          Access study materials for your German language course
        </p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search resources..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    activeCategory === category.id
                      ? "bg-primary text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <Loader className="h-8 w-8 text-primary animate-spin mx-auto" />
            <p className="mt-2 text-gray-500">Loading resources...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-sm underline text-primary"
            >
              Try again
            </button>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">
              No resources found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getResourceIcon(resource.type)}</div>
                  <div>
                    <h3 className="font-medium">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {resource.description}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <a
                        href={resource.link}
                        className="text-primary text-sm font-medium inline-flex items-center hover:underline"
                      >
                        {resource.type === "document" ? (
                          <>
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </>
                        ) : (
                          <>
                            <ExternalLink className="h-4 w-4 mr-1" />
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
