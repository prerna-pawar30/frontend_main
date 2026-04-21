import axios from 'axios';
import { API_ROUTES } from './ApiRoutes';

const apiService = {
  // Post contact data
  createContact: async (data) => {
    return await axios.post(API_ROUTES.CONTACT, data);
  },

  // Fetch categories
  getExploreItems: async () => {
    return await axios.get(API_ROUTES.EXPLORE);
  },

  // Fetch best selling products
  getBestSelling: async () => {
    return await axios.get(API_ROUTES.BEST_SELLING);
  },

  // Fetch home testimonials/ratings
  getTestimonials: async () => {
    return await axios.get(API_ROUTES.TESTIMONIALS);
  },

  // Fetch banners
  getBanners: async () => {
    return await axios.get(API_ROUTES.BANNER);
  },

  // Fetch YouTube video links
  getYtVideos: async () => {
    return await axios.get(API_ROUTES.YT_VIDEO);
  },

  // Fetch brand logos
  getBrandLogos: async () => {
    return await axios.get(API_ROUTES.BRAND_LOGO);
  },

  // Fetch from the external render server
 getExternalBrands: async () => {
    return await axios.get(API_ROUTES.EXTERNAL_FETCH);
  },

  // Download library zip file
  downloadLibrary: async (libraryId) => {
    return await axios.get(`${API_ROUTES.EXTERNAL_DOWNLOAD}/${libraryId}`, {
      responseType: "blob",
    });
  },

  sendOtp: async (email) => {
    return await axios.post(API_ROUTES.SEND_OTP, { email });
  },

  verifyOtp: async (payload) => {
    return await axios.post(API_ROUTES.VERIFY_OTP, payload);
  },


  // Fetch all career jobs
  getCareerJobs: async () => {
    
    return await axios.get(API_ROUTES.GET_JOBS);
  },

  // Fetch a single job details by ID
  getJobDetails: async (id) => {
    return await axios.get(API_ROUTES.GET_JOB_BY_ID(id));
  },

  // Submit job application
  // Data should be a FormData instance for multipart/form-data support
  applyJob: async (formData) => {
    return await axios.post(API_ROUTES.APPLY_JOB, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  /**
   * Update an existing job application
   * @param {string} id - The application ID from the URL
   * @param {FormData} formData - The updated data including files
   */
  updateJobApplication: async (id, formData) => {
    return await axios.put(API_ROUTES.UPDATE_JOB_APPLICATION(id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getJobApplicationDetails: async (id) => {
    return await axios.get(API_ROUTES.GET_APPLICATION_DETAILS(id));
  },

  // ApiService.js
  getBlogs: async (status = 'published') => {
    return await axios.get(API_ROUTES.GET_BLOGS, {
      params: { status } 
    });
  },

  getBlogDetails: async (id) => {
    return await axios.get(API_ROUTES.GET_BLOG_BY_ID(id));
  },

  incrementBlogView: async (id) => {
    return await axios.post(API_ROUTES.INCREMENT_BLOG_VIEW(id));
  },

  postBlogComment: async (id, data) => {
    return await axios.post(API_ROUTES.POST_BLOG_COMMENT(id), data);
  },
};

export default apiService;