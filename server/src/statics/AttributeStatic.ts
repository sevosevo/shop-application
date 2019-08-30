import { AttributeFactory, AttributeStatic } from '../factories/Attribute';
import sequelize from '../db/conn';

const Attribute : AttributeStatic = AttributeFactory(sequelize);

export default Attribute;