import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';
const emptyForm = { name: '', sku: '', category: '', purchase_price: '',
selling_price: '', quantity: '' };
export default function Products() {
const { user } = useAuth();
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [isModalOpen, setIsModalOpen] = useState(false);
const [formData, setFormData] = useState(emptyForm);
const [editingId, setEditingId] = useState(null);
useEffect(() => { fetchProducts(); }, []);
    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await
        supabase.from('products').select('*').order('created_at', { ascending: false });
        if (error) toast.error('Failed to load products');
        else setProducts(data);
        setLoading(false);
    };
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const openAddModal = () => { setFormData(emptyForm); setEditingId(null);
        setIsModalOpen(true); };
        const openEditModal = (product) => { setFormData(product);
        setEditingId(product.id); setIsModalOpen(true); };
        const handleSubmit = async (e) => {
            e.preventDefault();
            const payload = { ...formData, user_id: user.id };
            if (editingId) {
                const { error } = await supabase.from('products').update(payload).eq('id',
                editingId);
                if (error) return toast.error(error.message);
                toast.success('Product updated!');
            } else {
                const { error } = await supabase.from('products').insert([payload]);
                if (error) return toast.error(error.message);
                toast.success('Product added!');
            }
        setIsModalOpen(false);
        fetchProducts();
    };
    
    const handleDelete = async (id) => {
            if (!window.confirm('Are you sure?')) return;
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) toast.error(error.message);
            else { toast.success('Deleted'); fetchProducts(); }
    };

    return (
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Products</h1>
                    <Button onClick={openAddModal}><Plus size={18} /> Add Product</Button>
                </div>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {loading ? <div className="p-8 text-center">Loading...</div> : (
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-4">Name</th><th className="p-4">SKU</th>
                                <th className="p-4">Category</th><th className="p-4">Price</th>
                                <th className="p-4">Stock</th><th className="p-4 textright">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p.id} className="border-b">
                                    <td className="p-4">{p.name}</td><td className="p-4 textgray-500">{p.sku}</td>
                                    <td className="p-4">{p.category}</td><td className="p-4">$
                                    {p.selling_price}</td>
                                    <td className="p-4">{p.quantity}</td>
                                    <td className="p-4 flex justify-end gap-2">
                                    <button onClick={() => openEditModal(p)} className="textblue-600"><Edit size={18} /></button>
                                    <button onClick={() => handleDelete(p.id)} className="textred-600"><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    )}
                </div>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
                title={editingId ? "Edit" : "Add"}>
                    <form onSubmit={handleSubmit}>
                        <Input label="Name" name="name" required value={formData.name}
                        onChange={handleInputChange} />
                        <Input label="SKU" name="sku" required value={formData.sku}
                        onChange={handleInputChange} />
                        <Input label="Category" name="category" required
                        value={formData.category} onChange={handleInputChange} />
                        <div className="flex gap-4">
                            <div className="flex-1"><Input label="Purchase Price" type="number"
                            step="0.01" name="purchase_price" required value={formData.purchase_price}
                            onChange={handleInputChange} />
                            </div>
                            <div className="flex-1"><Input label="Selling Price" type="number"
                            step="0.01" name="selling_price" required value={formData.selling_price}
                            onChange={handleInputChange} />
                            </div>
                        </div>
                        <Input label="Quantity" type="number" name="quantity" required
                        value={formData.quantity} onChange={handleInputChange} />
                        <Button type="submit" className="w-full mt-4">Save</Button>
                    </form>
                </Modal>
            </div>
    );
}