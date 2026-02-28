import axios from 'axios';

const API = axios.create({
  baseURL: 'https://library-api-1oyn.onrender.com/api',
});

export default API;

// ── LIBRARIES ──
export const getLibraries = () => API.get('/libraries/');
export const createLibrary = (data: { library_name: string; address: string }) => API.post('/libraries/', data);
export const updateLibrary = (id: number, data: { library_name: string; address: string }) => API.put(`/libraries/${id}/`, data);
export const deleteLibrary = (id: number) => API.delete(`/libraries/${id}/`);

// ── AUTHORS ──
export const getAuthors = () => API.get('/authors/');
export const createAuthor = (data: { author_name: string }) => API.post('/authors/', data);
export const updateAuthor = (id: number, data: { author_name: string }) => API.put(`/authors/${id}/`, data);
export const deleteAuthor = (id: number) => API.delete(`/authors/${id}/`);

// ── BOOKS ──
export const getBooks = () => API.get('/books/');
export const createBook = (data: object) => API.post('/books/', data);
export const updateBook = (id: number, data: object) => API.put(`/books/${id}/`, data);
export const deleteBook = (id: number) => API.delete(`/books/${id}/`);

// ── MEMBERS ──
export const getMembers = () => API.get('/members/');
export const createMember = (data: object) => API.post('/members/', data);
export const updateMember = (id: number, data: object) => API.put(`/members/${id}/`, data);
export const deleteMember = (id: number) => API.delete(`/members/${id}/`);

// ── BORROWS ──
export const getBorrows = () => API.get('/borrows/');
export const createBorrow = (data: object) => API.post('/borrows/', data);
export const updateBorrow = (id: number, data: object) => API.put(`/borrows/${id}/`, data);
export const deleteBorrow = (id: number) => API.delete(`/borrows/${id}/`);