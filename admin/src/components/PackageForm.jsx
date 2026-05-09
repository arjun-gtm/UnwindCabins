import { useEffect, useMemo, useState } from 'react';

const categories = ['Adventure', 'Luxury', 'Honeymoon', 'Family', 'Trekking', 'Cultural', 'Wildlife', 'Relaxation'];

const emptyPackage = {
  title: '',
  slug: '',
  location: '',
  category: 'Adventure',
  shortDescription: '',
  description: '',
  price: '',
  durationDays: '',
  durationNights: '',
  maxGuests: 2,
  rating: 4.5,
  reviewsCount: 0,
  coverImage: '',
  images: '',
  amenities: '',
  highlights: '',
  included: '',
  excluded: '',
  itinerary: [{ day: 1, title: '', description: '' }],
  isFeatured: false,
  isPublished: true,
};

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const toCommaValue = (value) => (Array.isArray(value) ? value.join(', ') : value || '');

const normalizePackage = (packageItem) => ({
  ...emptyPackage,
  ...packageItem,
  images: toCommaValue(packageItem?.images),
  amenities: toCommaValue(packageItem?.amenities),
  highlights: toCommaValue(packageItem?.highlights),
  included: toCommaValue(packageItem?.included),
  excluded: toCommaValue(packageItem?.excluded),
  itinerary: packageItem?.itinerary?.length ? packageItem.itinerary : emptyPackage.itinerary,
});

const splitComma = (value) => value.split(',').map((item) => item.trim()).filter(Boolean);

const fieldClass = 'mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100';

const PackageForm = ({ selectedPackage, onCancel, onSubmit, saving }) => {
  const [form, setForm] = useState(emptyPackage);
  const [slugTouched, setSlugTouched] = useState(false);

  useEffect(() => {
    setForm(selectedPackage ? normalizePackage(selectedPackage) : emptyPackage);
    setSlugTouched(Boolean(selectedPackage?.slug));
  }, [selectedPackage]);

  const titleLabel = useMemo(() => (selectedPackage ? 'Edit package' : 'Add package'), [selectedPackage]);

  const updateField = (field, value) => {
    setForm((current) => {
      const next = { ...current, [field]: value };
      if (field === 'title' && !slugTouched) next.slug = slugify(value);
      return next;
    });
  };

  const updateItinerary = (index, field, value) => {
    setForm((current) => ({
      ...current,
      itinerary: current.itinerary.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: field === 'day' ? Number(value) : value } : item
      ),
    }));
  };

  const addItineraryDay = () => {
    setForm((current) => ({
      ...current,
      itinerary: [...current.itinerary, { day: current.itinerary.length + 1, title: '', description: '' }],
    }));
  };

  const removeItineraryDay = (index) => {
    setForm((current) => ({
      ...current,
      itinerary: current.itinerary.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...form,
      price: Number(form.price),
      durationDays: Number(form.durationDays),
      durationNights: Number(form.durationNights),
      maxGuests: Number(form.maxGuests),
      rating: Number(form.rating),
      reviewsCount: Number(form.reviewsCount),
      images: splitComma(form.images),
      amenities: splitComma(form.amenities),
      highlights: splitComma(form.highlights),
      included: splitComma(form.included),
      excluded: splitComma(form.excluded),
      itinerary: form.itinerary.filter((item) => item.title && item.description),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 bg-slate-50/70 p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-blue-600">Package editor</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-950">{titleLabel}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">Create polished, database-backed packages for the user site.</p>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={onCancel} className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-60">
            {saving ? 'Saving...' : 'Save package'}
          </button>
        </div>
        </div>
      </div>

      <div className="space-y-8 p-6 sm:p-8">
      <section>
      <h4 className="text-sm font-bold uppercase tracking-wide text-slate-400">Core details</h4>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-semibold text-slate-700">
          Title
          <input value={form.title} onChange={(event) => updateField('title', event.target.value)} className={fieldClass} required />
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Slug
          <input
            value={form.slug}
            onChange={(event) => {
              setSlugTouched(true);
              updateField('slug', slugify(event.target.value));
            }}
            className={fieldClass}
          />
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Location
          <input value={form.location} onChange={(event) => updateField('location', event.target.value)} className={fieldClass} required />
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Category
          <select value={form.category} onChange={(event) => updateField('category', event.target.value)} className={fieldClass}>
            {categories.map((category) => <option key={category}>{category}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-700">
          Price
          <input type="number" value={form.price} onChange={(event) => updateField('price', event.target.value)} className={fieldClass} required />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm font-medium text-gray-700">
            Days
            <input type="number" value={form.durationDays} onChange={(event) => updateField('durationDays', event.target.value)} className={fieldClass} required />
          </label>
          <label className="text-sm font-medium text-gray-700">
            Nights
            <input type="number" value={form.durationNights} onChange={(event) => updateField('durationNights', event.target.value)} className={fieldClass} required />
          </label>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <label className="text-sm font-medium text-gray-700">
            Guests
            <input type="number" value={form.maxGuests} onChange={(event) => updateField('maxGuests', event.target.value)} className={fieldClass} />
          </label>
          <label className="text-sm font-medium text-gray-700">
            Rating
            <input type="number" step="0.1" value={form.rating} onChange={(event) => updateField('rating', event.target.value)} className={fieldClass} />
          </label>
          <label className="text-sm font-medium text-gray-700">
            Reviews
            <input type="number" value={form.reviewsCount} onChange={(event) => updateField('reviewsCount', event.target.value)} className={fieldClass} />
          </label>
        </div>
      </div>
      </section>

      <section>
      <h4 className="text-sm font-bold uppercase tracking-wide text-slate-400">Descriptions</h4>
      <label className="mt-4 block text-sm font-semibold text-slate-700">
        Short description
        <textarea value={form.shortDescription} onChange={(event) => updateField('shortDescription', event.target.value)} className={fieldClass} rows="2" required />
      </label>
      <label className="mt-4 block text-sm font-semibold text-slate-700">
        Description
        <textarea value={form.description} onChange={(event) => updateField('description', event.target.value)} className={fieldClass} rows="4" required />
      </label>
      </section>

      <section>
      <h4 className="text-sm font-bold uppercase tracking-wide text-slate-400">Media</h4>
      <label className="mt-4 block text-sm font-semibold text-slate-700">
        Cover image URL
        <input value={form.coverImage} onChange={(event) => updateField('coverImage', event.target.value)} className={fieldClass} required />
      </label>
      {form.coverImage && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
          <img src={form.coverImage} alt="Cover preview" className="h-56 w-full object-cover" />
        </div>
      )}

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {['images', 'amenities', 'highlights', 'included', 'excluded'].map((field) => (
          <label key={field} className="text-sm font-semibold capitalize text-slate-700">
            {field}
            <textarea value={form[field]} onChange={(event) => updateField(field, event.target.value)} className={fieldClass} rows="2" placeholder="Comma-separated values" />
          </label>
        ))}
      </div>
      </section>

      <section>
      <div className="rounded-2xl border border-slate-200 p-5">
        <div className="mb-3 flex items-center justify-between">
          <h4 className="font-semibold text-slate-900">Itinerary</h4>
          <button type="button" onClick={addItineraryDay} className="rounded-xl bg-slate-950 px-3 py-2 text-sm text-white hover:bg-slate-800">
            Add day
          </button>
        </div>
        <div className="space-y-3">
          {form.itinerary.map((item, index) => (
            <div key={index} className="grid gap-3 rounded-2xl bg-slate-50 p-3 md:grid-cols-[90px_1fr_1.4fr_auto]">
              <input type="number" value={item.day} onChange={(event) => updateItinerary(index, 'day', event.target.value)} className={fieldClass} />
              <input value={item.title} onChange={(event) => updateItinerary(index, 'title', event.target.value)} className={fieldClass} placeholder="Day title" />
              <input value={item.description} onChange={(event) => updateItinerary(index, 'description', event.target.value)} className={fieldClass} placeholder="Description" />
              <button type="button" onClick={() => removeItineraryDay(index)} className="self-end rounded-xl border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      </section>

      <div className="flex flex-wrap gap-5 rounded-2xl bg-slate-50 p-5">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <input type="checkbox" checked={form.isPublished} onChange={(event) => updateField('isPublished', event.target.checked)} />
          Published
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
          <input type="checkbox" checked={form.isFeatured} onChange={(event) => updateField('isFeatured', event.target.checked)} />
          Featured
        </label>
      </div>
      </div>
    </form>
  );
};

export default PackageForm;
