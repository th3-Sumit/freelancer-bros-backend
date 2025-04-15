const express = require('express')
const app = express()
require('./Config/db')
const env = require('dotenv')
const router = require('./Routes/Routes')
const cors = require('cors')
const bodyParser = require('body-parser')
env.config()


app.use(bodyParser.json());
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    origin: '*',
    allowedHeaders: ['Content-Type']
  }));
const PORT = process.env.PORT || 3001

app.get('/', (req, res) => {
    res.send("Hello express!")
})

app.use('/api/v1', router)



app.listen(PORT, () => {
    console.log(`Project is running on port: ${PORT}`);
})