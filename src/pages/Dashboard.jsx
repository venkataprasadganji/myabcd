import React from 'react';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {user?.name || 'User'} 👋</h1>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded shadow">📚 Syllabus</div>
        <div className="bg-green-100 p-4 rounded shadow">📘 Books</div>
        <div className="bg-yellow-100 p-4 rounded shadow">📝 Previous Questions</div>
        <div className="bg-purple-100 p-4 rounded shadow">🧠 AI Memory Tricks</div>
      </div>
    </div>
  );
}
