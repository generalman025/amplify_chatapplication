# Assignment : Chat Application

Tech Stack:
- TypeScript / JavaScript
- React.js
- Node.js
- AWS
    - S3 & Cloudfront
    - Lambda & API Gateway
    - AppSync
    - DynamoDB
    - WAF
    - X-Ray & CloudWatch

Key Points:
- Security : DOM Purification, Secure Headers, WAF for API Gateway & AppSync
- Maintainability & Quality : Static Code Analysis (ESlint + Sonar Cloud & GitGuardian (Github Action)), Unit testing (Jest), End to End Testing (Cypress), 
- As simple as possible : Amplify

1. Install Amplify CLI
2. Create an empty folder and run command `amplify init --app amplify init --app https://github.com/generalman025/amplify_chatapplication.git`

Concern
    1. Error Custom CDK but it’s still work
    2. Bucket name conflict
    3. App will run but it’s may occur a CORS problem can be fix [comma separated]

To enable End to End Testing
1. Registered Cypress username & Password for E2E testing and specify in cypress.env.json


Using Amplify console
1. Add Custom Rules


Deployemt to CloudFront
1. Run command ===> `amplify publish`


Development Environment
- node ===> 15.14.0
- npm ===> 6.14.16
- Amplify CLI ===> 7.6.4

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
