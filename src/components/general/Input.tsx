import { InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
}

export const Input = ({ label, ...inputProps }: Props) => (
	<div className="relative z-0 w-[360px] mb-6 group">
		<input
			{...inputProps}
			className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
			placeholder=" "
			required
		/>
		<label
			htmlFor={inputProps.id}
			className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
		>
			{label}
		</label>
	</div>
);
