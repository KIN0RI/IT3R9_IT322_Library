import React, { useEffect, useState } from 'react';
import API from '../api';

interface Book {
  id?: number;
  title: string;
  author: number;
  library: number;
}

interface Author { id: number; author_name: string; }
interface Library { id: number; library_name: string; }

const BookCRUD = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [form, setForm] = useState<Book>({ title: '', author: 0, library: 0 });
  const [editId, setEditId] = useState<number | null>(null);

  const fetchAll = async () => {
    const [booksRes, authorsRes, librariesRes] = await Promise.all([
      API.get('/books/'),
      API.get('/authors/'),
      API.get('/libraries/'),
    ]);
    setBooks(booksRes.data);
    setAuthors(authorsRes.data);
    setLibraries(librariesRes.data);
  };

  useEffect(() => { fetchAll(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await API.put(`/books/${editId}/`, form);
      setEditId(null);
    } else {
      await API.post('/books/', form);
    }
    setForm({ title: '', author: 0, library: 0 });
    fetchAll();
  };

  const handleDelete = async (id: number) => {
    await API.delete(`/books/${id}/`);
    fetchAll();
  };

  const handleEdit = (book: Book) => {
    setEditId(book.id!);
    setForm({ title: book.title, author: book.author, library: book.library });
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-2xl font-bold text-purple-600 mb-4">Books</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4 flex-wrap">
        <input className="border rounded px-3 py-2 flex-1" placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })} required />
        <select className="border rounded px-3 py-2 flex-1" value={form.author}
          onChange={e => setForm({ ...form, author: Number(e.target.value) })} required>
          <option value={0}>Select Author</option>
          {authors.map(a => <option key={a.id} value={a.id}>{a.author_name}</option>)}
        </select>
        <select className="border rounded px-3 py-2 flex-1" value={form.library}
          onChange={e => setForm({ ...form, library: Number(e.target.value) })} required>
          <option value={0}>Select Library</option>
          {libraries.map(l => <option key={l.id} value={l.id}>{l.library_name}</option>)}
        </select>
        <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          {editId ? 'Update' : 'Add'}
        </button>
        {editId && (
          <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => { setEditId(null); setForm({ title: '', author: 0, library: 0 }); }}>
            Cancel
          </button>
        )}
      </form>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-purple-50">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Author</th>
            <th className="p-2 border">Library</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id} className="hover:bg-gray-50">
              <td className="p-2 border">{book.id}</td>
              <td className="p-2 border">{book.title}</td>
              <td className="p-2 border">{authors.find(a => a.id === book.author)?.author_name}</td>
              <td className="p-2 border">{libraries.find(l => l.id === book.library)?.library_name}</td>
              <td className="p-2 border">
                <div className="flex gap-2">
                  <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    onClick={() => handleEdit(book)}>Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(book.id!)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookCRUD;