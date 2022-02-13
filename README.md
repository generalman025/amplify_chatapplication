# Assignment : Chat Application

![alt text](https://github.com/generalman025/amplify_chatapplication/blob/main/diagram.png?raw=true)

## Tech Stack:
- TypeScript / JavaScript
- React.js
- Node.js
- AWS
    - S3 & Cloudfront
    - WAF
    - Cognito
    - Lambda & API Gateway
    - AppSync & X-Ray
    - DynamoDB

### Sample  Site
- [https://chatapp.g025app.com/](https://chatapp.g025app.com/)

## Key Points
- **Secure** : DOM Purify, Secure Headers, WAF for API Gateway & AppSync
- **Maintainability & Quality** : Static Code Analysis (ESlint, Sonar Cloud (Github App), GitGuardian (Github App)), Unit Testing (Jest), End to End Testing (Cypress), 
- **As simple as possible** : Amplify

## Installation
1. Install Node.js & Amplify CLI
2. Create an empty folder and execute command `amplify init --app https://github.com/generalman025/amplify_chatapplication.git`

#### Concern
    1. You may get an error during installation because of CDK resource provisioning, but it still works. (Investigating)
    2. Please be aware of bucket name conflict.
    3. After installation, you should config your origins in `amplify/backend/function/amplifychatapplistusers/parameters.json`(comma separated) and publish the application again via command `amplify publish`. 

#### To enable End to End Testing
- Add cypress username & password for end to end testing in `cypress.env.json`

#### To integrate with Amplify console
- Add Custom Rules in Amplify console (Rewrites and redirects)
    - Source address : `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>`
    - Target address : `/index.html`
    - Type : `200 (Rewrite)`

#### Development Environment
- Node.js : *15.14.0*
- NPM : *6.14.16*
- Amplify CLI : *7.6.4*