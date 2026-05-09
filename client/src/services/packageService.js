const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const buildQuery = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') query.set(key, value);
  });
  return query.toString();
};

const request = async (path) => {
  const response = await fetch(`${API_BASE_URL}${path}`);
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || 'Failed to load packages');
  }

  return payload;
};

export const getPackages = async (params = {}) => {
  const query = buildQuery(params);
  return request(`/packages${query ? `?${query}` : ''}`);
};

export const getFeaturedPackages = async () => request('/packages/featured');

export const getPackageBySlug = async (slug) => request(`/packages/${slug}`);

export const formatPackagePrice = (price) => `Rs. ${new Intl.NumberFormat('en-NP').format(price || 0)}`;
