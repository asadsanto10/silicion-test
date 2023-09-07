/* eslint-disable jsx-a11y/no-static-element-interactions */
import { chnageDataPageWise } from '../../redux/features/book/bookPagination';
import { useAppDispatch, useAppSelector } from '../../redux/hook';

interface Iprops {
	totalBook: number;
}

const Pagination = ({ totalBook }: Iprops) => {
	const dispatch = useAppDispatch();

	const { dataPerPage, currentPage } = useAppSelector((state) => state.pagination);

	const pageNumbers = [];
	// eslint-disable-next-line no-plusplus
	for (let i = 1; i <= Math.ceil(totalBook / dataPerPage); i++) {
		pageNumbers.push(i);
	}

	const handelPageClick = (changeNumber: number) => {
		dispatch(chnageDataPageWise(changeNumber));
	};

	return (
		<nav aria-label="Page navigation example">
			<ul className="inline-flex -space-x-px text-base h-10">
				{pageNumbers &&
					pageNumbers.map((number) => (
						<li key={number}>
							<div
								onClick={() => handelPageClick(number)}
								className={`${
									currentPage === number ? 'text-gray-50 bg-indigo-600' : 'text-gray-500 bg-white'
								} flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 hover:bg-indigo-400 hover:text-gray-700 cursor-pointer`}
							>
								{number}
							</div>
						</li>
					))}
			</ul>
		</nav>
	);
};

export default Pagination;

// {
// 	/* <li>
// 				<a
// 					href="#"
// 					className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
// 				>
// 					2
// 				</a>
// 			</li>
// 			<li>
// 				<a
// 					href="#"
// 					aria-current="page"
// 					className="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
// 				>
// 					3
// 				</a>
// 			</li>
// 			<li>
// 				<a
// 					href="#"
// 					className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
// 				>
// 					4
// 				</a>
// 			</li>
// 			<li>
// 				<a
// 					href="#"
// 					className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
// 				>
// 					5
// 				</a>
// 			</li>
// 			<li>
// 				<a
// 					href="#"
// 					className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 "
// 				>
// 					Next
// 				</a>
// 			</li> */
// }
