import React, { useEffect, useState } from 'react';
import API from '../api';

interface Borrow {
  id?: number;
  borrow_date: string;
  return_date: string;
  book: number;
  member: number;
}

interface Book { id: number; title: string; }
interface Member { id: number; contact_number: string; }

const BorrowCRUD = () => {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [form, setForm] = useState<Borrow>({ borrow_date: '', return_date: '', book: 0, member: 0 });
  const [editId, setEditId] = useState<number | null>(null);

  const fetchAll = async () => {
    const [borrowsRes, booksRes, membersRes] = await Promise.all([
      API.get('/borrows/'),
      API.get('/books/'),
      API.get('/members/'),
    ]);
    setBorrows(borrowsRes.data);
    setBooks(booksRes.data);
    setMembers(membersRes.data);
  };

  useEffect(() => { fetchAll(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/borrows/${editId}/`, form);
      setEditId(null);
    } else {
      await API.post('/borrows/', form);
    }
    setForm({ borrow_date: '', return_date: '', book: 0, member: 0 });
    fetchAll();
  };

  const handleDelete = async (id: number) => {
    await API.delete(`/borrows/${id}/`);
    fetchAll();
  };

  const handleEdit = (borrow: Borrow) => {
    setEditId(borrow.id!);
    setForm({ borrow_date: borrow.borrow_date, return_date: borrow.return_date, book: borrow.book, member: borrow.member });
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Borrows</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4 flex-wrap">
        <input className="border rounded px-3 py-2 flex-1" type="date"
          value={form.borrow_date}
          onChange={e => setForm({ ...form, borrow_date: e.target.value })} required />
        <input className="border rounded px-3 py-2 flex-1" type="date"
          value={form.return_date}
          onChange={e => setForm({ ...form, return_date: e.target.value })} />
        <select className="border rounded px-3 py-2 flex-1" value={form.book}
          onChange={e => setForm({ ...form, book: Number(e.target.value) })} required>
          <option value={0}>Select Book</option>
          {books.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
        </select>
        <select className="border rounded px-3 py-2 flex-1" value={form.member}
          onChange={e => setForm({ ...form, member: Number(e.target.value) })} required>
          <option value={0}>Select Member</option>
          {members.map(m => <option key={m.id} value={m.id}>Member {m.id} - {m.contact_number}</option>)}
        </select>
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          {editId ? 'Update' : 'Add'}
        </button>
        {editId && (
          <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => { setEditId(null); setForm({ borrow_date: '', return_date: '', book: 0, member: 0 }); }}>
            Cancel
          </button>
        )}
      </form>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-red-50">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Borrow Date</th>
            <th className="p-2 border">Return Date</th>
            <th className="p-2 border">Book</th>
            <th className="p-2 border">Member</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {borrows.map(borrow => (
            <tr key={borrow.id} className="hover:bg-gray-50">
              <td className="p-2 border">{borrow.id}</td>
              <td className="p-2 border">{borrow.borrow_date}</td>
              <td className="p-2 border">{borrow.return_date || 'Not returned'}</td>
              <td className="p-2 border">{books.find(b => b.id === borrow.book)?.title}</td>
              <td className="p-2 border">Member {borrow.member} - {members.find(m => m.id === borrow.member)?.contact_number}</td>
              <td className="p-2 border">
                <div className="flex gap-2">
                  <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    onClick={() => handleEdit(borrow)}>Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(borrow.id!)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowCRUD;