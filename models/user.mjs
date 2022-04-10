import { sequelize, Sequelize } from '.';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

const User = sequelize.define(
	'user',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
			set(pass) {
				const salt = genSaltSync(10, 'a');
				let password = hashSync(pass, salt);
				this.setDataValue('password', password);
			}
		},
		balance: {
			type: Sequelize.INTEGER,
			default: 0
		},
		city: {
			type: Sequelize.STRING,
			allowNull: true
		},
		zipCode: {
			type: Sequelize.INTEGER,
			allowNull: true
		}
	},
	{
		timestamps: false
	}
);

let instanceMethods = {
	validatePassword: function(password) {
		return compareSync(password, this.password);
	},
	generateJWT: function() {
		const today = new Date().getTime();
		const expirationDate = today + 1000 * 60 * 5;

		return jwt.sign(
			{
				id: this.id,
				name: this.name,
				exp: parseInt(expirationDate / 1000, 10)
			},
			process.env.JWT
		);
	},
	toAuthJSON: function() {
		let x = {
			token: this.generateJWT()
		};
		return x;
	}
};

for (let method in instanceMethods)
	User.prototype[method] = instanceMethods[method];

export default User;
