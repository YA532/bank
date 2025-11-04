# Deploying to Render — quick guide

This repository contains a frontend (Vite/React) and a backend (Express/MongoDB).
Recommended setup on Render: deploy the frontend as a Static Site and the backend as a Web Service.

Frontend (Static Site)
- Root Directory: frontend
- Build Command: npm ci && npm run build
- Publish Directory: dist
- Environment variables (Render Dashboard → Environment):
  - VITE_API_URL = https://<your-backend-service>.onrender.com

Note about VITE_API_URL
- The frontend will read `VITE_API_URL` and automatically append `/api` when making requests.
  So set `VITE_API_URL` to your backend base URL (for example `https://my-backend.onrender.com`) — do not include `/api` at the end. The client will call `https://my-backend.onrender.com/api/...`.

Notes:
- Vite exposes client env variables via `import.meta.env.VITE_*`. Set `VITE_API_URL` on Render so the built client can call your deployed backend.
- Ensure `frontend/public/vite.svg` exists to avoid a 404 for that asset.

Backend (Web Service)
- Root Directory: backend
- Build Command: npm install
- Start Command: npm start
- Environment variables (Render Dashboard → Environment):
  - MONGO_URI = <your_production_mongo_uri>
  - JWT_SECRET = <your_jwt_secret>
  - CLIENT_ORIGIN = https://<your-frontend-service>.onrender.com
  - PORT is provided automatically by Render

Notes:
- Your server listens on `process.env.PORT || 5000` so it works on Render without changes.
- Set `CLIENT_ORIGIN` to your frontend URL so CORS is configured correctly.

Common Render pitfalls
- If you set the service Root Directory to the repo root, make the Build Command: `cd frontend && npm ci && npm run build` and set Publish Directory to `frontend/dist`.
- Use `npm ci` for clean installs in CI.
- If build fails with "Publish directory dist does not exist", confirm the build command ran and that `dist` exists under the chosen root.

Local verification
```powershell
cd frontend
npm ci
npm run build
# frontend/dist should be created

cd ../backend
npm ci
npm start
# server should run on the configured PORT
```
