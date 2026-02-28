import React, { useEffect, useState } from 'react';
import API from '../api';

interface Library {
  id?: number;
  library_name: string;
  address: string;
}

const LibraryCRUD = () => {
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [form, setForm] = useState<Library>({ library_name: '', address: '' });
  const [editId, setEditId] = useState<number | null>(null);

  const fetchLibraries = async () => {
    const res = await API.get('/libraries/');
    setLibraries(res.data);
  };

  useEffect(() => { fetchLibraries(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/libraries/${editId}/`, form);
      setEditId(null);
    } else {
      await API.post('/libraries/', form);
    }
    setForm({ library_name: '', address: '' });
    fetchLibraries();
  };

  const handleDelete = async (id: number) => {
    await API.delete(`/libraries/${id}/`);
    fetchLibraries();
  };

  const handleEdit = (lib: Library) => {
    setEditId(lib.id!);
    setForm({ library_name: lib.library_name, address: lib.address });
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Libraries</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4 flex-wrap">
        <input className="border rounded px-3 py-2 flex-1" placeholder="Library Name"
          value={form.library_name}
          onChange={e => setForm({ ...form, library_name: e.target.value })} required />
        <input className="border rounded px-3 py-2 flex-1" placeholder="Address"
          value={form.address}
          onChange={e => setForm({ ...form, address: e.target.value })} required />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editId ? 'Update' : 'Add'}
        </button>
        {editId && (
          <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => { setEditId(null); setForm({ library_name: '', address: '' }); }}>
            Cancel
          </button>
        )}
      </form>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-blue-50">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Address</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {libraries.map(lib => (
            <tr key={lib.id} className="hover:bg-gray-50">
              <td className="p-2 border">{lib.id}</td>
              <td className="p-2 border">{lib.library_name}</td>
              <td className="p-2 border">{lib.address}</td>
              <td className="p-2 border">
                <div className="flex gap-2">
                  <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    onClick={() => handleEdit(lib)}>Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(lib.id!)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LibraryCRUD;