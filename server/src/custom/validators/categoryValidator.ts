import { body } from 'express-validator';

export default {
    create: [
        body('name').not().isEmpty().withMessage('Name field is required.'),
        body('department').toInt().isNumeric().withMessage('Department field must be valid')
    ],
    errorFormatter: ({ location, msg, param, value, nestedErrors }: any) => {
        return `${msg}`;
      }
}