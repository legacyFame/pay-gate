import { statSync } from 'fs'

import { sequelize } from '.'

const initDB = (dev = false) => {
  console.log("Inializing db")
  try {
    if (dev) throw new Error('Development On')
    statSync('./db')
  } catch (err) {
    console.log(err)
    createDB()
  }
}

const createDB = () => {
  sequelize
    .sync({ force: true })
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

export default initDB
