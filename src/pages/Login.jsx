import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
export default function Login() {
const [isLogin, setIsLogin] = useState(true);
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const { signIn, signUp } = useAuth();
const navigate = useNavigate();
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if (isLogin) {
            const { error } = await signIn(email, password);
            if (error) throw error;
            navigate('/');
        } else {
                const { error } = await signUp(email, password);
                if (error) throw error;
                toast.success('Registration successful!');
                navigate('/');
        }
    } catch (error) {
        toast.error(error.message);
    }
};
return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Login' :
            'Register'}</h2>
            <form onSubmit={handleSubmit}>
                <Input label="Email" type="email" value={email} onChange={e =>
                setEmail(e.target.value)} required />
                <Input label="Password" type="password" value={password} onChange={e =>
                setPassword(e.target.value)} required />
                <Button type="submit" className="w-full mt-4">{isLogin ? 'Sign In' :
                'Sign Up'}</Button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)} className="w-full text-center
            text-sm text-blue-600 mt-4">
            {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
            </button>
        </div>
    </div>
    );
}
    
