import express from 'express';
import { body } from 'express-validator';
import {
  createPackage,
  deletePackage,
  getAllPackagesAdmin,
  getFeaturedPackages,
  getPackageByIdAdmin,
  getPackageBySlug,
  getPackages,
  togglePackageFeatured,
  togglePackagePublish,
  updatePackage,
} from '../controllers/packageController.js';
import { auth } from '../middleware/authMiddleware.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

const validatePackage = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('coverImage').trim().notEmpty().withMessage('Cover image is required'),
  body('durationDays').isNumeric().withMessage('Duration days is required'),
  body('durationNights').isNumeric().withMessage('Duration nights is required'),
  body('shortDescription').trim().notEmpty().withMessage('Short description is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
];

router.get('/', getPackages);
router.get('/featured', getFeaturedPackages);
router.get('/admin/all', auth, adminAuth, getAllPackagesAdmin);
router.get('/admin/:id', auth, adminAuth, getPackageByIdAdmin);
router.get('/:slug', getPackageBySlug);
router.post('/', auth, adminAuth, validatePackage, createPackage);
router.put('/:id', auth, adminAuth, validatePackage, updatePackage);
router.delete('/:id', auth, adminAuth, deletePackage);
router.patch('/:id/toggle-publish', auth, adminAuth, togglePackagePublish);
router.patch('/:id/toggle-featured', auth, adminAuth, togglePackageFeatured);

export default router;
