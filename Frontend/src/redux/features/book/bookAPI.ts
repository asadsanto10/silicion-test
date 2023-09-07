import type { IBook } from '../../../types/interface';
import { apiSlice } from '../../api/apiSlice';

interface IQueryData {
	searchTerm?: string;
	currentPage?: number;
	dataPerPage?: number;
}

const bookSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getAllBooks: builder.query({
			query: (queryData: IQueryData) => {
				const pagenationQuery = `?page=${queryData.currentPage}&limit=${queryData.dataPerPage}`;
				let query = '';

				if (queryData.searchTerm) {
					query = `&searchTerm=${queryData.searchTerm}`;
				}

				return {
					url: `/book/${pagenationQuery}${query}`,
					method: 'GET',
				};
			},
			providesTags: ['book'],
		}),
		createBook: builder.mutation({
			query: (data: IBook) => ({
				url: '/book',
				method: 'POST',
				body: data,
			}),
		}),
		updateBook: builder.mutation({
			query: ({ bookId, data }: { bookId: string; data: IBook }) => ({
				url: `/book/${bookId}`,
				method: 'PATCH',
				body: data,
			}),
			invalidatesTags: ['book'],
		}),

		getBookById: builder.query({
			query: (bookId: string) => ({
				url: `book/${bookId}`,
				method: 'GET',
			}),
		}),
		deleteBook: builder.mutation({
			query: (bookId: string) => ({
				url: `/book/${bookId}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['book'],
		}),
	}),
});

export const {
	useGetAllBooksQuery,
	useUpdateBookMutation,
	useCreateBookMutation,
	useGetBookByIdQuery,
	useDeleteBookMutation,
} = bookSlice;
