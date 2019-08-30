import {Sequelize, DataTypes, BuildOptions, Model, HasManyCreateAssociationMixin, HasOneCreateAssociationMixin } from 'sequelize';
import { ReviewStatic, ReviewModel } from './Review';
import { CartStatic, CartModel } from '../factories/Cart';
import bcrypt from 'bcrypt';


interface CustomerModel extends Model {
  readonly id: number;
  name: string;
  email: string;
  password: string;
  creditCard : string;
  address1 : string;
  address2 : string;
  city : string;
  region : string;
  postalCode : string;
  country : string;
  shippingRegionId : number;
  dayPhone : string;
  evePhone : string;
  mobPhone : string;
  updatedAt : string;
  createdAt : string;
  facebookId: string;
  googleId: string;

  createReview: HasManyCreateAssociationMixin<ReviewModel>
  createCart: HasOneCreateAssociationMixin<CartModel>
  
  returnJwtPayload ?: () => any;
  //I  need this dataValues property for deleting ids from newly created user
  dataValues ?: any
}

type CustomerStatic = typeof Model &
  (new (values?: object, options?: BuildOptions) => CustomerModel) & {
    associate: (model: ReviewStatic, model2: CartStatic) => any;
  };


const CustomerFactory = (sequalize: Sequelize) => {
  const Customer = (<CustomerStatic>sequalize.define('customers', {
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
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: true, //True because we will be able to signup with Google or Facebook. 
      type: DataTypes.STRING
    },
    creditCard: DataTypes.TEXT,
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    city: DataTypes.STRING,
    region: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    country: DataTypes.STRING,
    shippingRegionId: {
     type: DataTypes.INTEGER,
     allowNull: false,
     defaultValue: '1'
    },
    dayPhone: DataTypes.STRING,
    evePhone: DataTypes.STRING,
    mobPhone: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    googleId: DataTypes.STRING
  }, {
    hooks: {
        beforeCreate: hashPwd,
        beforeUpdate: hashPwd
    },
    modelName: 'customers'
  })) as CustomerStatic; // This 'as' casting is not required since we called sequelize.define specifying return type

  Customer.associate = (model : ReviewStatic, model2) => {
    Customer.hasMany(model);
    Customer.hasOne(model2);
  };

  Customer.prototype.returnJwtPayload = function() {
    return {
      user: {
          id: this.id
      }
    }
  }

  return Customer;
};


async function hashPwd(user : CustomerModel) {
  if(user.password && user.password.length >0){
    const salt = await bcrypt.genSalt(16);
    const hash = await bcrypt.hash(user.password, salt); 

    user.password = hash;
  }
}


export { CustomerFactory, CustomerModel, CustomerStatic };