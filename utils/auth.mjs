import parseToken from './parseToken';
import jwt from 'express-jwt';

const auth = {
	required: jwt({
		secret: process.env.JWT,
		algorithms: ['HS256'],
		userProperty: 'payload',
		getToken: parseToken
	}),
	optional: jwt({
		secret: process.env.JWT,
		userProperty: 'payload',
		algorithms: ['HS256'],
		getToken: parseToken,
		credentialsRequired: false
	})
};

export default auth;
