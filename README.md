# Blog App (Frontend)

This repo contains the frontend part of the application.

- Frontend: React, Redux
- Backend: Django [<img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/link.svg" width="20" height="20">](https://github.com/nahid111/dj-blog)

## Getting Started Locally

1. clone the repo & cd into it.
2. install dependencies:
   <br/><nbsp/>`npm i`
3. Set backend proxy in vite.config.js:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "<YOUR_API_SERVER_URL_HERE>",
        changeOrigin: true
      }
    }
  }
});
```

4. run it:
   <br/><nbsp/>`npm run dev`
