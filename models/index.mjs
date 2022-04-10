export { Sequelize } from 'sequelize'
export { sequelize } from '../utils'
export { default as User } from './user'
export { default as Transaction } from './transaction'
export { default as AccessToken } from './accessToken'





// get() {
//   const dt = DateTime.fromJSDate(this.getDataValue('paymentDate'));
//   return dt.setLocale('fr').toLocaleString(DateTime.DATETIME_FULL);
// }