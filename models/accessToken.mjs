import { sequelize, Sequelize, User } from '.';

const AccessToken = sequelize.define(
	'accessToken',
	{
		userId: {
			type: Sequelize.INTEGER,
			primaryKey: true,
     	references: {
				model: User,
				key: 'id'
			}
		},
    token:{
      type: Sequelize.STRING,
      unique:true
    }
		
	},
	{
		timestamps: true,
		createdAt: 'timestamp', // don't add createdAt attribute
		updatedAt: false,
	}
)

export default AccessToken
