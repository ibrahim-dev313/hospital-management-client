import { useEffect, useState } from 'react';
import useAllReservations from '../../hooks/useAllReservations';
import useProfile from '../../hooks/useProfile';

const TestResults = () => {
    const [reservations, , loading] = useAllReservations();
    const [filteredReservations, setFilteredReservations] = useState([]);
    const [userData] = useProfile();
    console.log(filteredReservations);

    useEffect(() => {
        if (reservations) {
            // Filter reservations based on the provided email and reportStatus
            const filtered = reservations.filter(
                reservation =>
                    reservation.patientEmail.toLowerCase() === userData.email.toLowerCase() &&
                    reservation.reportStatus === 'delivered'
            );
            setFilteredReservations(filtered);
        }
    }, [reservations, userData.email]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1 className='mb-5 text-2xl font-bold'>Test Results</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Test Name</th>
                        <th>Test Date</th>
                        <th className=''>Download Report</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReservations.map(result => (
                        <tr key={result._id}>
                            <td>{result.testName}</td>
                            <td>{result.testDate}</td>
                            <td>
                                <a className='btn btn-sm'
                                    href={`${result.report}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download={`test_report_${result._id}.pdf`}
                                >
                                    Download Report
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TestResults;
