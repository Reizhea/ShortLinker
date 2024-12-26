# ShortLinker - Simplified URL Shortening

ShortLinker is an intuitive and efficient platform for shortening URLs, offering users a streamlined way to manage and share their links. With a minimalistic design and customizable options, it simplifies the process of creating, sharing, and managing short URLs.

## Key Features

### User Features
- **Customizable Short Links**: Users can create short URLs with custom codes.
- **QR Code Generation**: Generate downloadable QR codes for short URLs.
- **Dark Mode**: Switch between light and dark themes for a personalized experience.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **404 Error Handling**: Displays a user-friendly 404 page when a short URL is invalid.

### Backend Features
- **URL Validation**: Ensures that only valid URLs are shortened.
- **Custom Code Availability Check**: Prevents duplication of custom short codes.
- **Database-Driven Analytics**: Supports future integration for tracking clicks and analytics.

---

## Technologies Used

### Frontend
- **Framework**: React.js
- **Styling**: TailwindCSS
- **Deployment**: Netlify

### Backend
- **Framework**: Express.js (Node.js)
- **Database**: MongoDB (MongoDB Atlas)
- **Deployment**: Render

---

## Demo Previews

### User Interface
#### Light Mode
![Light Mode Preview](assets/images/light-mode.jpg)

#### Dark Mode
![Dark Mode Preview](assets/images/dark-mode.jpg)

#### URL Shortening
![URL Shortening Workflow](assets/images/url-shortened.jpg)

#### QR Code Modal
![QR Code Modal](assets/images/qr-code.jpg)

#### 404 Page
![404 Page](assets/images/404-page.jpg)

---

## Installation Instructions

### Prerequisites
- Node.js
- MongoDB
- Git

### Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/ShortLinker.git
   
2. **Navigate to the project directory**:
   ```bash
   cd ShortLinker
   
3. **Backend Setup**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `backend` folder and add the following variables:
     ```plaintext
     MONGO_URI=<your-mongo-db-connection-string>
     PORT=5000
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

4. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `frontend` folder and add the following variable:
     ```plaintext
     REACT_APP_BACKEND_URL=<your-backend-deployment-url>
     ```
   - Start the development server:
     ```bash
     npm start
     ```

5. **Build for Production**:
   - Build the frontend:
     ```bash
     npm run build
     ```

6. **Deploy the Application**:
   - **Frontend**:
     - Deploy the `build/` folder to Netlify, Vercel, or any static hosting provider.
   - **Backend**:
     - Deploy the backend to Render, Heroku, or any server hosting platform. Ensure the `REACT_APP_BACKEND_URL` in the frontend `.env` file points to the deployed backend.
    
## Testing

1. **Unit Testing**:
   - Verified individual components such as URL validation, custom code generation, and dark mode toggle.
   - Ensured accurate functionality of backend API routes (`/shorten`, `/:shortCode`).

2. **Functional Testing**:
   - Tested the full workflow of URL shortening and redirection.
   - Verified error handling for invalid URLs, duplicate custom codes, and non-existent short URLs.

3. **Integration Testing**:
   - Confirmed seamless communication between the frontend and backend using API calls.
   - Ensured proper rendering of modals, QR code generation, and error messages.

4. **Cross-Browser Testing**:
   - Ensured compatibility across popular browsers such as Chrome, Firefox, and Edge.

5. **Responsive Testing**:
   - Verified the application's responsiveness on different screen sizes and devices.

6. **Dark Mode Testing**:
   - Tested light/dark mode functionality for persistence across sessions using localStorage.

---

## Authors
- **Nawang Dorjee**
