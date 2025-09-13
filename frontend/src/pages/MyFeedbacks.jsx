import React, { useEffect, useState } from 'react'
import api from '../api'

export default function MyFeedbacks(){
  const [data, setData] = useState({ items: [] });

  useEffect(()=>{ load(); }, []);

  function load(){ api.get('/feedbacks/mine').then(r=>setData({ items: r.data.items })).catch(()=>{}); }

  async function remove(id){ if(!confirm('Delete?')) return; await api.delete(`/feedbacks/${id}`); load(); }

  return (
    <div>
      <h4>My Feedbacks</h4>
      {data.items.map(f => (
        <div key={f._id} className="feedback-card">
          <strong>{f.course?.title}</strong>
          <div>Rating: {f.rating}</div>
          <div>{f.message}</div>
          <button className="btn" onClick={()=>remove(f._id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}
