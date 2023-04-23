import { createContext, useContext, useState } from 'react';

export interface User {
	id: string;
	name: string;
}

type ContextType = {
	user: User;
	setUser: (user: User) => void;
};

export const UserContext = createContext<ContextType>({
	user: { id: '', name: '' },
	setUser: () => {},
});

interface ContextProviderProps {
	children: React.ReactNode;
}

export const UserContextProvider = ({ children }: ContextProviderProps) => {
	const [user, setUser] = useState<User>({ id: '', name: '' });

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
