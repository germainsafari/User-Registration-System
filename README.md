# User Registration System
<img width="305" alt="Screenshot 2025-06-18 124439" src="https://github.com/user-attachments/assets/2ca2765c-de9c-40d5-b44b-925a7240f549" />
A full-stack user registration web application featuring a React frontend, a Flask API backend, and a PostgreSQL database.

## Project Structure

```
user-registration-system/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── routes.py
│   │   └── utils.py
│   ├── Dockerfile
│   ├── requirements.txt
│   └── .env (manual creation for local only)
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       ├── api.js
│       ├── index.js
│       └── components/
│           ├── RegistrationForm.js
│           └── UsersList.js
├── docker-compose.yml
└── README.md
```

## Key Features

*   **Input Validation:** Robust backend and frontend validation for user data.
*   **Password Hashing:** Secure password storage using `werkzeug.security`.
*   **Error Handling:** Graceful error display to the user.
*   **Unique Email Enforcement:** Prevents duplicate user registrations.
*   **Persistent PostgreSQL Database:** Uses an external Neon PostgreSQL database for data storage.
*   **CORS Enabled:** Allows cross-origin requests between frontend and backend.
*   **Containerized Deployment:** Easily deployable using Docker Compose.

## Database Setup (Neon PostgreSQL)

This project uses an external Neon PostgreSQL database. Before running the application, you must ensure your database is set up correctly.

**Database Connection String:**
`postgresql://postgresdb_owner:npg_JDWb4CQr5AmI@ep-calm-rain-abhkzzsf-pooler.eu-west-2.aws.neon.tech/postgresdb?sslmode=require`

**CRITICAL: Update Database Schema (if running for the first time or after schema changes)**

If this is the first time you are setting up the database for this project, or if you've made changes to the `User` model (like increasing the password length), you *must* ensure the `users` table schema is correct. Flask-SQLAlchemy's `db.create_all()` will only create tables if they don't exist; it will NOT modify existing tables.

To ensure the `password` column is large enough to store hashed passwords (`VARCHAR(256)`), you need to:

1.  **Connect to your Neon PostgreSQL database** using a `psql` client or another database management tool.
    (e.g., `psql "postgresql://postgresdb_owner:npg_JDWb4CQr5AmI@ep-calm-rain-abhkzzsf-pooler.eu-west-2.aws.neon.tech/postgresdb?sslmode=require"`)

2.  **Execute the following SQL command to drop the existing `users` table.** This will allow the Flask backend to recreate it with the correct schema on startup.
    ```sql
    DROP TABLE IF EXISTS users CASCADE;
    ```
    (You should see `DROP TABLE` as confirmation. If you see `NOTICE: table "users" does not exist, skipping`, it means it's already gone, which is fine.)

3.  Exit your database client (`\q` in `psql`).

## How to Run the Project

You have two main options to run this project: using Docker Compose (recommended for full-stack deployment) or running backend and frontend locally.

---

### Option 1: Running with Docker Compose (Recommended)

This method containerizes both the backend and frontend, making it easy to set up and run.

1.  **Ensure Docker Desktop is Installed and Running:** Download from [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/). Make sure it's running before proceeding.

2.  **Navigate to the project root directory** in your terminal:
    ```bash
    cd "C:\Users\germain.safari\Desktop\School\Computer Systems final project\User Registration System"
    ```

3.  **Build and Run the Docker Containers:**
    ```bash
    docker-compose up --build
    ```
    This command will:
    *   Build the Docker images for both `backend` and `frontend` services.
    *   Start the containers.
    *   The Flask backend will connect to your Neon PostgreSQL database and, if the `users` table doesn't exist (because you dropped it in the setup step), it will create it with the correct schema.

4.  **Access the Application:**
    Open your web browser and navigate to: [http://localhost:3000](http://localhost:3000)

    The backend API will be accessible internally within the Docker network at `http://backend:5000/api` and externally at `http://localhost:5000/api`.

---

### Option 2: Running Locally (Backend and Frontend Separately)

This method is useful if you prefer to run services directly on your machine without Docker.

#### **2.1. Running the Backend (Flask)**

1.  **Open a brand new terminal window.**

2.  **Navigate to the `backend` directory:**
    ```bash
    cd "C:\Users\germain.safari\Desktop\School\Computer Systems final project\User Registration System\backend"
    ```

3.  **Create and activate a Python virtual environment:**
    ```bash
    python -m venv venv
    .\venv\Scripts\activate
    ```
    (Your prompt should change to `(venv) ...`)

4.  **Install Python dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

5.  **Manually create a `.env` file in the `backend` directory.**
    Open a text editor, create a file named `.env` in the `backend` folder, and add the following line:
    ```
    DATABASE_URL=postgresql://postgresdb_owner:npg_JDWb4CQr5AmI@ep-calm-rain-abhkzzsf-pooler.eu-west-2.aws.neon.tech/postgresdb?sslmode=require
    ```
    Save and close the file.

6.  **Set the `FLASK_APP` environment variable:**
    ```bash
    $env:FLASK_APP = "app"
    ```

7.  **Run the Flask application:**
    ```bash
    flask run
    ```
    Keep this terminal window open. The Flask backend will be running on `http://localhost:5000`.

#### **2.2. Running the Frontend (React)**

1.  **Open a *separate*, brand new terminal window.**

2.  **Navigate to the `frontend` directory:**
    ```bash
    cd "C:\Users\germain.safari\Desktop\School\Computer Systems final project\User Registration System\frontend"
    ```

3.  **Install Node.js dependencies (if not already installed):**
    ```bash
    npm install
    ```

4.  **Start the React development server:**
    ```bash
    npm start
    ```
    This will usually open `http://localhost:3000` in your web browser. Keep this terminal window open.

## API Endpoints

*   `POST /api/register` — Register a new user
*   `GET /api/users` — List all registered users

## (Optional) Next Steps

*   Add email verification, JWT login, or more user fields.
*   Write Cypress or Postman integration tests.
*   Deploy on a cloud platform for a production environment. 
