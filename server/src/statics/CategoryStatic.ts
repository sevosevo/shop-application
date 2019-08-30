import { CategoryFactory, CategoryStatic } from '../factories/Category';
import sequelize from '../db/conn';

const Category : CategoryStatic = CategoryFactory(sequelize);


export default Category;