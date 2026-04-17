const BASE_URL =import.meta.env.VITE_BACKEND_URL;
const VERSION = "/api/v1";
const EXTERNAL_URL = "https://library-server-mphx.onrender.com/api/library";

export const API_ROUTES = {
  CONTACT: `${BASE_URL}${VERSION}/contact/create`,
  EXPLORE: `${BASE_URL}${VERSION}/category/get`,
  BEST_SELLING: `${BASE_URL}${VERSION}/product/best-selling`,
  TESTIMONIALS: `${BASE_URL}${VERSION}/rating/home`,
  BANNER: `${BASE_URL}${VERSION}/banner/get`,
  YT_VIDEO: `${BASE_URL}${VERSION}/video/get`,
  BRAND_LOGO: `${BASE_URL}${VERSION}/brand/all`,
  EXTERNAL_FETCH: `${EXTERNAL_URL}/fetch-all`,
  EXTERNAL_DOWNLOAD: `${EXTERNAL_URL}/download`,
  SEND_OTP: `${BASE_URL}${VERSION}/customerData/send-otp`,
  VERIFY_OTP: `${BASE_URL}${VERSION}/customerData/verify-otp`,
  GET_JOBS: `${BASE_URL}${VERSION}/career/jobs`,
  GET_JOB_BY_ID: (id) => `${BASE_URL}${VERSION}/career/jobs/id/${id}`,
  APPLY_JOB: `${BASE_URL}${VERSION}/career/apply`,
  UPDATE_JOB_APPLICATION: (id) => `${BASE_URL}${VERSION}/career/application/${id}`,
  GET_APPLICATION_DETAILS: (id) => `${BASE_URL}${VERSION}/career/application/${id}`,
  GET_BLOGS: `${BASE_URL}${VERSION}/blog`,
  GET_BLOG_BY_ID: (id) => `${BASE_URL}${VERSION}/blog/${id}`,
  INCREMENT_BLOG_VIEW: (id) => `${BASE_URL}${VERSION}/blog/${id}/view`,
  POST_BLOG_COMMENT: (id) => `${BASE_URL}${VERSION}/blog/comment/${id}`,
};