import { express, isLoggedIn, auth } from '.';
import { addUser, loginUser, getUser } from '../controllers';
import passport from 'passport';

const router = express.Router();

router.get('/', getUser);
router.post('/', addUser);

// router.delete('/:id', deleteUser)

// router.patch('/:id', updateUser)

router.post('/login', auth.optional, loginUser);

router.get('/current', auth.required, (req, res) => {
	const {
		payload: { id }
	} = req;

	return Users.findById(id).then(user => {
		if (!user) {
			return res.sendStatus(400);
		}

		return res.json({ user: user.toAuthJSON() });
	});
});

router.get('/logout', auth.required, (req, res) => {
	req.logout();
	// req.session.destroy();
	res.json('Successfully logged out');
	// res.redirect('/login');
});

export default router;
