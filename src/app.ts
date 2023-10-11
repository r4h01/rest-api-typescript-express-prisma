import express from 'express'
import config from 'config'
import db from './utils/database'
import routes from './routes'

const PORT = config.get<number>('PORT')

const app = express()
app.use(express.json())
app.use(express.static("public"))

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`)
  await db.$connect()
  routes(app)
})
