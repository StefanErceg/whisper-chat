import { DashboardItem } from '../components/dashboard/DashboardItem';
import { Logout } from '../components/dashboard/Logout';
import { AboutIcon } from '../components/icons/About';
import { AddFriendIcon } from '../components/icons/AddFriend';
import { StartChatIcon } from '../components/icons/StartChat';

export const Dashboard = () => (
	<div className="flex h-screen p-6">
		<div className="bg-slate-100 flex flex-col w-full h-full items-center justify-start space-y-10 rounded-xl">
			<img className="w-60 h-60" src="src/assets/logo_transparent.png" />
			<div className="flex space-x-10">
				<DashboardItem to="/chat" label="Start a new chat" icon={<StartChatIcon />} />
				<DashboardItem to="/" label="Add a friend" icon={<AddFriendIcon />} />
				<DashboardItem to="/" label="About WhisperChat" icon={<AboutIcon />} />
			</div>

			<Logout />
		</div>
	</div>
);
