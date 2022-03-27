import Express from 'express'
import morgan from 'morgan'

const app = Express()
const port = process.env.PORT || 3237
app.listen(port, () => console.log(`server is running on ${port}`))
// initDB()
// Passport(app)

app.use(morgan('dev'))
app.use(Express.json())
app.use(Express.urlencoded({ extended: true }))
// app.use(cors()) //security issues perfer not server rendering


app.get('/', (req, res) => res.json('Dashboard'))
