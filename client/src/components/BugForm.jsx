import React, { useState } from 'react';
import { createBug } from '../services/api';

export default function BugForm({ onCreated }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('low');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!title.trim()) return setError('Title required');

    try {
      setLoading(true);
      await createBug({ title, description: desc, priority });
      setTitle('');
      setDesc('');
      setPriority('low');
      if (typeof onCreated === 'function') onCreated();
    } catch (err) {
      setError(err?.response?.data?.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div role="alert" style={{ color: 'red' }}>{error}</div>}
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
      <label>
        Priority:
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <button type="submit" disabled={loading}>{loading ? 'Reporting...' : 'Report Bug'}</button>
    </form>
  );
}
