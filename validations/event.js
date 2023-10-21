import status from 'http-status';

const addEvent = (req, res, next) => {
	const { description, name, price, weight, category } = req.body;

	if (!description || !name || !category || !price || !weight   ) {
		res.status(status.BAD_REQUEST);
		next(
			new Error('name, description and price Must be Defined in request body'),
		);
	} else {
		next();
	}
};

export default { addEvent };
