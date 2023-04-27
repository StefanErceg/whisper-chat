import { useState } from 'react';

import { signup } from '../api/auth';
import { Input } from '../components/general/Input';
import { Button } from '../components/general/Button';
import { useNavigate } from 'react-router';

export const Signup = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const handleSignupClick = async () => {
		if (!name || !email || !password) return;
		try {
			await signup(name, email, password);
			navigate('/login');
		} catch (error) {
			setName('');
			setEmail('');
			setPassword('');
			console.error(error);
		}
	};

	return (
		<div className="flex h-screen p-10 items-center justify-center">
			<div className="flex flex-col w-1/2 h-full justify-center items-center space-y-6 bg-slate-100 rounded-l-xl">
				<Input label="Name" type="text" id="name" name="name" value={name} onChange={({ target: { value } }) => setName(value)} />

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
				<Button text="Signup" onClick={handleSignupClick} />
				<a href="/login" className="text-primary font-medium ml-1">
					Back to login
				</a>
			</div>

			<div className="bg-[#89c3ff] h-full w-1/2 rounded-r-xl flex justify-center items-center">
				<img className="w-80 h-80" src="src/assets/logo.png" />
			</div>
		</div>
	);
};
