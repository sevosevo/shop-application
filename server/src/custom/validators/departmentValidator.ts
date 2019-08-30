import { body } from 'express-validator';

export default {
    create: [
        body('name').not().isEmpty().withMessage('Name field is required.'),
        body('description').not().isEmpty().withMessage('Description field is required.'),
    ],
    errorFormatter: ({ location, msg, param, value, nestedErrors }: any) => {
        return `${msg}`;
      }
}