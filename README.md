# MIEL PROJECT

Miel project is e-commerse web application.<br />
The application have 3 access modes:<br />
- not sign in user <br />
- sign in user - have all not sign in user functionality + view of shopping card page.<br />
- administrator - By default when you register new user it is registered with client rights. For to login with administrator rights you can use <b>user:admin@yahoo.com, password: 123456</b>. Administrator have all not sign in user functionality + Add subcategories, Add products and delete products.<br />
You can view project code here: https://github.com/antonjekov/miel-project-client 

## Used technologies and libraries:
 
### Client-side:
React<br /> 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).<br />
react-bootstrap - ready for use stiled components<br />
formic and yup - yup for make schema and formic for validate data in form input fields<br />
claudinary - used for save all images in application<br />
dropzone - we use this library in Add product and Add Subcategory page <br />
Google Maps Api - used in Contact page for represent interactive map with marked our phisical sell points.<br />
@testing-library/react - used in developer mode for test components<br />
react-test-renderer - used in developer mode for test components<br />
nodemailer - used in server part for send messages from Contact page

## Getting Started

1. Clone the code from provided github repository https://github.com/antonjekov/miel-project-client
2. Save in the root directory file `.env.local` (not included in repository)
3. Install all dependencies with command `npm install`
4. Server api runs on https://miel-project-server.herokuapp.com/ . If you want to use local server first change SERVER_URL in file `.env.local` and then install and start server the api is provided here: https://github.com/antonjekov/miel-project-server . More information how to start server you can find in README.md of this repository. 
5. Start current application with command `npm start`. The application will run in http://localhost:3000

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
