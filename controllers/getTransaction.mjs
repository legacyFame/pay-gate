import { Transaction } from '.'

const getTransaction = async (req, res) => {
  console.log(req.user)
  Transaction.findAll()
    .then(data => res.json(data))
    .catch(err => {
      res.status(500)
      console.error(err)
    })
}

export default getTransaction
