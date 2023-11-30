import React from 'react';
import { Link } from 'react-router-dom';

const TestCard = ({ test }) => {
    // console.log(test);
    return (
        <div>
            <div className='rounded-xl'>
                <div className="shadow-xl rounded-xl card bg-base-100">

                    <figure className='relative w-full'>
                        <img className='w-full h-80' src={test.testImage} alt="Shoes" />
                        <p className='absolute top-0 right-0 m-3 font-bold btn-neutral btn btn-sm'>Slots Available {test.availableSlots}</p>
                    </figure>
                    <div className="bg-green-100 card-body rounded-b-xl">
                        <h2 className="text-center card-title">{test.testName}</h2>
                        <p className='font-semibold'>Test Date: {test.testDate}</p>
                        <div className="justify-center mt-3 card-actions">
                            <Link className='w-full' to={`/test/${test._id}`}>
                                <button className="font-bold uppercase bg-green-300 border-4 border-green-600 hover:border-green-800 btn hover:bg-green-400 hover:text-black-600 btn-block">
                                    Details
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
};

export default TestCard;