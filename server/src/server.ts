import app from './app';
import sequelize from './db/conn';

import ReviewStatic from './statics/ReviewStatic';
import CustomerStatic from './statics/CustomerStatic';
import ProductStatic from './statics/ProductStatic';
import CategoryStatic  from './statics/CategoryStatic';
import AttributeStatic from './statics/AttributeStatic';
import AttributeValuesStatic from './statics/AttributeValuesStatic';
import DepartmentStatic  from './statics/DepartmentStatic';
import CartStatic from './statics/CartStatic';

//Create associations
CustomerStatic.associate(ReviewStatic, CartStatic);
CartStatic.associate(CustomerStatic, ProductStatic);
ReviewStatic.associate(CustomerStatic, ProductStatic);
CategoryStatic.associate(ProductStatic, DepartmentStatic);
DepartmentStatic.associate(CategoryStatic);
ProductStatic.associate(ReviewStatic, CategoryStatic, AttributeStatic);
AttributeStatic.associate(AttributeValuesStatic, ProductStatic);
AttributeValuesStatic.associate(AttributeStatic);

import './custom/authentication/passport';

//Create tables
sequelize.sync({force:true})
.then(async() => {

    //Create attributes and their values
    const size = await AttributeStatic.create({name: 'Size'});
    const attributeValues = await AttributeValuesStatic.bulkCreate([
        {attributeId: 1, value: 'XS'},
        {attributeId: 1, value: 'S'},
        {attributeId: 1, value: 'M'},
        {attributeId: 1, value: 'L'},
        {attributeId: 1, value: 'XL'}
    ]);

    const colour = await AttributeStatic.create({name: 'Colour'});
    const attributeValues2 = await AttributeValuesStatic.bulkCreate([
        {attributeId: 2, value: 'Red'},
        {attributeId: 2, value: 'Blue'},
        {attributeId: 2, value: 'White'}
    ]);

    const department = await DepartmentStatic.create({name:'New collection', description: 'Our new collection.'});
    const department2 = await DepartmentStatic.create({name:'Winter collection', description: 'Our winter collection.'});

 
    await CategoryStatic.create({departmentId: 1, name: 'T-Shirts', description: 'hello world'});
    await CategoryStatic.create({departmentId: 1, name: 'Jeans', description: 'dsa world'});
    await CategoryStatic.create({departmentId: 2, name: 'T-Shirts', description: 'hello world'});

    app.listen(app.get('PORT'), () => console.log('Listening on port '+app.get('PORT')));
})
.catch((err:any) => {
    console.error(err);
    process.exit(1);
});







