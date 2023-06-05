import { ToastContainer } from 'react-toastify';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';
import { UserContextProvider } from './context/UserContext';
import { SocketContextProvider } from './context/SocketContext';
import { MessagesContextProvider } from './context/MessagesContext';
import { ChatPersonContextProvider } from './context/ChatPersonContext';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
	<UserContextProvider>
		<ChatPersonContextProvider>
			<MessagesContextProvider>
				<SocketContextProvider>
					<BrowserRouter>
						<ToastContainer />
						<App />
					</BrowserRouter>
				</SocketContextProvider>
			</MessagesContextProvider>
		</ChatPersonContextProvider>
	</UserContextProvider>
);
