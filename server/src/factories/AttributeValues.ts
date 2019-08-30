import { Model, BuildOptions, Sequelize, DataTypes } from "sequelize";
import { AttributeStatic } from '../factories/Attribute';

export interface AttributeValuesModel {
    readonly id: number;
    attributeId: number;
    value : string;
}

export type AttributeValuesStatic = typeof Model & (new (values?: object, options?: BuildOptions) => AttributeValuesModel) & {
    associate: (model: AttributeStatic) => any;
 };


export const AttributeValuesFactory = (sequelize: Sequelize) => {


    const AttributeValues = (<AttributeValuesStatic>sequelize.define('attributeValues', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        attributeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        value:  DataTypes.STRING,
    }, {
        //Disable timestamp columns
        timestamps: false,
        modelName:'attributeValues'
    })) as AttributeValuesStatic;

    AttributeValues.associate = (model) => {
        AttributeValues.belongsTo(model);
    }

    return AttributeValues;

}
