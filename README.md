# OdinBook

This project is done for the fulfillment of the Odin Project Full Stack JavaScript Course.

- [Messaging App](https://www.theodinproject.com/lessons/nodejs-messaging-app)
- [Odin Book](https://www.theodinproject.com/lessons/nodejs-odin-book)

[Front-End Repository](https://github.com/syedshaon/OdinBookFront)

[Back-End Repository](https://github.com/syedshaon/OdinBookApi)

## Table of Contents

- [Features](#features)
- [Back-end Tools](#back-end-tools)
- [Front-end Tools](#front-end-tools)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
  - [Backend](#backend)
    - [For Production](#for-production)
    - [For Development](#for-development)
  - [Frontend](#frontend)

### Check API Documentation from [this Link.](https://documenter.getpostman.com/view/32081062/2sAXjQ3qZu)

## Features

This application offers the following features:

1. **Messaging App**: Users can engage in real-time messaging using the socket.io library.
2. **User Authentication**: The application supports user authentication using Passport JWT and Google OAuth. Users receive an email to verify their account when they sign up with an email. They can only receive a reset password email if they have already verified their account. Additionally, users can reset their password by clicking on the "forgot password" link. The application also includes a refresh token mechanism that automatically refreshes the user's JWT token after a specific interval.
3. **Social Media-like Features**: Users can follow and make friends. They can create posts similar to Facebook, and other users can see these posts on the homepage after logging in. Users can also upload images along with their messages and posts.
4. **Image Storage**: The application utilizes Imagekit.io to store messenger and post images. Multer is used to store profile pictures and cover images.
5. **Database Seeding**: The application uses the faker-js library to seed the database with dummy data.
6. **Front-end Framework**: The application is built using React and utilizes Redux Toolkit for state management.
7. **Responsive Design**: The front-end is designed to be responsive and compatible with different screen sizes.
8. **Deployment**: The application can be easily deployed to hosting services like Heroku, Netlify, or Vercel by following the provided deployment instructions.

### Detailed Features

#### Signup

- **Signup with Google**:

  - An user profile with `username`, `firstname`, `lastname`, `isActive = true` is created.
  - User is sent to the front-end with a Secret JWT token as `auth_cookie` cookie.
  - Front-end retrieves JWT token which will be used for any future request. Also gets a Refresh token.
  - JWT token is saved in Redux state. User remains logged in.

- **Signup providing Details**:
  - An user profile with `username`, `firstname`, `lastname`, `isActive = false` is created.
  - An activation email is sent.
  - User clicks on the activation link, which results in `isActive = true`, and is redirected to the login page.
  - User can sign in now by providing email and password.

#### Signin

- **Continue with Google**:

  - An user profile with `username`, `firstname`, `lastname`, `isActive = true` is created.
  - User is sent to the front-end with a Secret JWT token as `auth_cookie` cookie.
  - Front-end retrieves JWT token which will be used for any future request. Also gets a Refresh token.
  - JWT token is saved in Redux state. User remains logged in.

- **With Email & Password**:
  - Check if user profile with user's email exists.
  - If yes, check if email & password matches.
  - If matches, front-end receives JWT token which will be used for any future request. Also gets a Refresh token.
  - JWT token is saved in Redux state. User remains logged in.
  - If user is not active, user gets a button to receive activation email again.
  - If email & password do not match, user gets a button to reset password.
  - User inserts email and receives a link to reset password.
  - After clicking on the link, user sets a new password.

#### Messenger Page

- Used socket.io to exchange instant messages.
- User's JWT token is used when they first connect.
- Thus, the user must remain authenticated to connect to Messenger.
- User sees all registered users of this platform in the contact area.
- Users who are online are marked with a green dot.
- Can send instant text & image messages to any user.
- Messages are saved in the database so users offline will get them later.
- Can create groups and send messages within the group.
- Can send image OR text message one at a time.
- Images are saved in imagekit.io.
- Images up to 5MB in size can be uploaded (limit set by me).
- When an image gets uploaded, the send button and textarea are disabled.

#### Settings Page

- User can set a new password.
- Password of guest users can't be changed.

#### Home Page

- User sees posts from people they follow.
- Also finds their own posts.
- Can create new posts.
- Can like and comment on posts.
- Can see comments on posts.

#### Own Profile Page

- User sees their own posts.
- Can create new posts.
- Can like and comment on posts.
- Can see comments on posts.

#### Other Profile Page

- User can see this person's posts.
- Can follow and send friend requests.
- Can accept/reject friend requests from this person.
- Can like and comment on posts.
- Can see comments on posts.

#### People Page

- User can accept/reject received friend requests.
- Finds a list of their friends and people they follow.
- Finds a list of people they sent friend requests to and can cancel those requests.
- Can follow new people or send friend requests.

## Back-end Tools

- Express
- MongoDB
- Node
- Passport JWT, Google OAuth
- Imagekit.io to store messenger and post images
- Multer to store profile pictures and cover images
- socket.io for instant messaging
- faker-js for seeding the database

## Front-end Tools

- React
- Vite
- Tailwind CSS
- Redux Toolkit

## Screenshots

![Sign Up Flow](https://ik.imagekit.io/odinbook/odinbook/signup.jpg?updatedAt=1708195419227 "Sign Up Flow")

---

![Signin Flow](https://ik.imagekit.io/odinbook/odinbook/signin.jpg?updatedAt=1708195419039 "Signin Flow")

---

![OdinBook Features](https://ik.imagekit.io/odinbook/odinbook/odinbook.jpg?updatedAt=1708195419091 "OdinBook Features")

---

![Messenger](https://ik.imagekit.io/odinbook/odinbook/messenger.jpg?updatedAt=1708195419075 "Messenger")

## Screenshots

![Sign Up Flow](https://ik.imagekit.io/odinbook/odinbook/signup.jpg?updatedAt=1708195419227 "Sign Up Flow")

---

![Signin Flow](https://ik.imagekit.io/odinbook/odinbook/signin.jpg?updatedAt=1708195419039 "Signin Flow")

---

![OdinBook Features](https://ik.imagekit.io/odinbook/odinbook/odinbook.jpg?updatedAt=1708195419091 "OdinBook Features")

---

![Messenger](https://ik.imagekit.io/odinbook/odinbook/messenger.jpg?updatedAt=1708195419075 "Messenger")

## Deployment

To deploy the application, follow these steps:

- Set up a hosting service or platform of your choice (e.g., Heroku, Netlify, Vercel).
- Configure the necessary environment variables for your deployment environment.
- Build the frontend application using the appropriate build command (e.g., npm run build).
- Deploy the backend application to your hosting service.
- Deploy the frontend application to your hosting service.
- Ensure that the necessary environment variables are properly set in your deployment environment.
- Start the application on your hosting service.
- That's it! Your application should now be successfully deployed and accessible to users.

### Backend

#### For Production

Set the following environment variables:

```
plaintext
FACEBOOK_APP_ID=""
FACEBOOK_CALLBACK_URL=""
FACEBOOK_SECRET=""
FRONT1="https://odinboook.vercel.app"
FRONT2="https://odinboook.vercel.app/"
GOOGLE_CALLBACK_URL=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
JWT_CONFIRMATION="5705c07c6c9a5c58271d6dd557b47dd448e3f5c96d243b6aa2a"
JWT_REFRESH="5705c07c061d09bc6a522c58271d6dd557b47dd448e3f5c96d243b6aa2a"
JWT_RESET_PASSWORD="5705c07c6c9a538b42061d09bc6a522c58271d6dd557b470e9dde85847a2c24bbd75a2a"
JWT_SECRET="4c728096411f3130e94046b0b325a4e1d46428aa7ff2fcf95431af4553ea9eed24f28f"
SALT="10"
SESSION_SECRET="Ssdsd@"
gmailId=""
gmailPass=""
imagekit_Private_Key="private"
imagekit_publicKey="public_D"
imagekit_urlEndpoint=""
mongoCon="mongodb+sr"
```

### Run the application:

`npm run start`

#### For Development

Set the following environment variables:

```
FRONT1="http://localhost:5173"
FRONT2="http://localhost:5174"
FACEBOOK_APP_ID=""
FACEBOOK_CALLBACK_URL="http://loca"
FACEBOOK_SECRET="63ee02a"
GOOGLE_CALLBACK_URL="http://localhos"
GOOGLE_CLIENT_ID="21070"
GOOGLE_CLIENT_SECRET="GOC"
JWT_CONFIRMATION="5705c07c6c9a5c6437b22342310e05c6cd6fb352b9ddd475370cd3"
JWT_REFRESH="5705c07c6c9a5c6437b2455a4961da10e05c6cd6fb352b9ddd4753"
JWT_RESET_PASSWORD="5705c07c6c9a5c64b22342310e05c6cd6fb352b9ddd"
JWT_SECRET="4c728096411f3130e983027880437e85847a2c"
SALT="10"
SESSION_SECRET="Ssd"
gmailId=""
gmailPass=""
imagekit_Private_Key="pri"
imagekit_publicKey="publ"
imagekit_urlEndpoint="h"
mongoCon="mongod"
```

### Run the application:

`npm run start`

### Frontend

In src/pages/ImageKit/Authenticator.js, comment out line 5 and enable line 6 to run on local development. Comment out line 6 and enable line 5 to run in production.

Run the application:

`npm run dev`
