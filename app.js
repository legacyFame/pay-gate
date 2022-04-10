import Express from 'express'
import morgan from 'morgan'
import { userRoutes, transactionRoutes } from './routes'
import { initDB, Passport,auth } from './utils'

const app = Express()
const port = process.env.PORT || 3237
app.listen(port, () => console.log(`server is running on ${port}`))
initDB(1)
Passport(app)

app.use(morgan('dev'))
app.use(Express.json())
app.use(Express.urlencoded({ extended: false }))
// app.use(cors()) //security issues perfer not server rendering

app.use('/user', userRoutes)
app.use('/transaction', transactionRoutes)
app.get('/',(req, res) => res.json('Dashboard'))
