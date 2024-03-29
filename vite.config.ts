import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import basicSsl from '@vitejs/plugin-basic-ssl';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
   server: {
      port: 3000,
      https: {
         key: fs.readFileSync('cert/key.pem'),
         cert: fs.readFileSync('cert/cert.pem'),
      },
   },
   plugins: [react()],
});
