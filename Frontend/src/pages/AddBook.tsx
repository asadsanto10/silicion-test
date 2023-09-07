import AddBookForm from '../components/Book/AddBookForm';

/* eslint-disable jsx-a11y/label-has-associated-control */
const AddBook = () => {
	return (
		<section className="text-gray-600 body-font relative">
			<div className="container px-5 py-24 mx-auto">
				<div className="flex flex-col text-center w-full mb-12">
					<h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
						Add New Book
					</h1>
				</div>
				<div className="lg:w-1/2 md:w-2/3 mx-auto">
					<AddBookForm />
				</div>
			</div>
		</section>
	);
};

export default AddBook;
