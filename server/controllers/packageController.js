import { validationResult } from 'express-validator';
import Package from '../models/Package.js';

const slugify = (value = '') =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

const sendSuccess = (res, data, message = 'Success', statusCode = 200) =>
  res.status(statusCode).json({ success: true, data, message });

const buildPackagePayload = (body) => {
  const payload = { ...body };
  payload.slug = slugify(body.slug || body.title);

  ['price', 'durationDays', 'durationNights', 'maxGuests', 'rating', 'reviewsCount'].forEach((field) => {
    if (payload[field] !== undefined && payload[field] !== '') payload[field] = Number(payload[field]);
  });

  ['images', 'amenities', 'highlights', 'included', 'excluded'].forEach((field) => {
    if (typeof payload[field] === 'string') {
      payload[field] = payload[field].split(',').map((item) => item.trim()).filter(Boolean);
    }
  });

  return payload;
};

const sortMap = {
  price_asc: { price: 1 },
  price_desc: { price: -1 },
  rating: { rating: -1, reviewsCount: -1 },
  newest: { createdAt: -1 },
};

export const getPackages = asyncHandler(async (req, res) => {
  const {
    search,
    location,
    category,
    minPrice,
    maxPrice,
    featured,
    sort = 'newest',
    page = 1,
    limit = 12,
  } = req.query;

  const query = { isPublished: true };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
      { shortDescription: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }
  if (location) query.location = { $regex: location, $options: 'i' };
  if (category) query.category = category;
  if (featured === 'true') query.isFeatured = true;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const currentPage = Math.max(Number(page) || 1, 1);
  const perPage = Math.min(Math.max(Number(limit) || 12, 1), 48);
  const skip = (currentPage - 1) * perPage;

  const [packages, total] = await Promise.all([
    Package.find(query).sort(sortMap[sort] || sortMap.newest).skip(skip).limit(perPage),
    Package.countDocuments(query),
  ]);

  res.json({
    success: true,
    count: total,
    page: currentPage,
    pages: Math.ceil(total / perPage) || 1,
    data: packages,
  });
});

export const getFeaturedPackages = asyncHandler(async (req, res) => {
  const packages = await Package.find({ isPublished: true, isFeatured: true }).sort({ rating: -1, createdAt: -1 });
  sendSuccess(res, packages, 'Featured packages fetched');
});

export const getPackageBySlug = asyncHandler(async (req, res) => {
  const packageItem = await Package.findOne({ slug: req.params.slug, isPublished: true });
  if (!packageItem) return res.status(404).json({ success: false, message: 'Package not found' });
  sendSuccess(res, packageItem, 'Package fetched');
});

export const getAllPackagesAdmin = asyncHandler(async (req, res) => {
  const packages = await Package.find().sort({ createdAt: -1 });
  sendSuccess(res, packages, 'All packages fetched');
});

export const getPackageByIdAdmin = asyncHandler(async (req, res) => {
  const packageItem = await Package.findById(req.params.id);
  if (!packageItem) return res.status(404).json({ success: false, message: 'Package not found' });
  sendSuccess(res, packageItem, 'Package fetched');
});

export const createPackage = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
  }

  const packageItem = await Package.create(buildPackagePayload(req.body));
  sendSuccess(res, packageItem, 'Package created', 201);
});

export const updatePackage = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
  }

  const packageItem = await Package.findByIdAndUpdate(req.params.id, buildPackagePayload(req.body), {
    new: true,
    runValidators: true,
  });
  if (!packageItem) return res.status(404).json({ success: false, message: 'Package not found' });
  sendSuccess(res, packageItem, 'Package updated');
});

export const deletePackage = asyncHandler(async (req, res) => {
  const packageItem = await Package.findByIdAndDelete(req.params.id);
  if (!packageItem) return res.status(404).json({ success: false, message: 'Package not found' });
  sendSuccess(res, packageItem, 'Package deleted');
});

export const togglePackagePublish = asyncHandler(async (req, res) => {
  const packageItem = await Package.findById(req.params.id);
  if (!packageItem) return res.status(404).json({ success: false, message: 'Package not found' });
  packageItem.isPublished = !packageItem.isPublished;
  await packageItem.save();
  sendSuccess(res, packageItem, packageItem.isPublished ? 'Package published' : 'Package unpublished');
});

export const togglePackageFeatured = asyncHandler(async (req, res) => {
  const packageItem = await Package.findById(req.params.id);
  if (!packageItem) return res.status(404).json({ success: false, message: 'Package not found' });
  packageItem.isFeatured = !packageItem.isFeatured;
  await packageItem.save();
  sendSuccess(res, packageItem, packageItem.isFeatured ? 'Package featured' : 'Package unfeatured');
});
