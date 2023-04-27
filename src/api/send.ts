import axios from 'axios';
import { Message } from '../types/message';

const LINK = import.meta.env.VITE_SEND_LINK;
const VERSION = import.meta.env.VITE_VERSION;

const http = axios.create({
	baseURL: `${LINK}/api/${VERSION}`,
});

const sendMessage = (message: Message) => http.post('/message', message);

export { sendMessage };
