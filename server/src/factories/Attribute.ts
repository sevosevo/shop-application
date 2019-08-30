import { Model, BuildOptions, Sequelize, DataTypes, HasManyGetAssociationsMixin } from "sequelize";
import { AttributeValuesStatic, AttributeValuesModel } from '../factories/AttributeValues';
import { ProductStatic } from '../factories/Product';

export interface AttributeModel extends Model {
    readonly id: number;
    name : string;

    getAttributeValues: HasManyGetAssociationsMixin<AttributeValuesModel>;
}

export type AttributeStatic = typeof Model & (new (values?: object, options?: BuildOptions) => AttributeModel) & { 
    associate: (model: AttributeValuesStatic, model2: ProductStatic) => any;
};


export const AttributeFactory = (sequelize: Sequelize) => {


    const Attribute = (<AttributeStatic>sequelize.define('attributes', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        name:  DataTypes.STRING,
    }, {
        modelName:'attributes'
    })) as AttributeStatic;


    Attribute.associate = (model, model2) => {
        Attribute.hasMany(model);
        Attribute.belongsToMany(model2, {through: 'product_attribute'});
    }


    return Attribute;
}
