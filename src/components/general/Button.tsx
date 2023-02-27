import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
}

export const Button = ({ text, ...buttonProps }: Props) => (
	<button
		{...buttonProps}
		className="text-primary border border-slate-500 hover:bg-blue-300 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
	>
		{text}
	</button>
);
