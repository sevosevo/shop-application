import { body } from 'express-validator';

const nameCheck = body('name').not().isEmpty().withMessage('Product field is required.');
const descriptionCheck = body('description').not().isEmpty().withMessage('Description field is required.');
const priceCheck = body('price').toFloat().isNumeric().withMessage('Price must be numeric.');
const discountedPriceCheck = body('discountedPrice').toFloat().isNumeric().withMessage('Discount must be numeric.');

export default {
    create: [
        nameCheck,
        descriptionCheck,
        priceCheck,
        discountedPriceCheck
    ],
    errorFormatter: ({ location, msg, param, value, nestedErrors }: any) => {
        return `${msg}`;
      }
}

