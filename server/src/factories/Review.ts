import { Sequelize, DataTypes, BuildOptions, Model } from 'sequelize';
import { CustomerStatic } from './Customer';
import { ProductStatic } from './Product';

interface ReviewModel extends Model {
  readonly id?: number;
  customerId?: number;
  productId?: number;
  review: string;
  rating: number;
  updatedAt?: string;
  createdAt?: string;
}

type ReviewStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => ReviewModel) & {
    associate: (model1: CustomerStatic, model2: ProductStatic) => any;
  };

const ReviewFactory = (sequalize: Sequelize) => {
  const Review = (<ReviewStatic>sequalize.define('reviews', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    customerId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    review: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        validRating: (value: string | number) => {
          let num: number;
          const validRating: number[] = [1, 2, 3, 4, 5];
          if (typeof value === 'string') {
            num = parseInt(value)
          } else {
            num = value;
          }
          const isValid = validRating.find(rating => rating === num);
          if (!isValid) {
            throw new Error('Rating goes from 1 to 5.');
          }
        }
      }
    }
  }, {
    modelName: 'reviews'
  })) as ReviewStatic;

  Review.associate = (model1: CustomerStatic, model2: ProductStatic) => {
    Review.belongsTo(model1);
    Review.belongsTo(model2);
  };

  return Review;
};

export {ReviewFactory, ReviewModel, ReviewStatic};