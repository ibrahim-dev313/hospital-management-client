import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Loader from '../../Components/Loader';
import useAllTests from '../../hooks/useAllTests';
import TestCard from './TestCard';

const AllTestsPage = () => {
    const [allTests, , loading] = useAllTests();
    const currentDate = new Date();
    const [searchDate, setSearchDate] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const testsPerPage = 9; // Number of tests per page

    // Filter tests based on testDate being in the future and matching the searchDate
    const filteredTests = allTests.filter(
        (test) =>
            new Date(test.testDate) > currentDate &&
            test.testDate.includes(searchDate)
    );

    const resetFilter = () => {
        setSearchDate('');
    };

    // Logic for displaying current tests
    const indexOfLastTest = (currentPage + 1) * testsPerPage;
    const indexOfFirstTest = indexOfLastTest - testsPerPage;
    const currentTests = filteredTests.slice(indexOfFirstTest, indexOfLastTest);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <>
            {loading ? (
                <Loader></Loader>
            ) : (
                <div className="my-8">
                    <div className='flex justify-center'>
                        <div className="my-8 join">
                            <label htmlFor="searchDate" className="flex items-center px-3 pl-5 font-semibold border-2 rounded-l-full join-item">
                                Filter by Date:
                            </label>
                            <input
                                type="date"
                                id="searchDate"
                                value={searchDate}
                                onChange={(e) => setSearchDate(e.target.value)}
                                className="rounded-l-full input input-bordered join-item"

                            />
                            <button
                                onClick={resetFilter}
                                className="rounded-r-full btn join-item"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {filteredTests.length === 0 ? (
                        <p className="text-center text-gray-500">
                            No Tests Available for this date.
                        </p>
                    ) : (
                        <>
                            <div className="grid grid-cols-3 gap-4 px-6 mx-auto">
                                {currentTests.map((test) => (
                                    <TestCard key={test._id} test={test}></TestCard>
                                ))}
                            </div>
                            <div className='divider'></div>
                            <ReactPaginate
                                previousLabel={'Previous'}
                                nextLabel={'Next'}
                                breakLabel={'...'}
                                pageCount={Math.ceil(filteredTests.length / testsPerPage)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination flex justify-center mt-4'}
                                activeClassName={'bg-green-500 rounded-full text-white border-blue-500'}
                                pageClassName={' border cursor-pointer mx-1 rounded-full'}
                                pageLinkClassName={'px-3 py-2 block'}
                                previousClassName={'btn bg-white border cursor-pointer mx-1 rounded-full'}
                                previousLinkClassName={'px-3 py-2 block'}
                                nextClassName={'bg-white rounded-full btn border cursor-pointer mx-1'}
                                nextLinkClassName={'px-3 py-2 block'}
                                breakClassName={'bg-white border cursor-pointer mx-1'}
                                breakLinkClassName={'px-3 py-2 block'}
                            />
                            <div className='divider'></div>

                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default AllTestsPage;
