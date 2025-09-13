// src/pages/Dashboard.jsx
import { useState } from "react";

export default function Dashboard() {
  // Simulated logged-in user
  const [user] = useState({ name: "Tanisha" });

  // Example subjects
  const [subjects] = useState([
    { id: 1, name: "Mathematics", teacher: "Dr. Rao", status: "Active" },
    { id: 2, name: "Data Science", teacher: "Prof. Sharma", status: "Completed" },
    { id: 3, name: "Artificial Intelligence", teacher: "Dr. Patel", status: "Active" },
  ]);

  // Example feedback
  const [feedbacks] = useState([
    { id: 1, subject: "Mathematics", feedback: "Great explanation of concepts!", status: "Submitted" },
    { id: 2, subject: "Data Science", feedback: "Need more case studies.", status: "Pending" },
  ]);

  // Stats
  const submittedCount = feedbacks.filter(fb => fb.status === "Submitted").length;
  const pendingCount = feedbacks.filter(fb => fb.status === "Pending").length;

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-10 text-center space-y-12">

        {/* Welcome */}
        <div>
          <h1 className="text-5xl font-extrabold text-indigo-700 mb-2 drop-shadow-lg">
            👋 Welcome, {user.name}!
          </h1>
          <p className="text-lg text-gray-700">Here’s an overview of your profile, subjects, and feedback.</p>
        </div>

        {/* Subjects Section */}
        <section>
          <h2 className="text-3xl font-bold text-purple-700 mb-6">📚 Your Subjects</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {subjects.map(subj => (
              <div key={subj.id} className="w-60 p-6 rounded-2xl shadow-md bg-gradient-to-r from-purple-100 to-pink-100 hover:scale-105 transform transition">
                <h3 className="text-2xl font-semibold text-gray-800">{subj.name} 📚</h3>
                <p className="text-gray-600 mt-1">Instructor: {subj.teacher}</p>
                <span className={`mt-3 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  subj.status === "Active" ? "bg-green-200 text-green-800" : "bg-blue-200 text-blue-800"
                }`}>
                  {subj.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Feedback Section */}
        <section>
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">📝 Your Feedback</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {feedbacks.map(fb => (
              <div key={fb.id} className="w-72 p-6 rounded-2xl shadow-md bg-gradient-to-r from-indigo-100 to-blue-100 hover:scale-105 transform transition">
                <h3 className="text-2xl font-semibold text-gray-800">{fb.subject}</h3>
                <p className="text-gray-600 mt-2">"{fb.feedback}"</p>
                <span className={`mt-3 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  fb.status === "Submitted" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
                }`}>
                  {fb.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="flex justify-center gap-6 flex-wrap">
          <div className="w-40 p-4 rounded-2xl bg-gradient-to-r from-green-200 to-green-300 shadow-md">
            <p className="text-xl font-bold">{subjects.length}</p>
            <p className="text-gray-700 mt-1">Total Subjects</p>
          </div>
          <div className="w-40 p-4 rounded-2xl bg-gradient-to-r from-blue-200 to-blue-300 shadow-md">
            <p className="text-xl font-bold">{submittedCount}</p>
            <p className="text-gray-700 mt-1">Feedback Submitted</p>
          </div>
          <div className="w-40 p-4 rounded-2xl bg-gradient-to-r from-yellow-200 to-yellow-300 shadow-md">
            <p className="text-xl font-bold">{pendingCount}</p>
            <p className="text-gray-700 mt-1">Feedback Pending</p>
          </div>
        </section>

      </div>
    </div>
  );
}
