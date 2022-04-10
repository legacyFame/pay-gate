import { User } from '.'

const getUser = async (req, res) => {
  User.findAll()
    .then(data => res.json(data))
    .catch(err => {
      res.status(500)
      console.error(err)
    })
}

export default getUser
