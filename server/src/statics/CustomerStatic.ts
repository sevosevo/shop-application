import { CustomerFactory, CustomerStatic } from '../factories/Customer';
import sequelize from '../db/conn';

const Customer : CustomerStatic = CustomerFactory(sequelize);

export default Customer;