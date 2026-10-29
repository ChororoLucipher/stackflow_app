import { X } from 'lucide-react';
export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;
return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">{title}</h2>
                <button onClick={onClose}><X size={20} className="text-gray-500" />
                </button>
            </div>
            <div className="p-4">{children}</div>
        </div>
    </div>
);
}