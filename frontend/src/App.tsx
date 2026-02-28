import React from 'react';
import LibraryCRUD from './components/LibraryCRUD';
import AuthorCRUD from './components/AuthorCRUD';
import BookCRUD from './components/BookCRUD';
import MemberCRUD from './components/MemberCRUD';
import BorrowCRUD from './components/BorrowCRUD';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-center text-blue-600 text-3xl font-bold mb-8">
        Library Management System
      </h1>
      <LibraryCRUD />
      <AuthorCRUD />
      <BookCRUD />
      <MemberCRUD />
      <BorrowCRUD />
    </div>
  );
}

export default App;