export default function Dashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Welcome to StockFlow</h3>
                    <p className="text-2xl font-bold text-gray-900 mt-2">Navigate to Products to begin.</p>
                </div>
            </div>
        </div>
        );
}    