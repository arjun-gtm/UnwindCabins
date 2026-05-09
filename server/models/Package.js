import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    location: { type: String, required: true, trim: true },
    country: { type: String, default: 'Nepal', trim: true },
    category: {
      type: String,
      enum: ['Adventure', 'Luxury', 'Honeymoon', 'Family', 'Trekking', 'Cultural', 'Wildlife', 'Relaxation'],
      required: true,
    },
    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'NPR', trim: true },
    durationDays: { type: Number, required: true, min: 1 },
    durationNights: { type: Number, required: true, min: 0 },
    maxGuests: { type: Number, default: 2, min: 1 },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    reviewsCount: { type: Number, default: 0, min: 0 },
    images: [{ type: String, trim: true }],
    coverImage: { type: String, required: true, trim: true },
    amenities: [{ type: String, trim: true }],
    highlights: [{ type: String, trim: true }],
    itinerary: [itinerarySchema],
    included: [{ type: String, trim: true }],
    excluded: [{ type: String, trim: true }],
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'createdByModel',
    },
    createdByModel: {
      type: String,
      enum: ['Admin', 'User'],
    },
  },
  { timestamps: true }
);

packageSchema.index({ slug: 1 }, { unique: true });
packageSchema.index({ title: 'text', location: 'text' });
packageSchema.index({ category: 1 });
packageSchema.index({ price: 1 });
packageSchema.index({ isPublished: 1 });
packageSchema.index({ isFeatured: 1 });

const Package = mongoose.model('Package', packageSchema);

export default Package;
