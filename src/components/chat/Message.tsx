interface Props {
	received: boolean;
}

export const Message = ({ received }: Props) => (
	<div className={`w-full p-4 flex ${received ? 'justify-start' : 'justify-end'}`}>
		<div className={`max-w-3xl p-4 ${received ? 'bg-blue-200' : 'bg-white'} rounded-xl w-full`}>
			Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime fuga libero, illum aliquid repellendus laboriosam porro quidem
			debitis cupiditate id sit corrupti, ullam provident veniam quaerat labore ad molestias quas.
		</div>
	</div>
);
