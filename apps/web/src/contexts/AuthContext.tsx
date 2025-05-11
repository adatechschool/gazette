import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { api } from 'config';

interface AuthContextType {
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<unknown>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const navigate = useNavigate();

	const checkAuth = async () => {
		try {
			await api.get('auth/profile');
			setIsAuthenticated(true);
		} catch (error) {
			setIsAuthenticated(false);
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);

	const login = async (email: string, password: string) => {
		const response = await api
			.post('auth/login', {
				json: { email, password },
			})
			.json();
		setIsAuthenticated(true);
		return response;
	};

	const logout = async () => {
		await api.post('auth/logout');
		setIsAuthenticated(false);
		navigate({ to: '/login' });
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
