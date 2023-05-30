# SEP4-VIA-2023/**front-end**

## Semester Project - Frontend Department

---

This is the frontend part of our semester project.

Our project goal is to make a general sensor measuring device, capable of getting measurements for humidity, temperature and co2, it also has a servo motor for doing an event based on the user requirement.

The project is made with React.js, it uses JSX files and SCSS modules, we have used Material UI for the UI components and styling, we have also used Recharts for the graphs and charts.

The project is havily using jest for testing and we have used axios library for handling complex logic and compatibility with the the API calls.

# Dependencies:

We have deployed the project live and it can be previewed [here](https://sep4-via-2023.github.io/front-end/) on Github pages.

## Setting up the Project

To run this project on your local machine, you need the following prerequisites:

- Node.js LTS(v16.14.0)
- npm (comes with Node.js installation), LTS version (8.3.1)

This project is based on the following dependencies:

```
"dependencies": {
    "@emotion/react": "^11.10.6",
    "@emotion/styled": "^11.10.6",
    "@heroicons/react": "^1.0.6",
    "@material-ui/core": "^4.12.4",
    "@mui/icons-material": "^5.11.16",
    "@mui/material": "^5.12.1",
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "axios": "^1.4.0",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-resize-observer": "^1.1.1",
    "react-router-dom": "^6.10.0",
    "react-scripts": "5.0.1",
    "recharts": "^2.5.0",
    "sass": "^1.62.0",
    "typescript": "^4.7.4",
    "web-vitals": "^2.1.4"
  },"dependencies": {
    "@emotion/react": "^11.10.6",
    "@emotion/styled": "^11.10.6",
    "@heroicons/react": "^1.0.6",
    "@material-ui/core": "^4.12.4",
    "@mui/icons-material": "^5.11.16",
    "@mui/material": "^5.12.1",
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "axios": "^1.4.0",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-resize-observer": "^1.1.1",
    "react-router-dom": "^6.10.0",
    "react-scripts": "5.0.1",
    "recharts": "^2.5.0",
    "sass": "^1.62.0",
    "typescript": "^4.7.4",
    "web-vitals": "^2.1.4"
  },
```

After installing these dependencies, clone the repository and run the following commands:

```
cd front-end
npm install

```

## Available Scripts for the project local development

---

Start the application by executing the following command:

### `npm start`

This will start the react scripts configurated and will start the application in development mode. Now you can access it on your browser at `http://localhost:3000`.

### `npm run test`

Triggers jest and it will do tests for all the test files we have currently in the project

### `npm run build`

It will build the static files version of the projects and it can be deployed on hosts such as GitHub

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000/) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: Even though we installed alot of dependencies the project is based on CRA so npm run eject remains as an option, but is not recommended**

### `npm run deploy`

This command reqires the project to be built first, but this project has that part automated , it will deploy the project on github pages if you have the rights to do so.(you need to be a collaborator on the project)
