import { useEffect, useState } from 'react';
import useAllTests from '../../hooks/useAllTests';

const FeaturedTestCard = () => {
    const [mostBookedTests, setMostBookedTests] = useState([]);
    const [allTests] = useAllTests();

    useEffect(() => {
        if (allTests.length > 0) {
            // Find the maximum totalBooking value
            const maxTotalBooking = Math.max(...allTests.map(test => test.totalBooking));
            // Find all tests with the maximum totalBooking value
            const mostBookedTestsArray = allTests.filter(test => test.totalBooking === maxTotalBooking);
            console.log(maxTotalBooking, mostBookedTestsArray);

            setMostBookedTests(mostBookedTestsArray);
        }
    }, [allTests]);

    return (
        <div className="shadow-xl card w-96 bg-base-100">
            {mostBookedTests.length > 0 ? (
                mostBookedTests.map(test => (
                    <div key={test._id}>
                        <figure>
                            <img src={test.testImage} alt={test.testName} />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{test.testName}</h2>
                            <p>{test.testDescription}</p>
                            <div className="justify-end card-actions">
                                <button className="btn btn-primary">Book Now</button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default FeaturedTestCard;
