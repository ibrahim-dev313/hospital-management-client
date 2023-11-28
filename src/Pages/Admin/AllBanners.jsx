import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import toast from "react-hot-toast";
import { pageTitle } from "../../Functions/DynamicTitle";
import useAllBanners from "../../hooks/useAllBanners";
import useAxiosPublic from "../../hooks/useAxiosPublic";



const AllBanners = () => {
    pageTitle("All Banners");
    const [allBanners, refetch] = useAllBanners()
    // console.log(allBanners);
    const axiosPublic = useAxiosPublic()
    const handleDeleteTest = (_id) => {
        console.log(_id);
        confirmAlert({
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this banner?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axiosPublic.delete(`banner/${_id}`)
                            .then((response) => {
                                console.log(response.data);

                                toast.success('Banner Deleted Successfully')
                                refetch()
                            })
                            .catch((error) => {
                                console.log(error);
                            });


                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    };
    const handleActivityToggle = async (bannerId) => {
        console.log(bannerId);

        const resetResponse = await axiosPublic.put('banners');
        console.log(resetResponse.data);

        // Then, turn on the selected banner
        const response = await axiosPublic.put(`/banners/${bannerId}`, { isActive: true });

        if (response.data.modifiedCount > 0) {
            toast.success('Banner Activated Successfully');
        } else {
            toast.error('Failed to Activate Banner');
        }

        refetch(); // Refresh the banner list

    };









    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th className="text-center">Banner Name</th>
                        <th className="text-center">Coupon Code</th>
                        <th className="text-center">Coupon Rate</th>
                        <th className="text-center">Banner Status</th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allBanners.map((banner) => (
                        <tr key={banner._id}>
                            <td className="text-center">{banner.bannerName}</td>
                            <td className="text-center">{banner.couponCode}</td>
                            <td className="text-center">{banner.couponRate}%</td>
                            <td className="text-center">{banner.isActive ? 'Active' : 'Inactive'}</td>
                            <td className="flex items-center justify-center gap-3">


                                <input
                                    type="checkbox"
                                    className={`toggle ${banner.isActive ? "toggle-success" : "toggle-warning"}`}
                                    checked={banner?.isActive}
                                    onChange={() => handleActivityToggle(banner._id)}
                                />


                                <div onClick={() => handleDeleteTest(banner._id)} className="btn btn-ghost btn-circle">
                                    <FontAwesomeIcon icon={faTrash} size="lg" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default AllBanners;
