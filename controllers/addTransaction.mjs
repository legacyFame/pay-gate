import { Transaction } from '.'

const addTransaction = async (req, res) => {
  let body = await req.body
  const { snd_id,rcv_id,amt } = body
  console.log(req.body)
  Transaction.create( {snd_id,rcv_id,amt })
    .then(t1 => res.json('Successful Transaction'))
    .catch(err => {
      res.status(451).end("Invalid Transaction")
      console.error(err)
    })
}

export default addTransaction
