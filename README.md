# TS-423

Custom implementation of Sauce Labs Live Testing device launch logic

## Getting Started
1. Clone the repository `git clone https://github.com/caseycling/saucelabs-remote-access-app.git`
2. Go to the repository `cd saucelabs-remote-access-app`
3. Install dependencies `npm i`
4. Create your .env file in the root of the project directory, which contains your `process.env.REACT_APP_SAUCE_USERNAME` and `process.env.REACT_APP_SAUCE_ACCESS_KEY`

## Usage

### Backend
```shell
cd api
node api.js
```

### Frontend
```shell
npm start
```

## API Routes
- `/getDevicesStatus` Implements the public Sauce Labs API [getDevicesStatus](https://docs.saucelabs.com/dev/api/rdc/#get-devices-status)
- `/validateDescriptor` Implements the semi-private Sauce Labs API `/v1/rdc/devices/augmented/${descriptor}`. Useful for validating a descriptor and getting device information 
- `/openDevice` Implements the semi-private Sauce Labs API `/v1/rdc/manual/devices/${descriptor}/open`. Used to start a manul testing session on the device. Return response is a JSON-encoded object, containing information to interact with the session, as well as information about the session itself
- `/${deviceSessionId}/close` - Implements the semi-private Sauce Labs API `POST /v1/rdc/manual/sessions/{sessionId}/close`. Used to close a manual testing session given a valid deviceSessionId. Upon successful close, no response data is provided.

## Sauce Documentation & Resources 📚
- `User Credentials Environment Variables` Using Sauce user credential environment variables in your app [User Cred Environment Variables](https://docs.saucelabs.com/secure-connections/sauce-connect/setup-configuration/environment-variables/#user-credentials-environment-variables)
- `Platform Configurator` Tool developed by Sauce Labs to help you correctly configure test capabilities for your Appium and Selenium tests. [Platform Configurator](https://saucelabs.com/products/platform-configurator#/)
- `SauceLabs Blog` Test automation tutorials, guides, learnings, and insights [Sauce Blog](https://saucelabs.com/resources/blog)
