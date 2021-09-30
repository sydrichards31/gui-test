# gui-test

This app displays various UI Components with a React JS frontend and writes the submitted data to a local JSON file using a Node.js and Express API.

## Setting up the environment

To clone the project locally and install dependencies:

```bash
git clone https://github.com/sydrichards31/gui-test.git
cd gui-test
npm install express
cd client
npm install
```

## Running the application

To run the server side of the application:

1. Open a new terminal
2. Run ``` npm start ```

To run the client side front end of the application:
1. Open a second terminal
2. Run  ``` npm start ```

This will open the frontend React App on localhost:3000.

After all of the fields are complete, the submit button will become enabled and the user input will be written to a file called "output.json" in the server folder of the application.
