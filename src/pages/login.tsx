import { useState } from 'react';

import { login } from '../api/auth';
import { Input } from '../components/general/Input';
import { Button } from '../components/general/Button';
import { useUser } from '../context/UserContext';
import { notify } from '../components/general/Notifications';

export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { setUser } = useUser();

	const handleLoginClick = async () => {
		if (!email || !password) return;
		try {
			const user = await login(email, password);
			setUser(user);
		} catch (error) {
			setEmail('');
			setPassword('');
			notify.error('Wrong email or password!');
			console.error(error);
		}
	};
	return (
		<div className="flex h-screen p-10 items-center justify-center">
			<div className="flex flex-col w-1/2 h-full justify-center items-center space-y-6 bg-slate-100 rounded-l-xl">
				<Input
					label="Email address"
					type="email"
					id="email"
					name="email"
					value={email}
					onChange={({ target: { value } }) => setEmail(value)}
				/>
				<Input
					label="Password"
					type="password"
					id="password"
					name="password"
					value={password}
					onChange={({ target: { value } }) => setPassword(value)}
				/>
				<Button text="Login" onClick={handleLoginClick} />
				<span>
					Don't have an account?
					<a href="/signup" className="text-primary font-medium ml-1">
						Sign up
					</a>
				</span>
			</div>

			<div className="bg-[#89c3ff] h-full w-1/2 rounded-r-xl flex justify-center items-center">
				<img className="w-80 h-80" src="src/assets/logo.png" />
			</div>
		</div>
	);
};
