import { Model, BuildOptions, Sequelize, DataTypes, HasManyGetAssociationsMixin } from "sequelize";
import { CustomerStatic } from "./Customer";
import { ProductModel, ProductStatic } from "./Product";

export interface CartModel extends Model {
    readonly id: number;

    getProducts: HasManyGetAssociationsMixin<ProductModel[]>;
}

export type CartStatic = typeof Model & (new (values?: object, options?: BuildOptions) => CartModel) & { 
    associate: (model: CustomerStatic, model2: ProductStatic) => any;
};


export const CartFactory = (sequelize: Sequelize) => {


    const Cart = (<CartStatic>sequelize.define('carts', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          }
    }, {
        modelName:'carts'
    })) as CartStatic;


    Cart.associate = (model, model2) => {
        Cart.belongsTo(model);
        model2.belongsTo(Cart);
    };

    return Cart;
}
