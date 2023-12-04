import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { pageTitle } from '../../Functions/DynamicTitle';
import useAllUsers from '../../hooks/useAllUsers';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const AllUsers = () => {
    pageTitle("All Users")

    const [usersData, refetch] = useAllUsers()
    // console.log(usersData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedUserType, setSelectedUserType] = useState('');
    const [selectedId, setSelectedId] = useState('');
    // console.log(selectedUserType);
    const axiosPublic = useAxiosPublic()

    const handleOpenModal = (user) => {
        setIsModalOpen(true);
        // console.log(user);
        setSelectedUser(user)
        setSelectedStatus(user.status);
        setSelectedUserType(user.userType)
        setSelectedId(user._id)

    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleUpdate = () => {
        try {
            axiosPublic.patch(`/user/${selectedId}`, { selectedStatus, selectedUserType })
                .then((response) => {
                    // Handle success
                    console.log(response.data);
                    if (response.data.modifiedCount > 0) {
                        toast.success('User Info Updated')
                    }
                    refetch()
                })
                .catch((error) => {
                    // Handle error
                    console.error(error);
                });
        }
        catch (error) {
            console.log(error);
            toast.error("error")
        }
        handleCloseModal();

    }

    return (
        <div>
            <div className="overflow-x-auto ">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            usersData.map(user => (
                                <tr key={user._id}>

                                    <td>
                                        <div className="flex items-center gap-3">

                                            <div>
                                                <div className="font-bold">{user.name}</div>

                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {user.email}

                                    </td>
                                    <th>
                                        <button onClick={() => handleOpenModal(user)} className="btn btn-circle">
                                            <FontAwesomeIcon icon={faCircleInfo} size='2xl' />
                                        </button>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {isModalOpen && selectedUser && (
                <dialog id="my_modal_1" className="modal" open>
                    <form className="relative bg-green-300 border-8 border-green-100 modal-box">
                        <div>
                            <div className="mb-4">
                                <label className="font-medium text-gray-600">
                                    Name:
                                </label>
                                <input
                                    type="text"

                                    defaultValue={selectedUser.name}
                                    className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400 input-disabled" disabled

                                />
                            </div>
                            <div className="mb-4">
                                <label className="font-medium text-gray-600">
                                    Blood Group
                                </label>
                                <input

                                    defaultValue={selectedUser.bloodGroup}

                                    className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none input- focus:border-green-400 input-disabled" disabled

                                />
                            </div>
                            <div className="mb-4">
                                <label className="font-medium text-gray-600">
                                    District:
                                </label>
                                <input
                                    type="text"

                                    defaultValue={selectedUser.district}
                                    className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400 input-disabled" disabled

                                />
                            </div>
                            <div className="mb-4">
                                <label className="font-medium text-gray-600">
                                    District:
                                </label>
                                <input
                                    type="text"

                                    defaultValue={selectedUser.upazila}
                                    className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400 input-disabled" disabled

                                />
                            </div>
                            <div className="mb-4">
                                <label className="font-medium text-gray-600">
                                    Status:
                                </label>
                                <div className="grid grid-cols-2 gap-3 mt-2">
                                    <div
                                        className={`btn hover:bg-green-600 text-black uppercase border-0 ${selectedStatus === 'active' ? 'bg-green-500 text-white' : ' '}`}
                                        onClick={() => setSelectedStatus('active')}
                                    >
                                        Active
                                    </div>
                                    <div
                                        className={`btn text-black uppercase border-0 hover:bg-red-600 ${selectedStatus === 'blocked' ? 'bg-red-500 text-white' : 'border-0 '}`}
                                        onClick={() => setSelectedStatus('blocked')}
                                    >
                                        Blocked
                                    </div>
                                </div>


                            </div>
                            <div className="mb-4">
                                <label className="font-medium text-gray-600">
                                    Role:
                                </label>
                                <div className="grid grid-cols-2 gap-3 mt-2">
                                    <div
                                        className={`btn hover:bg-green-600 text-black uppercase border-0 ${selectedUserType === 'admin' ? 'bg-green-500 text-white' : ' '}`}
                                        onClick={() => setSelectedUserType('admin')}
                                    >
                                        admin
                                    </div>
                                    <div
                                        className={`btn text-black uppercase border-0 hover:bg-red-600 ${selectedUserType === 'user' ? 'bg-red-500 text-white' : 'border-0 '}`}
                                        onClick={() => setSelectedUserType('user')}
                                    >
                                        User
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className='my-2 divider'></div>
                        <div className="grid grid-cols-2 gap-3 pt-4 ">
                            <div
                                className="w-full h-full text-lg font-semibold transition-all duration-200 ease-in-out border-0 btn rounded-xl focus:shadow hover:bg-green-800 hover:text-white"
                                onClick={handleCloseModal}
                            >
                                Close
                            </div>
                            <div

                                className="w-full h-full text-lg font-semibold transition-all duration-200 ease-in-out border-0 btn rounded-xl focus:shadow hover:bg-green-800 hover:text-white"
                                onClick={handleUpdate}
                            >
                                Update

                            </div>
                        </div>
                    </form>
                </dialog>
            )
            }

        </div >
    );
};

export default AllUsers;