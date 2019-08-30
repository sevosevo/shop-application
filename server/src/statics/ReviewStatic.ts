import { ReviewFactory, ReviewStatic } from '../factories/Review';
import sequelize from '../db/conn';

const Review : ReviewStatic = ReviewFactory(sequelize);

export default Review;