export default function DashboardHomePage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Welcome 👋</h2>
      <p className="text-gray-600 mb-2">
        This is your personalized dashboard. From here, you’ll be able to:
      </p>
      <ul className="list-disc list-inside text-gray-700">
        <li>View available counsellors</li>
        <li>Book your sessions</li>
        <li>Send and receive messages</li>
      </ul>
    </div>
  );
}
