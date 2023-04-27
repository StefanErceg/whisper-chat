import { createContext, useContext, useEffect, useState } from 'react';

export interface User {
	id: string;
	name: string;
}

type ContextType = {
	user: User | null;
	setUser: (user: User | null) => void;
};

export const UserContext = createContext<ContextType>({
	user: null,
	setUser: () => {},
});

interface ContextProviderProps {
	children: React.ReactNode;
}

export const UserContextProvider = ({ children }: ContextProviderProps) => {
	const initial = JSON.parse(localStorage.getItem('user') || 'null') || null;
	const [user, setUser] = useState<User | null>(initial);

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(user));
	}, [user]);

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
