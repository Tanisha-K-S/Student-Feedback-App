import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Profile(){
  const userJSON = localStorage.getItem('user');
  const storedUser = userJSON ? JSON.parse(userJSON) : null;
  const [form, setForm] = useState({ name: '', email: '', phone: '', dob: '', address: '' });
  const [msg, setMsg] = useState('');

  useEffect(()=>{ if(storedUser) setForm(f=>({ ...f, name: storedUser.name, email: storedUser.email })); }, []);

  async function save(e){
    e.preventDefault();
    try{
      // simple endpoint: update profile via /api/admin/students/:id - or we could build a dedicated endpoint
      await api.put(`/admin/students/${storedUser.id}`, { name: form.name, phone: form.phone, dob: form.dob, address: form.address });
      setMsg('Saved');
    }catch(err){ setMsg(err.response?.data?.msg || 'Error'); }
  }

  return (
    <div>
      <h3>Profile</h3>
      <form onSubmit={save}>
        <input className="input" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
        <input className="input" value={form.email} disabled />
        <input className="input" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} />
        <input className="input" type="date" value={form.dob} onChange={e=>setForm({...form, dob: e.target.value})} />
        <textarea className="input" placeholder="Address" value={form.address} onChange={e=>setForm({...form, address: e.target.value})} />
        <button className="btn">Save</button>
      </form>
      {msg && <small>{msg}</small>}
    </div>
  )
}
