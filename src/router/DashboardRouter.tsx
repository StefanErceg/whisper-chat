import { Navigate, Route, Routes } from 'react-router';
import { Dashboard } from '../pages/dashboard';
import { Chat } from '../pages/chat';
import { Select } from '../pages/select';

export const DashboardRouter = () => (
	<Routes>
		<Route path="/" element={<Dashboard />} />
		<Route path="/select" element={<Select />} />
		<Route path="/chat" element={<Chat />} />
		<Route path="*" element={<Navigate to={'/'} />} />
	</Routes>
);
