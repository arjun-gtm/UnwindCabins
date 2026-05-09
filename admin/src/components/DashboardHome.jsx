import { useEffect, useState } from 'react';
import axios from 'axios';
import { getAdminPackages } from '../services/packageService';
import { getAdminBookings } from '../services/bookingService';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPackages: 0,
    publishedPackages: 0,
    totalBookings: 0,
    pendingBookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [usersResponse, packagesResponse, bookingsResponse] = await Promise.all([
          axios.get(`${API_BASE_URL}/admin/users`),
          getAdminPackages(),
          getAdminBookings(),
        ]);

        const users = usersResponse.data.data || usersResponse.data || [];
        const packages = packagesResponse.data.data || [];
        const bookings = bookingsResponse.data.data || [];

        setStats({
          totalUsers: users.length,
          totalPackages: packages.length,
          publishedPackages: packages.filter((packageItem) => packageItem.isPublished).length,
          totalBookings: bookings.length,
          pendingBookings: bookings.filter((booking) => booking.status === 'pending').length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Users', value: stats.totalUsers },
    { label: 'Packages', value: stats.totalPackages },
    { label: 'Published', value: stats.publishedPackages },
    { label: 'Bookings', value: stats.totalBookings },
    { label: 'Pending', value: stats.pendingBookings },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">Today</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">Welcome to your operations hub.</h2>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            Keep packages fresh, bookings moving, and customers confident with a focused admin workspace.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-950">{loading ? '...' : card.value}</p>
          </div>
        ))}
      </section>

    </div>
  );
};

export default DashboardHome;
