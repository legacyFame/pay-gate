import { User } from '.'

const addUser = async (req, res) => {
  let body = await req.body
  const { name, password,city,zipCode } = body
  const balance = body.balance ? body.balance : 0
  console.log(req.body)
  User.create({ name, password,city, zipCode,balance})
    .then(user => res.json('Success'))
    .catch(err => {
      res.status(500).end("User exists")
      console.error(err)
    })
}

export default addUser
