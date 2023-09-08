import axios from 'axios';

const LOGO_LINK = import.meta.env.VITE_LOGO_LINK;
const VERSION = import.meta.env.VITE_VERSION;

const http = axios.create({
   baseURL: `${LOGO_LINK}/api/${VERSION}`,
});

const upload = (encoded: string) => http.post('/logo', { encoded }).then(({ data }) => data);

export { upload };
