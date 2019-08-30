import { Model, BuildOptions, Sequelize, DataTypes, HasManyGetAssociationsMixin } from "sequelize";
import { CategoryStatic, CategoryModel } from './Category';

export interface DepartmentModel extends Model {
    readonly id: number;
    name : string;
    description: string;

    getCategories: HasManyGetAssociationsMixin<CategoryModel[]>;
}

export type DepartmentStatic = typeof Model & (new (values?: object, options?: BuildOptions) => DepartmentModel) & { 
    associate: (model: CategoryStatic) => any;
};


export const DepartmentFactory = (sequelize: Sequelize) => {


    const Department = (<DepartmentStatic>sequelize.define('departments', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        name:  DataTypes.STRING,
        description: DataTypes.STRING(1000)
    }, {
        modelName:'departments'
    })) as DepartmentStatic;


    Department.associate = (model) => {
        Department.hasMany(model, {foreignKey: 'departmentId', onUpdate: 'cascade', onDelete: 'cascade'});
    };


    return Department;
}
