import { Navigate, Route, Routes } from 'react-router';
import { Login } from '../pages/login';
import { Signup } from '../pages/signup';

export const AuthRouter = () => (
	<Routes>
		<Route path="/signup" element={<Signup />} />
		<Route path="/login" element={<Login />} />
		<Route path="*" element={<Navigate to={'/login'} />} />
	</Routes>
);
