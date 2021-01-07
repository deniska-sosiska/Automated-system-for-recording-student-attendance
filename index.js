const http = require('http')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {  routes  } = require('./src/routes')


const {  PORT, dataBaseUrl, dataBaseOptions, errorHandler  } = require('./src/config')

//Ініціалізація додатку
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(__dirname + '/src/public'));
routes.forEach(item => {
  app.use(`/api/${item}`, require(`./src/routes/${item}`))
})

app.get('/', function (req, res) {
  res.sendFile('index.html')
})

//Налаштування БД
mongoose.connect(dataBaseUrl, dataBaseOptions).then(
  () => {  console.log('MongoDB connection successful')  },
  (err) => {  console.log(errorHandler('MongoDB connection unsuccessful', err))  }
)

//Запуск та прослуховування
http.createServer({}, app).listen(PORT, () => {
  console.log(`Server running at localhost:${PORT}`)
})
