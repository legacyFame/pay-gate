import { express } from '.'
import {
  addTransaction,
  getTransaction
} from '../controllers'

const router = express.Router()


router.get('/', getTransaction)
router.post('/', addTransaction)

// router.delete('/:id', deleteTransaction)

// router.patch('/:id', updateTransaction)

export default router
