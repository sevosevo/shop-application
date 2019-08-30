import { CartStatic, CartFactory } from '../factories/Cart';
import sequelize from '../db/conn';

const Category : CartStatic = CartFactory(sequelize);


export default Category;