export default function Input({ label, ...props }) {
    return (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}
        </label>
        <input className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2
            focus:ring-blue-500 outline-none"
            {...props}
        />
    </div>
    );
}
    