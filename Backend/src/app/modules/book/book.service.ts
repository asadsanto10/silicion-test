import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/apiError';
import calculatePagination from '../../../helpers/pagination.helper';
import { IBook, IBookFilter, IGenericResponse, IPageOtions } from './book.interface';
import { Book } from './book.model';
import { bookSearchTerm } from './book.variable';

const createBook = async (userId: string, bookData: IBook): Promise<IBook | null> => {
	const result = await Book.create({ ...bookData, userId });
	if (!result) {
		throw new Error('Failed to create new book');
	}
	return result;
};

const getAllBook = async (
	filter: IBookFilter,
	pageOptions: IPageOtions
): Promise<IGenericResponse<IBook[]>> => {
	const { searchTerm } = filter;

	const options = calculatePagination(pageOptions);
	const page = options.page as number;
	const limit = options.limit as number;
	const skip = options.skip as number;

	const sortCondition: { [key: string]: SortOrder } = {};
	const { sortBy, sortOrder } = options;

	if (sortBy && sortOrder) {
		sortCondition[sortBy] = sortOrder;
	}

	const query = [];
	if (searchTerm) {
		query.push({
			$or: bookSearchTerm.map((field) => ({
				[field]: {
					$regex: searchTerm,
					$options: 'i',
				},
			})),
		});
	}

	const queryCondition = query.length > 0 ? { $and: query } : {};
	const result = await Book.find(queryCondition).sort(sortCondition).skip(skip).limit(limit);

	const total = await Book.countDocuments(queryCondition);

	return {
		data: result,
		meta: {
			page,
			limit,
			total,
		},
	};
};

const getBookById = async (bookId: string): Promise<IBook | null> => {
	const result = await Book.findById(bookId);
	return result;
};

const updateBookId = async (
	bookId: string,
	payload: Partial<IBook>,
	userId: string
): Promise<IBook | null> => {
	const isExistUserBook = await Book.findOne({ _id: bookId, userId });

	if (!isExistUserBook) {
		throw new ApiError(
			httpStatus.NOT_FOUND,
			`You can't edit other people's books, you can only edit your own books`
		);
	}

	const result = await Book.findOneAndUpdate({ _id: bookId }, payload, {
		new: true,
	});
	return result;
};

const deleteBookyId = async (BookId: string, userId: string): Promise<IBook | null> => {
	const isExistUserBook = await Book.findOne({ _id: BookId, userId });

	if (!isExistUserBook) {
		throw new ApiError(
			httpStatus.NOT_FOUND,
			`You can't delete other people's books, you can only delete your own books`
		);
	}
	const result = await Book.findByIdAndDelete(BookId);
	return result;
};

export const bookService = { createBook, getAllBook, getBookById, updateBookId, deleteBookyId };
