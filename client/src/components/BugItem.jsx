import React from 'react';

export default function BugItem({ bug, onResolve, onDelete }) {
  return (
    <li style={{ background: '#fff', padding: 12, marginBottom: 8, borderRadius: 6 }}>
      <h4>{bug.title}</h4>
      <p>{bug.description}</p>
      <div>
        <strong>Status:</strong> {bug.status} | <strong>Priority:</strong> {bug.priority}
      </div>
      <div style={{ marginTop: 8 }}>
        {bug.status !== 'resolved' && <button onClick={() => onResolve(bug._id)}>Resolve</button>}
        <button onClick={() => onDelete(bug._id)}>Delete</button>
      </div>
    </li>
  );
}
