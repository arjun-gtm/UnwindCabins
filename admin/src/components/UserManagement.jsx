import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const emptyForm = {
  name: '',
  email: '',
  contactNumber: '',
  address: '',
  role: 'user',
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/users`);
      setUsers(response.data.data || response.data);
    } catch (fetchError) {
      toast.error(fetchError.response?.data?.message || 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return users;
    return users.filter((user) =>
      [user.name, user.email, user.contactNumber, user.address, user.role].some((value) =>
        value?.toLowerCase().includes(query)
      )
    );
  }, [users, search]);

  const startEdit = (user) => {
    setSelectedUser(user);
    setForm({
      name: user.name || '',
      email: user.email || '',
      contactNumber: user.contactNumber || '',
      address: user.address || '',
      role: user.role || 'user',
    });
  };

  const cancelEdit = () => {
    setSelectedUser(null);
    setForm(emptyForm);
  };

  const updateUser = async (event) => {
    event.preventDefault();
    if (!selectedUser) return;

    setSaving(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/admin/users/${selectedUser._id}`, {
        name: form.name,
        email: form.email,
        contactNumber: form.contactNumber,
        address: form.address,
        role: form.role,
      });
      const updatedUser = response.data.data;
      setUsers((current) => current.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
      toast.success('User updated.');
      cancelEdit();
    } catch (updateError) {
      toast.error(updateError.response?.data?.message || 'Failed to update user.');
    } finally {
      setSaving(false);
    }
  };

  const deleteUser = async (user) => {
    if (!window.confirm(`Delete ${user.name || user.email}? This cannot be undone.`)) return;
    try {
      await axios.delete(`${API_BASE_URL}/admin/users/${user._id}`);
      setUsers((current) => current.filter((item) => item._id !== user._id));
      toast.success('User deleted.');
    } catch (deleteError) {
      toast.error(deleteError.response?.data?.message || 'Failed to delete user.');
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Customers</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">User Management</h2>
            <p className="mt-2 text-sm text-slate-500">Edit customer contact details and manage accounts.</p>
          </div>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search users..."
            className="min-h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-slate-950 focus:bg-white sm:max-w-sm"
          />
        </div>
      </section>

      {selectedUser && (
        <form onSubmit={updateUser} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-950">Edit user</h3>
              <p className="mt-1 text-sm text-slate-500">Update customer account and contact details.</p>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={cancelEdit} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Cancel
              </button>
              <button type="submit" disabled={saving} className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60">
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700">
              Name
              <input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-950 focus:bg-white" />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Email
              <input value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-950 focus:bg-white" />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Contact number
              <input value={form.contactNumber} onChange={(event) => setForm((current) => ({ ...current, contactNumber: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-950 focus:bg-white" />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Address
              <input value={form.address} onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-950 focus:bg-white" />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Role
              <select value={form.role} onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-950 focus:bg-white">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          </div>
        </form>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <p className="p-6 text-sm text-slate-500">Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  {['Name', 'Email', 'Contact', 'Address', 'Role', 'Actions'].map((heading) => (
                    <th key={heading} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 text-sm font-semibold text-slate-900">{user.name}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{user.email}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{user.contactNumber || '-'}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{user.address || '-'}</td>
                    <td className="px-5 py-4 text-sm capitalize text-slate-600">{user.role}</td>
                    <td className="px-5 py-4">
                      <div className="flex gap-3">
                        <button type="button" onClick={() => startEdit(user)} className="text-sm font-semibold text-slate-900 hover:underline">
                          Edit
                        </button>
                        <button type="button" onClick={() => deleteUser(user)} className="text-sm font-semibold text-red-600 hover:underline">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUsers.length === 0 && <p className="p-6 text-sm text-slate-500">No users found.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
