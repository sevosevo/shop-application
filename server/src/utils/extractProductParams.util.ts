import { Request } from 'express';

interface ProductParams{
	page: number;
	limit: number;
	offset: number;
	descriptionLength: number;
}

export function extractProductParams(request: Request): ProductParams {
	const page  = parseInt(request.query.page) || 1;
	const limit = parseInt(request.query.limit) || <number>request.app.get('LIMIT');
	const offset = (page - 1) * limit
	const descriptionLength = parseInt(request.query.descriptionLength) || 20;

	return {page, limit, offset, descriptionLength};
}