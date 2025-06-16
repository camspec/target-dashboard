# IntelGrid
IntelGrid is a full-stack web application allowing users to create and manage personalized target lists and track real-time status updates.

The app integrates with TORN's external game API securely; authenticate using a Limited Access API key.

## Features
- User login via personal API key
- Persistent, user-specific target lists
- Backend with PostgreSQL and RESTful Express API
- Modern frontend built with React and HTML/CSS
## Upcoming
- Real-time countdown timers for player states (e.g. hospital time)
- Live data fetching from external API
- Secure handling of keys and data

## Setup
Ensure you have the following installed:
- Node.js
- PostgreSQL
- Git

Clone the repository:
```bash
git clone https://github.com/camspec/target-dashboard.git
cd target-dashboard
```

### Backend Setup
Install dependencies:
```bash
cd backend
npm install
```

Create a `.env file` in the `backend` directory containing your secrets:
```
PGHOST=localhost
PGUSER=YOUR_USERNAME
PGPASSWORD=YOUR_PASSWORD
PGDATABASE=YOUR_DATABASE
PGPORT=5432
```

Create PostgreSQL database using the schema:
```bash
createdb YOUR_DATABASE
psql -U YOUR_USERNAME -d YOUR_DATABASE -f db/schema.sql
```

Run the backend server in the `backend` directory:
```bash
npm run dev
```

### Frontend Setup
In a new terminal window, install dependencies and run the frontend server:
```bash
cd frontend
npm install
npm run dev
```

Both the backend and frontend servers should be accessible via localhost at the specified ports; check the terminal output after starting the frontend server.

## License
This project is licensed under the [MIT License](./LICENSE).
