import { useUser } from '../context/UserContext';
import { Person } from '../components/select/Person';
import { useChatPerson } from '../context/ChatPersonContext';

export const Select = () => {
	const { user } = useUser();
	const { connectedUsers } = useChatPerson();

	const filteredUsers = connectedUsers.filter(({ id }) => id !== user?.id);
	return (
		<div className="flex h-screen bg-slate-100 justify-center items-center">
			<div className="flex flex-col items-center justify-center w-[400px] h-2/3 border border-blue-300 rounded-xl p-10">
				<span className="font-medium text-lg text-primary">Select person to chat</span>

				<div className="w-full h-full p-10">
					{filteredUsers.map((user) => (
						<Person key={user.id} {...user} />
					))}
				</div>
			</div>
		</div>
	);
};
