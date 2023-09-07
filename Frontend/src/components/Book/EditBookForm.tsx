import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUpdateBookMutation } from '../../redux/features/book/bookAPI';
import { IBook, IErrorResponse } from '../../types/interface';
import Error from '../ui/Error';

/* eslint-disable jsx-a11y/label-has-associated-control */
const EditBookForm = () => {
	const location = useLocation();
	const bookDetails: IBook = location.state;
	const [publicationDate, setPublicationDate] = useState('');

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IBook>();

	const navigate = useNavigate();
	const [updateBook, { data, isLoading, error, isError }] = useUpdateBookMutation();

	const timeFormate = (date: string | number) => new Date(date).getTime();

	const onSubmit: SubmitHandler<IBook> = (inputData: IBook): void => {
		const bookData = {
			...inputData,
			publicationDate:
				inputData.publicationDate !== ''
					? timeFormate(inputData.publicationDate)
					: timeFormate(bookDetails.publicationDate),
		};
		const bookId = bookDetails?.id as string;
		updateBook({ bookId, data: bookData });
	};

	useEffect(() => {
		const dateFormate = new Date(bookDetails?.publicationDate).toJSON();
		setPublicationDate(dateFormate.split('T')[0]);
	}, [bookDetails?.publicationDate]);

	useEffect(() => {
		if (data?.status) {
			reset();
			navigate('/');
			toast.success(data?.message);
		}
	}, [data, navigate, reset]);

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-wrap -m-2">
					<div className="p-2 w-1/2">
						<div className="relative">
							<label htmlFor="title" className="leading-7 text-sm text-gray-600">
								Title
							</label>
							<input
								defaultValue={bookDetails?.title || ''}
								type="text"
								id="title"
								className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								{...register('title')}
							/>
							{errors.title && <p className="text-red-400">{errors.title.message}</p>}
						</div>
					</div>
					<div className="p-2 w-1/2">
						<div className="relative">
							<label htmlFor="author" className="leading-7 text-sm text-gray-600">
								Author
							</label>
							<input
								defaultValue={bookDetails?.author || ''}
								type="text"
								id="author"
								className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								{...register('author')}
							/>{' '}
							{errors.author && <p className="text-red-400">{errors.author.message}</p>}
						</div>
					</div>
					<div className="p-2 w-1/2">
						<div className="relative">
							<label htmlFor="genre" className="leading-7 text-sm text-gray-600">
								Genre
							</label>
							<input
								defaultValue={bookDetails?.genre || ''}
								type="text"
								id="genre"
								className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								{...register('genre')}
							/>{' '}
							{errors.genre && <p className="text-red-400">{errors.genre.message}</p>}
						</div>
					</div>
					<div className="p-2 w-1/2">
						<div className="relative">
							<label htmlFor="publicationDate" className="leading-7 text-sm text-gray-600">
								Publication Date
							</label>
							<input
								defaultValue={publicationDate}
								type="date"
								id="publicationDate"
								className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
								{...register('publicationDate')}
							/>
							{errors.publicationDate && (
								<p className="text-red-400">{errors.publicationDate.message}</p>
							)}
						</div>
					</div>
					<div className="p-2 w-full">
						<div className="relative">
							<label htmlFor="description" className="leading-7 text-sm text-gray-600">
								Description
							</label>
							<textarea
								id="description"
								className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
								defaultValue={bookDetails?.description || ''}
								{...register('description')}
							/>
							{errors.description && <p className="text-red-400">{errors.description.message}</p>}
						</div>
					</div>
					<div className="p-2 w-full">
						<button
							disabled={isLoading}
							type="submit"
							className="inline-flex w-auto disabled:bg-indigo-400 items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150"
						>
							{isLoading && (
								<svg
									className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									/>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									/>
								</svg>
							)}
							Update
						</button>
					</div>
					{isError && <Error message={(error as IErrorResponse).data?.message} />}
				</div>
			</form>
		</div>
	);
};

export default EditBookForm;
