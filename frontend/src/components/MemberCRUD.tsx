import React, { useEffect, useState } from 'react';
import API from '../api';

interface Member {
  id?: number;
  contact_number: string;
  library: number;
}

interface Library { id: number; library_name: string; }

const MemberCRUD = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [form, setForm] = useState<Member>({ contact_number: '', library: 0 });
  const [editId, setEditId] = useState<number | null>(null);

  const fetchAll = async () => {
    const [membersRes, librariesRes] = await Promise.all([
      API.get('/members/'),
      API.get('/libraries/'),
    ]);
    setMembers(membersRes.data);
    setLibraries(librariesRes.data);
  };

  useEffect(() => { fetchAll(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/members/${editId}/`, form);
      setEditId(null);
    } else {
      await API.post('/members/', form);
    }
    setForm({ contact_number: '', library: 0 });
    fetchAll();
  };

  const handleDelete = async (id: number) => {
    await API.delete(`/members/${id}/`);
    fetchAll();
  };

  const handleEdit = (member: Member) => {
    setEditId(member.id!);
    setForm({ contact_number: member.contact_number, library: member.library });
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">Members</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4 flex-wrap">
        <input className="border rounded px-3 py-2 flex-1" placeholder="Contact Number"
          value={form.contact_number}
          onChange={e => setForm({ ...form, contact_number: e.target.value })} required />
        <select className="border rounded px-3 py-2 flex-1" value={form.library}
          onChange={e => setForm({ ...form, library: Number(e.target.value) })} required>
          <option value={0}>Select Library</option>
          {libraries.map(l => <option key={l.id} value={l.id}>{l.library_name}</option>)}
        </select>
        <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
          {editId ? 'Update' : 'Add'}
        </button>
        {editId && (
          <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => { setEditId(null); setForm({ contact_number: '', library: 0 }); }}>
            Cancel
          </button>
        )}
      </form>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-orange-50">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Contact Number</th>
            <th className="p-2 border">Library</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.id} className="hover:bg-gray-50">
              <td className="p-2 border">{member.id}</td>
              <td className="p-2 border">{member.contact_number}</td>
              <td className="p-2 border">{libraries.find(l => l.id === member.library)?.library_name}</td>
              <td className="p-2 border">
                <div className="flex gap-2">
                  <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    onClick={() => handleEdit(member)}>Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(member.id!)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberCRUD;