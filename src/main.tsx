import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { connect } from './api/socket';
import { MessagesContextProvider } from './context/MessagesContext';

import './index.css';
import { AppRouter } from './router';

const container = document.getElementById('root');
const root = createRoot(container!);

//connect to socket server for receiving messages
connect();

root.render(
	<MessagesContextProvider>
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	</MessagesContextProvider>
);
