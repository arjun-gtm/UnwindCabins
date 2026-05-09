import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import PackageForm from './PackageForm';
import PackageTable from './PackageTable';
import {
  createPackage,
  deletePackage,
  getAdminPackages,
  togglePackageFeatured,
  togglePackagePublish,
  updatePackage,
} from '../services/packageService';

const PackageManagement = ({ mode = 'list' }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const response = await getAdminPackages();
      setPackages(response.data.data || []);
    } catch (fetchError) {
      toast.error(fetchError.response?.data?.message || 'Failed to load packages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const selectedPackage = useMemo(
    () => packages.find((packageItem) => packageItem._id === id),
    [packages, id]
  );

  const filteredPackages = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return packages;
    return packages.filter((packageItem) =>
      [packageItem.title, packageItem.location, packageItem.category, packageItem.slug].some((value) =>
        value?.toLowerCase().includes(query)
      )
    );
  }, [packages, search]);

  const stats = {
    total: packages.length,
    published: packages.filter((packageItem) => packageItem.isPublished).length,
    featured: packages.filter((packageItem) => packageItem.isFeatured).length,
  };

  const isFormMode = mode === 'new' || mode === 'edit';

  const handleSubmit = async (payload) => {
    setSaving(true);
    try {
      if (mode === 'edit' && selectedPackage) {
        await updatePackage(selectedPackage._id, payload);
        toast.success('Package updated successfully.');
      } else {
        await createPackage(payload);
        toast.success('Package created successfully.');
      }
      await fetchPackages();
      navigate('/packages');
    } catch (submitError) {
      toast.error(submitError.response?.data?.message || 'Failed to save package.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (packageId) => {
    const packageItem = packages.find((item) => item._id === packageId);
    if (!window.confirm(`Delete ${packageItem?.title || 'this package'}? This cannot be undone.`)) return;
    try {
      await deletePackage(packageId);
      setPackages((current) => current.filter((packageItem) => packageItem._id !== packageId));
      toast.success('Package deleted.');
    } catch (deleteError) {
      toast.error(deleteError.response?.data?.message || 'Failed to delete package.');
    }
  };

  const refreshAfterToggle = async (toggleFn, packageId) => {
    try {
      const response = await toggleFn(packageId);
      setPackages((current) => current.map((packageItem) => (packageItem._id === packageId ? response.data.data : packageItem)));
      toast.success(response.data.message || 'Package updated.');
    } catch (toggleError) {
      toast.error(toggleError.response?.data?.message || 'Failed to update package.');
    }
  };

  if (isFormMode) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <button
            type="button"
            onClick={() => navigate('/packages')}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
          >
            Back to packages
          </button>
          <h2 className="mt-6 text-2xl font-bold text-slate-950">{mode === 'edit' ? 'Edit package' : 'Create package'}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
            Build detailed travel experiences with pricing, images, itinerary, highlights, and publishing controls.
          </p>
        </div>

        {mode === 'edit' && loading ? (
          <div className="rounded-3xl bg-white p-8 text-sm text-slate-500 shadow-sm">Loading package...</div>
        ) : mode === 'edit' && !selectedPackage ? (
          <div className="rounded-3xl bg-white p-8 text-sm text-slate-500 shadow-sm">Package not found.</div>
        ) : (
          <PackageForm
            selectedPackage={mode === 'edit' ? selectedPackage : null}
            onCancel={() => navigate('/packages')}
            onSubmit={handleSubmit}
            saving={saving}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Travel catalog</p>
          <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">Package Management</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
                Manage public packages, publishing status, featured placement, pricing, and package content.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/packages/new')}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Add package
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {Object.entries(stats).map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by title, slug, category, or location"
          className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 sm:max-w-lg"
        />
        <p className="text-sm text-slate-500">{filteredPackages.length} package{filteredPackages.length === 1 ? '' : 's'}</p>
      </div>

      {loading ? (
        <div className="rounded-3xl bg-white p-8 text-sm text-slate-500 shadow-sm">Loading packages...</div>
      ) : (
        <PackageTable
          packages={filteredPackages}
          onEdit={(packageItem) => navigate(`/packages/${packageItem._id}/edit`)}
          onDelete={handleDelete}
          onTogglePublish={(packageId) => refreshAfterToggle(togglePackagePublish, packageId)}
          onToggleFeatured={(packageId) => refreshAfterToggle(togglePackageFeatured, packageId)}
        />
      )}
    </div>
  );
};

export default PackageManagement;
