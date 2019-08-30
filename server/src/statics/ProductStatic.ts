import sequelize from '../db/conn';
import { ProductFactory } from '../factories/Product';

export default ProductFactory(sequelize);

