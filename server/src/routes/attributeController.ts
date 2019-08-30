import express, { Router, Request, Response, NextFunction } from 'express';
import AttributeStatic from '../statics/AttributeStatic';
import { AttributeModel } from '../factories/Attribute';
import Error from '../interfaces/Error';
import { AttributeValuesModel } from '../factories/AttributeValues';
import ProductStatic from '../statics/ProductStatic';
import AttributeValuesStatic from '../statics/AttributeValuesStatic';
import { ProductModel } from '../factories/Product';

const router : Router = express.Router();

router.get('/attributes', async(request: Request, response: Response, next: NextFunction) => {

    let attributes: AttributeModel[];
    
    attributes = await AttributeStatic.findAll();

    response
        .status(200)
        .json(attributes);

});

router.get('/attributes/:id', async (request:Request, response:Response, next: NextFunction) => {
    
    const {
        id
    } = request.params;

    let attribute: AttributeModel;

    attribute = await AttributeStatic.findOne({where: {
        id
    }});
    
    if(!attribute){
        const error: Error = {
            code: 'ATR_01',
            message: 'Attribute doesn\'t exist',
            status: 404,
            field: 'attribute'
        }

        return next(error);
    }

    response
        .status(200)
        .json(attribute);
});

router.get('/attributes/values/:id', async (request:Request, response:Response, next: NextFunction) => {
    
    const { id } = request.params;

    let attribute: AttributeModel;
    let attributeValues: AttributeValuesModel[];

    attribute = await AttributeStatic.findOne({where: {
        id
    }});

    if(!attribute){
        const error: Error = {
            code: 'ATR_01',
            message: 'Attribute doesn\'t exist',
            status: 404,
            field: 'attribute'
        }

        return next(error);
    }

    attributeValues = await attribute.getAttributeValues();

    response
        .status(200)
        .json(attributeValues);
});

router.get('/attributes/inProduct/:id', async (request:Request, response:Response, next:NextFunction) => {

    const { id } = request.params;

    
    const product: ProductModel & {[key: string] : any} = await ProductStatic.findOne({
        where: {
            id
        },
        attributes: [],
        include: [{model: AttributeStatic, through: {attributes: []}}]
    });

    response
        .status(200)
        .json(product.attributes);

});

router.get('/attributes/inProduct/:id/withValues', async (request:Request, response:Response, next:NextFunction) => {

    const { id } = request.params;

    
    const product: ProductModel & {[key: string] : any} = await ProductStatic.findOne({
        where: {
            id
        },
        attributes: [],
        include: [{model: AttributeStatic, through: {attributes: []}, include: [AttributeValuesStatic]}]
    });

    response
        .status(200)
        .json(product.attributes);

});


export default router;



