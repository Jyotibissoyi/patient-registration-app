🩺 Patient Registration App
A frontend-only patient registration application built with React 19, MUI, and Pglite (SQLite for the browser). This app allows you to register patients, store their data using an in-browser SQL database, and perform SQL queries directly from the client side.

🚀 Features
Register new patients

Store and retrieve data using SQLite (via @electric-sql/pglite)

Client-side SQL query support using sql.js

Material UI components for responsive design

Live preview using Vite development server

🧱 Tech Stack
React 19

Vite

MUI (Material-UI)

SQLite in-browser via @electric-sql/pglite and sql.js

TypeScript

ESLint for linting

📦 Dependencies
Main:
json
Copy
Edit
"@electric-sql/pglite": "^0.3.2",
"@emotion/styled": "^11.14.0",
"@mui/icons-material": "^7.1.0",
"@mui/styled-engine": "^7.1.0",
"react": "^19.1.0",
"react-dom": "^19.1.0",
"sql.js": "^1.13.0"
Dev:
json
Copy
Edit
"@vitejs/plugin-react": "^4.4.1",
"vite": "^6.3.5",
"typescript": "~5.8.3",
"eslint": "^9.25.0",
"@eslint/js": "^9.25.0",
"typescript-eslint": "^8.30.1",
"@types/react": "^19.1.2",
"@types/react-dom": "^19.1.2",
"@types/sql.js": "^1.4.9",
"eslint-plugin-react-hooks": "^5.2.0",
"eslint-plugin-react-refresh": "^0.4.19",
"globals": "^16.0.0"
🛠️ Getting Started
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/Jyotibissoyi/patient-registration-app.git
cd patient-registration-app
2. Install Dependencies
bash
Copy
Edit
npm install
3. Start Development Server
bash
Copy
Edit
npm run dev
The app will be available at: http://localhost:5173

🧪 Linting
To run ESLint:

bash
Copy
Edit
npx eslint src --ext .ts,.tsx
