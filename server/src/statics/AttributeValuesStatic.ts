import { AttributeValuesFactory, AttributeValuesStatic } from '../factories/AttributeValues';
import sequelize from '../db/conn';

const Attribute : AttributeValuesStatic = AttributeValuesFactory(sequelize);

export default Attribute;