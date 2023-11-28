import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { pageTitle } from "../../Functions/DynamicTitle";
import useAllTests from "../../hooks/useAllTests";
import useAxiosPublic from "../../hooks/useAxiosPublic";



const AllTests = () => {
    pageTitle("All Tests");
    const { register, reset, handleSubmit, formState: { errors } } = useForm();



    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTest, setSelectedTest] = useState(null);
    const [selectedId, setSelectedId] = useState('');

    const [allTests, refetch] = useAllTests()
    // console.log(allTests);
    const axiosPublic = useAxiosPublic()


    const handleDeleteTest = (_id) => {
        console.log(_id);
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this job?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axiosPublic.delete(`test/${_id}`)
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
    const handleOpenModal = (test) => {
        // console.log(user);

        setSelectedTest(test)
        setSelectedId(test._id)
        // console.log(selectedTest, selectedId);
        setIsModalOpen(true);


    };
    const handleCloseModal = () => {
        reset()
        setIsModalOpen(false);
    };
    const handleUpdate = async (data) => {
        console.log(data);
        try {
            const response = await axiosPublic.put(`/tests/${selectedId}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(response.data);

            if (response.data.modifiedCount > 0) {
                toast.success('Test Data Updated');
            }

            refetch();
        } catch (error) {
            console.error(error);
            toast.error("Error updating test");
        }

        handleCloseModal();
    };




    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th className="text-center">Test Name</th>
                        <th className="text-center">Test Date</th>
                        <th className="text-center">Available Slots</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allTests.map((test) => (
                        <tr key={test._id}>
                            <td className="text-center">{test.testName}</td>
                            <td className="text-center">{test.testDate}</td>
                            <td className="text-center">{test.availableSlots}</td>
                            <td className="flex items-center justify-center gap-1">
                                <div onClick={() => handleOpenModal(test)} className="btn btn-circle">
                                    <FontAwesomeIcon icon={faPenToSquare} size="xl" />
                                </div>
                                <div onClick={() => handleDeleteTest(test._id)} className="btn btn-circle">
                                    <FontAwesomeIcon icon={faTrash} size="lg" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Modal */}
            {isModalOpen && selectedTest && (
                <dialog id="my_modal_1" className="modal" open>
                    <form onSubmit={handleSubmit(handleUpdate)} className="relative bg-green-300 border-8 border-green-100 modal-box">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Test Image URL</label>
                            <input
                                type="text"
                                defaultValue={selectedTest.testImage}
                                className="w-full p-2 mt-1 border rounded-md"
                                {...register('testImage', { required: 'Test Image URL is required' })}
                            />
                            {errors.testImage && <p className="text-red-500">{errors.testImage.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Test Name</label>
                            <input
                                defaultValue={selectedTest.testName}
                                type="text"
                                className="w-full p-2 mt-1 border rounded-md"
                                {...register('testName', { required: 'Test Name is required' })}
                            />
                            {errors.testName && <p className="text-red-500">{errors.testName.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Test Date</label>
                            <input
                                defaultValue={selectedTest.testDate}
                                type="date"
                                className="w-full p-2 mt-1 border rounded-md"
                                {...register('testDate', { required: 'Test Date is required' })}
                            />
                            {errors.testDate && <p className="text-red-500">{errors.testDate.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Available Slots</label>
                            <input
                                defaultValue={selectedTest.availableSlots}
                                type="number"
                                className="w-full p-2 mt-1 border rounded-md"
                                {...register('availableSlots', { required: 'Available Slots is required' })}
                            />
                            {errors.availableSlots && <p className="text-red-500">{errors.availableSlots.message}</p>}
                        </div>



                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Test Description</label>
                            <textarea
                                defaultValue={selectedTest.testDescription}
                                rows="2"
                                className="w-full p-2 mt-1 border rounded-md"
                                {...register('testDescription', { required: 'Test Description is required' })}
                            ></textarea>
                            {errors.testDescription && <p className="text-red-500">{errors.testDescription.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-6">
                            <div className="text-white uppercase bg-red-500 border-0 hover:bg-red-600 btn btn-block" onClick={handleCloseModal}>
                                close
                            </div>
                            <button className="text-white uppercase bg-green-500 border-0 hover:bg-green-600 btn btn-block" >
                                Update Test
                            </button>
                        </div>
                    </form>
                </dialog>
            )
            }
        </div>
    );
};

export default AllTests;
