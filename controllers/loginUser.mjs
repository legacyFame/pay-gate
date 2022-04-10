import { User } from '.';

import passport from 'passport';

const loginUser = (req, res) => {
	const { name, password } = req.body;
	if (!name || !password)
		res.status(422).json({ errors: 'Invalid credentials' });
	return passport.authenticate(
		'local',
		{ session: false },
		(err, passportUser, info) => {
			if (err) {
        console.log(err)
				return res.status(500).json({ errors: 'Invalid req' });
			}

			if (passportUser) {
				const user = passportUser;
				// user.token = passportUser.generateJWT();
				return res.json({ user: user.toAuthJSON() });
			}
			return res.status(500).json({errors:"Invalid req"});
		}
	)(req, res);
};



// const loginUser = (req, res) => {
// 	const { name, password } = req.body;
//   User.create({ name: 'hiro', password: '12345' });
// 	console.log(req.body);
// 	User.findOne({ where: { name: name } })
// 		.then(user => {
// 			console.log('user ', user);
// 			if (user) return user;
// 			new Error('User does not exist');
// 		})
// 		.then(user => {
// 			if (user.validatePassword(password)) req.login(user)//return passport.authenticate("local", { session: true })//req.login(user,()=>{});
// 			else new Error('Password not correct');
// 		})
// 		.then(() => res.json('Successful Login'))

// 		.catch(err => {
// 			res.status(422).json(err);
// 			console.error(err);
// 		});
// };

export default loginUser;
