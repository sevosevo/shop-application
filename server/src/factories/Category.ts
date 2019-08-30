import { Model, BuildOptions, Sequelize, DataTypes } from "sequelize";
import { ProductStatic } from "./Product";
import Product from "../statics/ProductStatic";
import {  DepartmentStatic } from "../factories/Department";
import Department from '../statics/DepartmentStatic';

export interface CategoryModel extends Model{
    readonly id: number;
    departmentId: number;
    name: string;
    description: string;    
};

export type CategoryStatic = typeof Model & (new (values?: object, options?: BuildOptions) => CategoryModel) & {
  associate: (model: ProductStatic, model2: DepartmentStatic) => any;
  findByProductId: (id:number) => Promise<CategoryModel[]>;
  findByDepartmentId: (id: number) => Promise<CategoryModel[]>;
};

export const CategoryFactory = (sequelize: Sequelize) => {

    const Category = (<CategoryStatic>sequelize.define('categories', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
        departmentId: {
            allowNull: false,
            type: DataTypes.INTEGER
          },
        name:  DataTypes.STRING,
        description:  DataTypes.STRING
    }, {
        scopes: {
          CategoryAttributes: {}
        },
        modelName:'categories'
    })) as CategoryStatic;

    Category.associate = (model: ProductStatic, model2: DepartmentStatic) => {
        Category.belongsToMany(model, {through: 'product_category'});
        Category.belongsTo(model2, { foreignKey: 'departmentId', onUpdate: 'cascade', onDelete: 'cascade' });
    };

    Category.findByProductId = async(id:number) => {
      let categories : CategoryModel[];

      categories = await Category.findAll({
        include: [{model: Product, where: {id}, attributes: [], through: {attributes: []}}]
      });

      return categories;
    };
    Category.findByDepartmentId = async(id: number) => {

      let categories : CategoryModel[];

      categories = await Category.findAll({
        include: [{model: Department, where: {id}, attributes: []}]
      });

      return categories;

    };

    return Category;

}