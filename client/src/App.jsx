
import React, { useState } from 'react';
import BugForm from './components/BugForm';
import BugList from './components/BugList';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreated = () => setRefreshKey(k => k + 1);

  return (
    <ErrorBoundary>
      <div style={{ padding: 20, maxWidth: 800, margin: '0 auto' }}>
        <h1>MERN Bug Tracker</h1>
        <BugForm onCreated={handleCreated} />
        <hr />
        <BugList refreshKey={refreshKey} />
      </div>
    </ErrorBoundary>
  );
}
