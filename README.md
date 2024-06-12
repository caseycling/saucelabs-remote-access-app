# TS-423

Custom implementation of Sauce Labs Live Testing device launch logic

## Getting Started
1. Clone the repository `git clone https://github.com/caseycling/optum-app.git`
2. Go to the repository `cd optum-app`
3. Install dependencies `npm i`

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