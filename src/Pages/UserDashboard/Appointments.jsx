import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import toast from "react-hot-toast";
import { pageTitle } from "../../Functions/DynamicTitle";

import Loader from "../../Components/Loader";
import useAllReservations from "../../hooks/useAllReservations";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useProfile from "../../hooks/useProfile";



const Appointment = () => {
    pageTitle("Appointments");
    const [allReservations, refetch, loading] = useAllReservations()
    // console.log(allReservations);
    const [userData] = useProfile()
    // const {patientEmail, patientName, reportStatus, testDate, testId, testName, _id}=allReservations
    const filtered = allReservations?.filter(data => data?.patientEmail == userData?.email)
    // console.log(filtered);
    const axiosPublic = useAxiosPublic()
    const handleDeleteTest = (_id) => {
        // console.log(_id);
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this appointment?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axiosPublic.delete(`reservation/${_id}`)
                            .then((response) => {
                                console.log(response.data);

                                toast.success('Test Deleted Successfully')
                                refetch()
                            })
                            .catch((error) => {
                                console.log(error);
                            });


                    }
                },
                {
                    label: 'No',
                    onClick: () => { } // Do nothing if the user clicks "No"
                }
            ]
        });
    };






    return (
        <>
            {
                loading ? <Loader></Loader> : <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-center">Test Name</th>
                                <th className="text-center">Test Date</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((test) => (
                                <tr key={test._id}>
                                    <td className="text-center">{test.testName}</td>
                                    <td className="text-center">{test.testDate}</td>
                                    <td className="flex items-center justify-center gap-1">

                                        <div onClick={() => handleDeleteTest(test._id)} className="font-bold text-red-600 uppercase btn">
                                            Cancel <FontAwesomeIcon icon={faXmark} size="2xl" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            }
        </>
    );
};

export default Appointment;
