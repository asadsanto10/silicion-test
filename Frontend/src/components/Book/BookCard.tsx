import { Link, useNavigate } from 'react-router-dom';
import { IBook } from '../../types/interface';

interface Iprops {
	book: IBook;
}

const BookCard = ({ book }: Iprops) => {
	const navigate = useNavigate();
	const handelDetails = () => {
		navigate(`/book-details/${book.id}`);
	};
	return (
		<div className="py-8 flex flex-wrap md:flex-nowrap">
			<div className="md:flex-grow">
				<Link to={`/book-details/${book.id}`}>
					<h2 className="text-2xl font-medium text-gray-900 title-font">{book.title}</h2>
				</Link>

				<span className="text-gray-400 text-sm mb-2">{book.author}</span>
				<p className="leading-relaxed">{book.description}</p>
				<button
					onClick={handelDetails}
					type="button"
					className="text-indigo-500 cursor-pointer inline-flex items-center mt-4"
				>
					Learn More
					<svg
						className="w-4 h-4 ml-2"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M5 12h14" />
						<path d="M12 5l7 7-7 7" />
					</svg>
				</button>
			</div>
		</div>
	);
};

export default BookCard;
