import { 
  Model,
  BuildOptions, 
  Sequelize, 
  DataTypes, 
  BelongsToManyCreateAssociationMixin, 
  HasManyGetAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin
} from "sequelize";
import { ReviewStatic, ReviewModel } from "./Review";
import { CategoryStatic, CategoryModel } from "./Category";
import { AttributeModel } from './Attribute';
import Category from '../statics/CategoryStatic';
import { AttributeStatic } from '../factories/Attribute';

export interface ProductModel extends Model{
    readonly id: number;
    name: string;
    description: string;
    price: number; //Decimal
    discountedPrice: number; //Decimal
    image: string;
    image2: string;
    thumbnail: string;
    display: number;

    createCategory: BelongsToManyCreateAssociationMixin<CategoryModel>;
    addCategories: BelongsToManyAddAssociationMixin<CategoryModel[], number[]>;
    getReviews: HasManyGetAssociationsMixin<ReviewModel>;
    getCategories: BelongsToManyGetAssociationsMixin<CategoryModel>;
    addAttribute: BelongsToManyAddAssociationMixin<AttributeModel, number>;
    addAttributes: BelongsToManyAddAssociationMixin<AttributeModel[], number[]>;
    getAttributes: BelongsToManyGetAssociationsMixin<AttributeModel[]>;
};

export type ProductStatic = typeof Model & (new (values?: object, options?: BuildOptions) => ProductModel) & {
  associate: (model1: ReviewStatic, model2: CategoryStatic, model3: AttributeStatic) => any;
  getByCategoryId: (attributes: string | any[], categoryId: number, otherQuery: any) => Promise<{count:number, rows:ProductModel[]}>;
};

export const ProductFactory = (sequelize: Sequelize) => {

    const Product = (<ProductStatic>sequelize.define('products', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          name: {
            allowNull: false,
            type: DataTypes.STRING
          },
          description:  DataTypes.TEXT,
          price: {
            allowNull: false,
            type: DataTypes.DECIMAL(4, 2)
          },
          discountedPrice: {
            allowNull: false,
            type:DataTypes.DECIMAL(6, 2),
            defaultValue: 0
          },
          image: DataTypes.STRING,
          image2: DataTypes.STRING,
          thumbnail: DataTypes.STRING,
          display: DataTypes.INTEGER
    }, {
        indexes: [
          {type: 'FULLTEXT', name:"text_idx", fields: ['name', 'description']}
        ],
        scopes: {
          ProductAttributes: {
            attributes: ['id', 'name', 'description', 'price', 'discountedPrice', 'thumbnail']
          },
          ProductDetailAttributes: {
            attributes: ['id', 'name', 'description', 'price', 'discountedPrice', 'image', 'image2']
          },
          ProductCompleteAttributes: {} //Include everything
        },
        modelName:'products'
    })) as ProductStatic;

    Product.associate = (model1: ReviewStatic, model2: CategoryStatic, model3: AttributeStatic) => {
        Product.hasMany(model1);
        Product.belongsToMany(model2, {through: 'product_category'});
        Product.belongsToMany(model3, {through: 'product_attribute'});
    }

    Product.getByCategoryId = async(attributes, id: number, otherQuery: any) => {
      let products: {count: number, rows:ProductModel[]};
      
        products = await Product.findAndCountAll({
          attributes,
          include: [
            {
              model: Category, 
              where: {id: id}, 
              attributes: [],
              through: {
                attributes: []
              }
            } 
          ],
          ...otherQuery
        });

      return products;
      
    }

    return Product;

}


