import React, { useEffect, useState } from 'react';
import API from '../api';

interface Author {
  id?: number;
  author_name: string;
}

const AuthorCRUD = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [form, setForm] = useState<Author>({ author_name: '' });
  const [editId, setEditId] = useState<number | null>(null);

  const fetchAuthors = async () => {
    const res = await API.get('/authors/');
    setAuthors(res.data);
  };

  useEffect(() => { fetchAuthors(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/authors/${editId}/`, form);
      setEditId(null);
    } else {
      await API.post('/authors/', form);
    }
    setForm({ author_name: '' });
    fetchAuthors();
  };

  const handleDelete = async (id: number) => {
    await API.delete(`/authors/${id}/`);
    fetchAuthors();
  };

  const handleEdit = (author: Author) => {
    setEditId(author.id!);
    setForm({ author_name: author.author_name });
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Authors</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4 flex-wrap">
        <input className="border rounded px-3 py-2 flex-1" placeholder="Author Name"
          value={form.author_name}
          onChange={e => setForm({ author_name: e.target.value })} required />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          {editId ? 'Update' : 'Add'}
        </button>
        {editId && (
          <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => { setEditId(null); setForm({ author_name: '' }); }}>
            Cancel
          </button>
        )}
      </form>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-green-50">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map(author => (
            <tr key={author.id} className="hover:bg-gray-50">
              <td className="p-2 border">{author.id}</td>
              <td className="p-2 border">{author.author_name}</td>
              <td className="p-2 border">
                <div className="flex gap-2">
                  <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    onClick={() => handleEdit(author)}>Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(author.id!)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorCRUD;