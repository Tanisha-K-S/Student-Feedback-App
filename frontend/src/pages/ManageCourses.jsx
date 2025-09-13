import React, { useEffect, useState } from 'react'
import api from '../api'

export default function ManageCourses(){
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: '', code: '', description: '' });

  useEffect(()=> load(), []);
  function load(){ api.get('/courses').then(r=>setCourses(r.data)).catch(()=>{}); }

  async function add(e){ e.preventDefault(); await api.post('/courses', form); setForm({ title:'', code:'', description:''}); load(); }
  async function remove(id){ if(!confirm('Delete?')) return; await api.delete(`/courses/${id}`); load(); }

  return (
    <div>
      <h3>Manage Courses</h3>
      <form onSubmit={add}>
        <input className="input" placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
        <input className="input" placeholder="Code" value={form.code} onChange={e=>setForm({...form, code:e.target.value})} />
        <textarea className="input" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <button className="btn">Add</button>
      </form>

      <h4>Existing</h4>
      {courses.map(c=> (
        <div key={c._id} className="feedback-card">
          <div>{c.title} ({c.code})</div>
          <button className="btn" onClick={()=>remove(c._id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
