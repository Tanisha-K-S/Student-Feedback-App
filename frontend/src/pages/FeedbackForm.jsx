import React, { useState } from 'react'
import api from '../api'

export default function FeedbackForm({ courses }){
  const [form, setForm] = useState({ courseId: '', rating: 5, message: '' });
  const [msg, setMsg] = useState('');

  async function submit(e){
    e.preventDefault();
    try{
      await api.post('/feedbacks', { courseId: form.courseId, rating: form.rating, message: form.message });
      setMsg('Feedback submitted');
    }catch(err){ setMsg(err.response?.data?.msg || 'Error'); }
  }

  return (
    <div>
      <h4>Submit Feedback</h4>
      <form onSubmit={submit}>
        <select className="input" value={form.courseId} onChange={e=>setForm({...form, courseId: e.target.value})}>
          <option value="">-- Select course --</option>
          {courses.map(c=> <option value={c._id} key={c._id}>{c.title} ({c.code})</option>)}
        </select>
        <input className="input" type="number" min="1" max="5" value={form.rating} onChange={e=>setForm({...form, rating: e.target.value})} />
        <textarea className="input" placeholder="Message" value={form.message} onChange={e=>setForm({...form, message: e.target.value})} />
        <button className="btn">Submit</button>
      </form>
      {msg && <small>{msg}</small>}
    </div>
  )
}
