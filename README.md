# My Kiosk Management Application

This repository consists of a backend API and a frontend React application to manage kiosks.

![Kiosk](https://github.com/gabrielrossetto/kiosk/blob/master/assets/kiosk.gif)

## Prerequisites

- Node.js (v14+ recommended)
- npm or Yarn

## Running the Backend API

1. **Navigate to the backend directory**:

    ```bash
    cd packages/backend
    ```

2. **Install dependencies**:

    With npm:

    ```bash
    npm install
    ```

    Or with Yarn:

    ```bash
    yarn
    ```

3. **Start the server**:

    ```bash
    npm start
    ```

    Or if you're using Yarn:

    ```bash
    yarn start
    ```

    The API should now be running on `http://localhost:3001` or another specified port.

## Running the Frontend Application

1. **Navigate to the frontend directory**:

    ```bash
    cd packages/frontend
    ```

2. **Install dependencies**:

    With npm:

    ```bash
    npm install
    ```

    Or with Yarn:

    ```bash
    yarn
    ```

3. **Start the React application**:

    ```bash
    npm start
    ```

    Or if you're using Yarn:

    ```bash
    yarn start
    ```

    The application should now be accessible on `http://localhost:3000` or another specified port.

## Troubleshooting

- Ensure that both the backend and frontend applications are not trying to use the same port. By default, they should run on different ports (e.g., `3001` for the backend and `3000` for the frontend).
- If there are issues with dependencies, try deleting the `node_modules` directory and 