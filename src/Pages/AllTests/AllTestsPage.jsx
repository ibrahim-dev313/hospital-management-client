import React, { useState } from 'react';
import useAllTests from '../../hooks/useAllTests';
import TestCard from './TestCard';

const AllTestsPage = () => {
    const [allTests] = useAllTests();
    const currentDate = new Date();
    const [searchDate, setSearchDate] = useState('');

    // Filter tests based on testDate being in the future and matching the searchDate
    const filteredTests = allTests.filter(
        (test) =>
            new Date(test.testDate) > currentDate &&
            test.testDate.includes(searchDate)
    );

    const resetFilter = () => {
        setSearchDate('');
    };

    return (
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
                <div className="grid grid-cols-3 gap-4 px-6 mx-auto">
                    {filteredTests.map((test) => (
                        <TestCard key={test._id} test={test}></TestCard>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllTestsPage;
