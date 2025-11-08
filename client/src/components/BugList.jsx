import React, { useEffect, useState } from 'react';
import { fetchBugs, updateBug, deleteBug } from '../services/api';
import BugItem from './BugItem';

export default function BugList({ refreshKey = 0 }) {
  const [bugs, setBugs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchBugs();
      setBugs(res.data);
    } catch (err) {
      setError('Could not load bugs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // refreshKey included so parent can force reload after create
  }, [refreshKey]);

  const handleResolve = async (id) => {
    await updateBug(id, { status: 'resolved' });
    load();
  };

  const handleDelete = async (id) => {
    await deleteBug(id);
    load();
  };

  if (loading) return <div>Loading bugs...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (bugs.length === 0) return <div>No bugs reported</div>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {bugs.map(b => (
        <BugItem key={b._id} bug={b} onResolve={handleResolve} onDelete={handleDelete} />
      ))}
    </ul>
  );
}
