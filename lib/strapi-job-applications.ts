// lib/strapi-job-applications.ts

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

// Types based on your Strapi response
export interface Resume {
  id: number;
  documentId: string;
  name: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
}

export interface JobApplication {
  id: number;
  documentId: string;
  name: string;
  email: string;
  phone: number;
  title: string;
  coverLetter: string | null;
  currentStatus: "Pending" | "Shortlisted" | "Rejected" | "Replied" | null;
  createdAt: string;
  resume?: Resume;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination: PaginationMeta;
  };
}

// Helper to handle the fetch headers
const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
    },
    ...options,
  };

  const response = await fetch(`${API_URL}${endpoint}`, defaultOptions);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }
  
  return response.json();
};

export const getJobApplications = async (page = 1, pageSize = 25): Promise<StrapiResponse<JobApplication[]>> => {
  // Base fetch without resume details populated
  return fetchAPI(`/api/job-applications?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=createdAt:desc`);
};

export const getFilteredJobApplications = async (status: string, page = 1, pageSize = 25): Promise<StrapiResponse<JobApplication[]>> => {
  if (status === "All") {
    return getJobApplications(page, pageSize);
  }
  // Using standard bracket notation for filtering
  return fetchAPI(`/api/job-applications?filters[currentStatus][$eq]=${status}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=createdAt:desc`);
};

export const getApplicationById = async (id: string | number): Promise<{ data: JobApplication }> => {
  // Populate=* fetches the resume media relation
  return fetchAPI(`/api/job-applications/${id}?populate=*`);
};

export const updateApplicationStatus = async (
  documentId: string, 
  status: "Pending" | "Shortlisted" | "Rejected" | "Replied"
): Promise<{ data: JobApplication }> => {
  return fetchAPI(`/api/job-applications/${documentId}`, {
    method: "PUT",
    body: JSON.stringify({
      // Strapi requires the payload to be wrapped in a "data" object
      data: {
        currentStatus: status,
      },
    }),
  });
};

export const deleteApplication = async (documentId: string) => {
  return fetchAPI(`/api/job-applications/${documentId}`, {
    method: "DELETE",
  });
};