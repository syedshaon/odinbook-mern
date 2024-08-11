### Back-End focused MERN app, done for the fulfillment of the Odin Project Full Stack JavaScript Course

- https://www.theodinproject.com/lessons/nodejs-messaging-app
- https://www.theodinproject.com/lessons/nodejs-odin-book

[Front-End Repository](https://github.com/syedshaon/OdinBookFront)

[Back-End Repository](https://github.com/syedshaon/OdinBookApi)

#### Back-end Tools

- Express
- MongoDB
- Node
- Passport JWT, Google Oauth
- Imagekit.io to store images
- socket.io for instant messaging
- faker-js for seeding database

#### Front-end Tools

- React
- Vite
- Tailwind css
- Redux Toolkit

![Sign Up Flow](https://ik.imagekit.io/odinbook/odinbook/signup.jpg?updatedAt=1708195419227 "Sign Up Flow")

---

![Signin Flow](https://ik.imagekit.io/odinbook/odinbook/signin.jpg?updatedAt=1708195419039 "Signin Flow")

---

![OdinBook Features](https://ik.imagekit.io/odinbook/odinbook/odinbook.jpg?updatedAt=1708195419091 "OdinBook Features")

---

![Messenger](https://ik.imagekit.io/odinbook/odinbook/messenger.jpg?updatedAt=1708195419075 "Messenger")


# How to Run?

Add environment variables and run "npm run start"

## Backend:

### For production

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

### For development

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

## Fontend:

src/pages/ImageKit/Authenticator.js

Comment out line 5 and enable line 6 to run on local dev

comment out line 6 and enable line 5 to run on production

run "npm run dev"

