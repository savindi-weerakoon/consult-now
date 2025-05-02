'use client';

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Nested route content */}
            <main className="p-6">
                {children}
            </main>
        </div>
    );
}