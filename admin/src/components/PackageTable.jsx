const formatPrice = (price) => `Rs. ${new Intl.NumberFormat('en-NP').format(price || 0)}`;

const PackageTable = ({ packages, onEdit, onDelete, onTogglePublish, onToggleFeatured }) => (
  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
    {packages.map((packageItem) => (
      <article
        key={packageItem._id}
        className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
      >
        <div className="relative h-48 overflow-hidden bg-slate-100">
          <img
            src={packageItem.coverImage}
            alt={packageItem.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute left-4 top-4 flex gap-2">
            <button
              type="button"
              onClick={() => onTogglePublish(packageItem._id)}
              className={`rounded-full px-3 py-1 text-xs font-bold shadow-sm backdrop-blur ${
                packageItem.isPublished ? 'bg-emerald-100/95 text-emerald-700' : 'bg-slate-100/95 text-slate-600'
              }`}
            >
              {packageItem.isPublished ? 'Published' : 'Draft'}
            </button>
            <button
              type="button"
              onClick={() => onToggleFeatured(packageItem._id)}
              className={`rounded-full px-3 py-1 text-xs font-bold shadow-sm backdrop-blur ${
                packageItem.isFeatured ? 'bg-blue-100/95 text-blue-700' : 'bg-white/90 text-slate-600'
              }`}
            >
              {packageItem.isFeatured ? 'Featured' : 'Standard'}
            </button>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wide text-blue-600">{packageItem.category}</p>
              <h3 className="mt-2 line-clamp-2 text-lg font-bold leading-snug text-slate-950">{packageItem.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{packageItem.location}</p>
            </div>
            <p className="shrink-0 rounded-xl bg-slate-50 px-3 py-2 text-sm font-bold text-slate-900">{formatPrice(packageItem.price)}</p>
          </div>

          <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-600">{packageItem.shortDescription}</p>

          <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs text-slate-500">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="font-bold text-slate-900">{packageItem.durationDays}D</p>
              <p>Duration</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="font-bold text-slate-900">{packageItem.maxGuests}</p>
              <p>Guests</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="font-bold text-slate-900">{packageItem.rating}</p>
              <p>Rating</p>
            </div>
          </div>

          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={() => onEdit(packageItem)}
              className="flex-1 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(packageItem._id)}
              className="rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </div>
      </article>
    ))}

    {packages.length === 0 && (
      <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
        No packages found.
      </div>
    )}
  </div>
);

export default PackageTable;
