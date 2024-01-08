# ShauKing - Ecommerce Website Application

ShauKing is an ecommerce website application developed using the MERN stack, Redux, and other essential tools and services. This project is inspired by '6 Pack Programmer' on YouTube.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/irishabhmaloo/ecommercewebsite.git
   ```

Install dependencies:

## In the root folder
npm install

## In the frontend folder
cd frontend  
npm install

## Environment Variables

### Backend

In the `backend/config` directory, create a `config.env` file and add the following variables:

```config.env
# Backend Environment Variables
PORT=
DB_USER=
DB_PASSWORD=
CONN_STR=
LOCAL_CONN_STR=
FRONTEND_URL=
JWT_SECRET=
JWT_EXPIRE=
COOKIE_EXPIRE=
ORIGIN_URL=
WEBSITE_NAME=
SMPT_SERVICE=
SMPT_MAIL=
SMPT_PASSWORD=
SMPT_HOST=
SMPT_PORT=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
STRIPE_API_KEY=
STRIPE_SECRET_KEY=
```

### Frontend
In the `frontend` folder, create a `.env` file and add the following variables:

```env
# Frontend Environment Variables
REACT_APP_BACKEND_URL=
```

## Usage
To run both the backend and frontend, use the following command in their respective folders:

```bash
npm start
```

Access the application in your web browser at http://localhost:3000.

## Features
- **User Authentication:** Secure user authentication for a personalized experience.
- **Product Browsing:** Browse a wide range of products with ease.
- **Secure Payments:** Ensure secure transactions with integrated payment methods (using API provided by Stripe).
- **Order Management:** Easily manage and track your orders.

## Acknowledgment
This project is inspired by '6 Pack Programmer' on YouTube. It was created with the sole purpose of understanding the tech stack used and how these technologies coordinate with each other.


## Contact
For any inquiries or feedback, please feel free to reach out via email at therishabhrox@gmail.com.
