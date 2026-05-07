import { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCabins: 0,
    totalBookings: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/users');
      setStats(prev => ({ ...prev, totalUsers: response.data.length }));
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Cabins</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalCabins}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Bookings</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.totalBookings}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;