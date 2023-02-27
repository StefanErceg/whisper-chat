import { Route, Routes } from 'react-router';
import { Login } from './pages/login';
import { Dashboard } from './pages/dashboard';

export const AppRouter = () => (
	<Routes>
		<Route path="*" element={<Dashboard />} />
		<Route path="/login" element={<Login />} />
	</Routes>
);
