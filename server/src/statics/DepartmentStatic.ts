import { DepartmentFactory, DepartmentStatic } from '../factories/Department';
import sequelize from '../db/conn';

const Attribute : DepartmentStatic = DepartmentFactory(sequelize);

export default Attribute;