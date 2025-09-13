import React, { useEffect, useState } from 'react'
import api from '../api'

export default function AdminDashboard(){
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);

  useEffect(()=>{ load(); }, []);

  async function load(){
    const a = await api.get('/admin/stats');
    setStats(a.data);
    const s = await api.get('/admin/students');
    setStudents(s.data);
  }

  async function block(id){ await api.post(`/admin/students/${id}/block`); load(); }
  async function unblock(id){ await api.post(`/admin/students/${id}/unblock`); load(); }
  async function del(id){ if(!confirm('Delete?')) return; await api.delete(`/admin/students/${id}`); load(); }

  return (
    <div>
      <h3>Admin Dashboard</h3>
      {stats && (
        <div>
          <div>Total feedbacks: {stats.totalFeedback}</div>
          <div>Total students: {stats.totalStudents}</div>
          <h4>Course stats</h4>
          {stats.courseStats.map(c => <div key={c.courseTitle}>{c.courseTitle}: avg {c.avgRating.toFixed(2)} ({c.count})</div>)}
        </div>
      )}

      <h4>Students</h4>
      {students.map(s => (
        <div key={s._id} className="feedback-card">
          <div>{s.name} ({s.email})</div>
          <div>Blocked: {s.blocked ? 'Yes' : 'No'}</div>
          <button onClick={()=>block(s._id)} className="btn">Block</button>
          <button onClick={()=>unblock(s._id)} className="btn">Unblock</button>
          <button onClick={()=>del(s._id)} className="btn">Delete</button>
        </div>
      ))}

      <a className="btn" href={`${import.meta.env.VITE_API_BASE || 'http://localhost:5000'}/api/admin/export`}>Export CSV</a>
    </div>
  )
}
