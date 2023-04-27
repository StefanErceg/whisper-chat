import axios from 'axios';
import { User } from '../context/UserContext';

const LINK = import.meta.env.VITE_AUTH_LINK;
const VERSION = import.meta.env.VITE_VERSION;

const http = axios.create({
	baseURL: `${LINK}/api/${VERSION}`,
});

const login = (email: string, password: string) => http.post<User>('/login', { email, password }).then(({ data }) => data);

const logout = () => http.post('/logout', {});

const signup = (name: string, email: string, password: string) => http.post('/signup', { name, email, password });

export { login, logout, signup };
