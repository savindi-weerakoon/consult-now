'use client';

export default function CounsellorDashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Welcome, Counsellor 👩‍⚕️</h2>
      <p className="text-gray-600 mb-4">
        This is your dedicated space for managing your clients and sessions.
      </p>
      <ul className="list-disc list-inside text-gray-700">
        <li>View and manage upcoming appointments</li>
        <li>Respond to messages from customers</li>
        <li>Update your specialization or availability</li>
      </ul>
    </div>
  );
}
