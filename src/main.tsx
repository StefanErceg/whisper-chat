import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { connect } from './api/socket';
import { App } from './App';
import { MessagesContextProvider } from './context/MessagesContext';
import { UserContextProvider } from './context/UserContext';

import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!);

//connect to socket server for receiving messages
connect();

root.render(
	<UserContextProvider>
		<MessagesContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</MessagesContextProvider>
	</UserContextProvider>
);
