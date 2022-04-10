import { sequelize, Sequelize, User } from '.';
import { DateTime, Settings } from 'luxon';
// Settings.defaultZone = "Asia/Kolkata";

const curTime = () => {
	// const ts = new Date().getTime();
	// const dt = DateTime.fromMillis(ts)
	// /this.getDataValue('timestamp')
	const dt = Sequelize.NOW; //DateTime.now()//local().setZone('Asia/Kolkata',{ keepLocalTime: false })
	return dt;
	// this.setDataValue('date',dt.toLocaleString('en-GB'))
};

const Transaction = sequelize.define(
	'transaction',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		snd_id: {
			type: Sequelize.INTEGER,
			references: {
				model: User,
				key: 'id'
			}
		},
		rcv_id: {
			type: Sequelize.INTEGER,
			references: {
				model: User,
				key: 'id'
			}
		},
		amt: {
			type: Sequelize.DOUBLE,
			allowNull: false
		},
		date: {
			type: Sequelize.DATE,
			defaultValue: curTime()
			// get: ()=>{
			//   const ts = this.getDataValue('timestamp')
			//   const dt = DateTime.fromMillis(ts)
			//   this.setDataValue('date',dt.toLocaleString('en-GB'))
			// }
		}
	},
	{
		timestamps: true,
		createdAt: 'timestamp', // don't add createdAt attribute
		updatedAt: false,
		hooks: {
			afterCreate: async t1 => {
				let rcv = await User.findOne({
					where: {
						id: t1.rcv_id
					}
				})
				let snd = await User.findOne({
					where: {
						id: t1.snd_id
					}
				})
				rcv.balance += t1.amt
				snd.balance -= t1.amt
        await rcv.save()
        await snd.save()
			}
		}
	}
);

// sequelize.addHook('beforeCreate', () => {
//   console.log(21313)
// });
// User.hasMany(Transaction)
export default Transaction;
