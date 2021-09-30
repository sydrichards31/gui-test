const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const bodyParser = require('body-parser');
const promisify = require('util').promisify;

const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.options('*', cors());

const writeFilePromise = promisify(fs.writeFile);

// Function to write json text to output.json
WriteTextToFileAsync = async (contentToWrite) => {
    try {
        const path = 'output.json';
        await writeFilePromise(contentToWrite, path);
    } catch(err) {
        throw new Error(`Could not write file because of {err}`);
    }
}

// Default route
app.get('/', (req, res) => res.status(200).send({ message : 'Default' }));


// Write route
app.post('/write', async (req, res) => {
  res.send(
    `POST request received`,
  );
  let jsonContent = JSON.stringify(req.body, null, 2);


  fs.writeFile("output.json", jsonContent, 'utf8', function(err) {
    if (err) {
      console.log("error");
      return console.log(err);
    }
    console.log("Successfully wrote to output.json")
  })

});

// Not-found route
app.use((req, res, next) => {
    res.status(404).send({ message: 'Could not find the specified route you requested!' });
});

app.listen(port, () => console.log(`Server up and running and listening for incoming requests on port ${port}!`));