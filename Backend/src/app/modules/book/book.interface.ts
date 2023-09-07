import { Model, Types } from 'mongoose';

export interface IGenericResponse<T> {
	data: T;
	meta: {
		page: number;
		limit: number;
		total: number;
	};
}

export interface IBook {
	userId: Types.ObjectId;
	title: string;
	description?: string;
	author: string;
	genre: string;
	publicationDate: Date;
}

export interface IBookFilter {
	searchTerm?: string;
}
export interface IPageOtions {
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
}

export type IBookModel = Model<IBook, Record<string, unknown>>;
