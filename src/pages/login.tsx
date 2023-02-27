import { Input } from '../components/general/Input';
import { Button } from '../components/general/Button';

export const Login = () => {
	return (
		<div className="flex h-screen p-10 items-center justify-center">
			<div className="flex flex-col w-1/2 h-full justify-center items-center space-y-6 bg-slate-100 rounded-l-xl">
				<Input label="Email address" type="email" id="password" name="password" />
				<Input label="Password" type="password" id="password" name="password" />
				<Button text="Login" />
			</div>

			<div className="bg-[#89c3ff] h-full w-1/2 rounded-r-xl flex justify-center items-center">
				<img className="w-80 h-80" src="src/assets/logo.png" />
			</div>

			{/* <div className="flex flex-col w-1/2 h-full space-y-4 justify-center bg-blue-100 p-20 rounded-xl border border-slate-100">
				<div>
					<p className="text-lg">Welcome to Whisper chat!</p>
					<p className="text-sm font-medium">Chat securely and freely!</p>
				</div>
			</div> */}
		</div>
	);
};
