This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

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

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


## Heroku CLI

You need to download the Heroku CLI which will enable us deploy and manage our application.
After installation login into the Heroku Cli by running this command in the terminal.

### `heroku login`

Open the terminal and paste in this command to clone the application. A gentle reminder that this step will only work if you have Git installed on your computer.

### `https://github.com/JohnsonCustomerAnalytics/paneldata_dash.git`

Open the folder paneldata_dash/frontend/ with your favorite text editor or IDE. Create a virtual environment and install the dependencies by running.

### `sudo npm install `

## Deployment

We are now ready to deploy our application. In the application folder run

### `heroku create name-of-your-app`

Please note that name needs to be unique globally.

After creating a heroku app you should see something like:

### `heroku create name-or-your-app-frontend`
### `Creating name-or-your-app-frontend... done`
### `https://name-or-your-app-frontend.herokuapp.com/ | https://git.heroku.com/name-or-your-app-frontend.git`


Clone this heroku git repository somewhere on your machine

### `git clone https://git.heroku.com/name-or-your-app-frontend.git`

After cloning copy all the files from panel_data/frontend to cloned repository and push changes to repository

### `git add .`
### `git commit -m ""initial commit"`
### `git push heroku master`

But before committing and pushing the changes you need to create a .env file in the root folder (next to src folder)

if you are using local environment .env file should look something like 
### `REACT_APP_API_URL=http://localhost:5000/api/v1/';'`
The default port is 5000 but you can use other port if you want, but just remember the change it accordingly here as well. 

if you are deploying to heroku .env file should look something like like:
### `REACT_APP_API_URL=http://name-of-your-app.herokuapp.com/api/v1/`
      
Where name-of-your-app is the name you gave when you created a heroku app for the backend.
Please not that if you want to add or change env variables, they need to prefix with: REACT_APP
You can check heroku logs using this command:

### `heroku logs --tail`

