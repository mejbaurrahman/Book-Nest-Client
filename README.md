# Book Nest

**Book Nest** is a full-featured e-commerce web application for book enthusiasts, allowing users to browse products, explore categories, view details, and make purchases. Built using **React**, **Tailwind CSS**, **Firebase Authentication**, **Express.js**, and **MongoDB**, this website provides both user and admin functionalities in an intuitive, visually appealing design.

## admin: admin@admin.com password: 123456
## Features

### Frontend Features

1. **Homepage**:

   - **Navbar**: Contains the Book Nest logo and navigation links to All Products and Login/Register.
   - **Banner**: A prominent section with an engaging banner image/text.
   - **Product Categories**: Displays categories fetched from the backend, with "View Products" buttons.
   - **Product Highlights**: Emphasizes best sellers or featured products with images and descriptions.
   - **User Reviews/FAQs**: Contains customer reviews or answers to frequently asked questions.
   - **Footer**: Lists contact information and links to social media.

2. **All Products Page**:

   - Displays all products as cards with images, names, prices, ratings, and “View Details” buttons.

3. **Product Details Page** (Private Route):

   - Shows detailed information about a selected product with a “Buy Now” button.
   - Clicking “Buy Now” opens a modal prefilled with the user’s details for purchase.

4. **Authentication**:

   - **Login Page**: Allows users to log in using Firebase Auth.
   - **Register Page**: New users register with email, password, and profile details.
   - **Post Login Navbar**: Navbar updates to show a dashboard link and removes the Login/Register options.

5. **User and Admin Dashboards**:

   - **User Dashboard**: Displays purchase history and allows profile editing.
   - **Admin Dashboard**: Features for managing users, categories, and products.

6. **Profile Editing**:

   - Users can edit their profile picture, name, phone, and address.

7. **Additional UI Features**:
   - **Theme Toggle**: Switch between light and dark mode.
   - **Responsive Design**: Mobile- and tablet-friendly layout.
   - **Consistent Icons**: Managed through `react-icons`.
   - **Page Metadata**: Managed using `react-helmet`.

### Backend Features

1. **User Authentication**:

   - Manages login and registration through Firebase and MongoDB.

2. **Product & Category Management**:
   - Provides API endpoints for retrieving, adding, editing, and deleting categories and products.

## Technologies Used

- **Frontend**: React, Tailwind CSS, DaisyUI, React Icons, React Helmet
- **Authentication**: Firebase Auth
- **Backend**: Node.js, Express.js, MongoDB
- **Additional**: Axios, react-hot-toast
