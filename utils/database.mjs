import { Sequelize } from "sequelize"


const user = process.env['user']
const pass = process.env['pass']

const sequelize = new Sequelize("sequelize",user, pass, {
    dialect: "sqlite",
    storage: "./db"
})

export default sequelize


