// lib/strapi-job-posts.ts

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

// --- Types ---
export interface StrapiTextNode {
  type: "text";
  text: string;
}

export interface StrapiParagraphBlock {
  type: "paragraph";
  children: StrapiTextNode[];
}

export interface JobPost {
  id: number;
  documentId: string;
  title: string;
  domain: string;
  type: string;
  location: string;
  skills: string;
  extras: string | null;
  overview: StrapiParagraphBlock[];
  responsiblities: StrapiParagraphBlock[]; // Note: using exact spelling from your Strapi response
  requirements: StrapiParagraphBlock[];
  benefits: StrapiParagraphBlock[];
  createdAt: string;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiResponse<T> {
  data: T;
  meta: { pagination: PaginationMeta };
}

// --- Helper Functions for Strapi Rich Text Blocks ---

// Converts a raw string from a textarea into Strapi's Block array format
export const textToBlocks = (text: string): StrapiParagraphBlock[] => {
  if (!text) return [];
  return text.split('\n').filter(line => line.trim() !== '').map(line => ({
    type: "paragraph",
    children: [{ type: "text", text: line }]
  }));
};

// Converts Strapi's Block array format back into a single string (separated by newlines)
export const blocksToText = (blocks: StrapiParagraphBlock[] | null): string => {
  if (!blocks || !Array.isArray(blocks)) return "";
  return blocks.map(block => 
    block.children.map(child => child.text).join('')
  ).join('\n');
};

// --- API Calls ---

const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(API_TOKEN ? { Authorization: `Bearer ${API_TOKEN}` } : {}),
    },
    ...options,
  };
  const response = await fetch(`${API_URL}${endpoint}`, defaultOptions);
  if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
  return response.json();
};

export const getJobPosts = async (page = 1, pageSize = 25): Promise<StrapiResponse<JobPost[]>> => {
  return fetchAPI(`/api/job-posts?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=createdAt:desc`);
};

export const getJobPostById = async (documentId: string): Promise<{ data: JobPost }> => {
  return fetchAPI(`/api/job-posts/${documentId}`);
};

export const createJobPost = async (payload: Partial<JobPost>): Promise<{ data: JobPost }> => {
  return fetchAPI(`/api/job-posts`, {
    method: "POST",
    body: JSON.stringify({ data: payload }),
  });
};

export const updateJobPost = async (documentId: string, payload: Partial<JobPost>): Promise<{ data: JobPost }> => {
  return fetchAPI(`/api/job-posts/${documentId}`, {
    method: "PUT",
    body: JSON.stringify({ data: payload }),
  });
};

export const deleteJobPost = async (documentId: string) => {
  return fetchAPI(`/api/job-posts/${documentId}`, { method: "DELETE" });
};