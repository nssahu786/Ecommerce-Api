const app = require('./app')
const dotenv = require('dotenv')


dotenv.config({path: './.env'})

app.listen(process.env.PORT, () => {
    console.log(`API SERVER IS LAUNCHED ON PORT ${process.env.PORT}`)
  })