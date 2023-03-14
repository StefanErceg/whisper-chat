import { Route, Routes } from 'react-router';
import { Login } from './pages/login';
import { Dashboard } from './pages/dashboard';
import { Chat } from './pages/chat';

export const AppRouter = () => (
	<Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/chat" element={<Chat />} />
		<Route path="*" element={<Dashboard />} />
	</Routes>
);
