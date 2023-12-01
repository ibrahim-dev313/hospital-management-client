import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Loader from "../../Components/Loader";
import { pageTitle } from "../../Functions/DynamicTitle";
import useAllReservations from "../../hooks/useAllReservations";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Reservations = () => {
    pageTitle("All Tests");
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [selectedId, setSelectedId] = useState('');
    const [searchEmail, setSearchEmail] = useState('');

    const [allReservations, refetch, loading] = useAllReservations();
    const axiosPublic = useAxiosPublic();

    const handleDeleteReservation = (_id) => {
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this job?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axiosPublic.delete(`reservation/${_id}`)
                            .then((response) => {
                                toast.success('Test Deleted Successfully');
                                refetch();
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

    const handleOpenModal = (reservation) => {
        setSelectedTest(reservation);
        setSelectedId(reservation._id);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        reset();
        setIsModalOpen(false);
    };

    const handleUpdate = async (data) => {
        const reportData = {
            report: data.reportPdf,
            reportStatus: 'delivered'
        };

        try {
            const response = await axiosPublic.patch(`/reservation/${selectedId}`, reportData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.modifiedCount > 0) {
                toast.success('Report Delivered');
            }

            refetch();
        } catch (error) {
            console.error(error);
            toast.error("Error Delivering Report");
        }

        handleCloseModal();
    };

    const filteredReservations = allReservations.filter(reservation =>
        reservation.patientEmail.toLowerCase().includes(searchEmail.toLowerCase())
    );

    return (
        <>
            <h1 className="text-3xl font-bold text-center uppercase">Reservations</h1>
            <div className="grid grid-cols-5 p-2 m-5 border-4 border-green-600 rounded-full bg-green-50">
                <div className="flex items-center justify-center col-span-1 text-xl font-bold "><h2>Filter By Email</h2></div>
                <input
                    type="text"
                    id="searchEmail"
                    name="searchEmail"
                    className="w-full col-span-4 bg-white border-green-900 rounded-full input input-bordered"
                    placeholder="Type Patient Email To Filter"
                    onChange={(e) => setSearchEmail(e.target.value)}
                />
            </div>


            {loading ? (
                <Loader></Loader>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-center">Test Name</th>
                                <th className="text-center">Patient Email</th>
                                <th className="text-center">Test Date</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReservations.map((reservation) => (
                                <tr key={reservation._id}>
                                    <td className="text-center">{reservation.testName}</td>
                                    <td className="text-center">{reservation.patientEmail}</td>
                                    <td className="text-center">{reservation.testDate}</td>
                                    <td className="flex items-center justify-center gap-1">
                                        <div
                                            onClick={() => handleDeleteReservation(reservation._id)}
                                            className="font-bold text-red-600 uppercase btn"
                                        >
                                            Cancel <FontAwesomeIcon icon={faXmark} size="2xl" />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
};

export default Reservations;
