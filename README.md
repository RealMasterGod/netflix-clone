# Netflix Clone
1. Demo Client Side link: https://netflix-clone-client-git-main-realmastergods-projects.vercel.app/
2. Demo Admin Side link: https://netflix-clone-admin-git-main-realmastergods-projects.vercel.app/

# Table of Content

1. About The App
2. Technologies
3. Prerequisites
4. Setup
5. Status

# 1. About The App
This is just a netflix clone. The UI is similar to that of netflix site. You can register and login and after that you can see all the movies/series on home page.
They appear as list just as in netflix site and when you hover over a movie , it will expand  to show more details about it as well as show a trailer video.
Click on the movie to watch the movie. Additionally there are two sections movies and series where lists that contains only movies or series will appear respectively.
This is also an option to filter the lists by genre.
This is also an admin site associated with this where admin can login to add update delete movies and lists and also see graph of no of users joined/month.

# 2. Technologies
I have used ReactJs, Vite to create the frontend and it uses Context API. It uses 
jwt authentication for login.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### To create your own react + vite app run this command:
```bash
npm create vite@latest --your-app-name -- --template react
```
Or you may refer to https://vitejs.dev/guide/   for more details.

## Material UI Icons
Material UI icons are easy to use and provides a ton of choices for each icon. Chances are if you are looking for 
an icon, they have it.

Refer to the offical site to get started with material ui : https://mui.com/material-ui/getting-started/

## JWT
JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. These may be used for authorisation of users making your apps more seacure.
Add it in your project:
```bash
npm i jsonwebtoken
```
Please refer to https://jwt.io/introduction for detailed information about jwt and why and how to use them. 

# 3. Prerequisites
## Install Node Package Manager
Refer to https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

# 4. Setup
- Clone the repository or download as zip.
- Go to the cloned folder on your local machine.
- Open terminal in api folder and also create a .env file where you have to create a variable MONGODB_URI and assign your mongodb database to this.
- Also create another varibale JWT_SEC and again assign any value you like, this will be your jwt secret. 
- Open terminal in api folder and run the following commands in order.
  ```bash
  npm install
  ```
  ```bash
  npm start
  ```
- Similarly open terminal in client folder and also create a .env file where you have to create a variable REACT_APP_BASE_URL and assign the url your api is running on.
- Now in client folder just run:
  ```bash
  npm install && npm run dev
  ```
- Now just click/copy the link that would appear in the console and paste on your browser and hit enter. That's it you can now see the project on your local machine.

# 5. Status
The project is incomplete. In admin site I am yet to create a fetch users page where admins can take actions like updating a user account or deleting it etc.
Also i would like to add a profile/settings page on client side where users can update their own account.
