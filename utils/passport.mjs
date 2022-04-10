import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../models';

const Passport = app => {
	passport.serializeUser((user, done) => {
		//session storage
		done(null, user.id);
	});
	passport.deserializeUser((req, userId, done) => {
		User.findByPk(userId)
			.then(user => done(null, user))
			.catch(err => {
				console.log(err);
				req.status(422).json('Invalid Id,Session expired Kindly login again');
			});
	});
	const strategy = new Strategy(
		{
			usernameField: 'name',
			passwordField: 'password'
		},
		(name, pass, done) => {
			User.findOne({ name })
				.then(user => {
					if (!user || !user.validatePassword(pass))
						return new Error('Credentials not valid'); // done(null, false, { message: 'Credentials not valid.' });
					return done(null, user);
				})
				.catch(err => {
					return done(JSON.stringify(err))  ;
				});
		}
	);
	passport.use('local', strategy);
	app.use(passport.initialize());
	// app.use(
	// 	session({
	// 		secret: process.env.session,
	// 		resave: false,
	// 		saveUninitialized: false,
	// 		rolling: true,
	// 		cookie: {
	// 			httpOnly: true,
	// 			maxAge: 20 * 60 * 1000
	// 			// domain:
	// 		}
	// 	})
	// app.use(passport.session());
};

export default Passport;
