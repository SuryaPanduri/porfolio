import React, { useState } from 'react';
import { sendContact } from '../api/api';

export default function Contact(){
  const [form, setForm] = useState({ name:'', email:'', message:''});
  const [status, setStatus] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendContact(form);
      setStatus('sent');
      setForm({name:'', email:'', message:''});
    } catch (err) {
      setStatus('error');
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold">Contact</h2>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <input required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} placeholder="Your name" className="w-full p-2 border rounded" />
        <input required type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} placeholder="Your email" className="w-full p-2 border rounded" />
        <textarea required value={form.message} onChange={e=>setForm({...form, message: e.target.value})} placeholder="Message" className="w-full p-2 border rounded h-40" />
        <button className="px-4 py-2 bg-black text-white rounded">Send</button>
      </form>
      {status === 'sent' && <p className="mt-3 text-green-600">Message sent — I’ll reply soon.</p>}
      {status === 'error' && <p className="mt-3 text-red-600">Error sending message.</p>}
    </div>
  );
}