import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { pageTitle } from '../../Functions/DynamicTitle';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const AddBanner = () => {
    pageTitle("Add Banner")

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic()
    const onSubmit = async (data) => {
        // Handle form submission here
        console.log(data);
        const bannerData = {
            bannerName: data.bannerName,
            bannerTitle: data.bannerTitle,
            bannerImage: data.bannerImage,
            bannerDescription: data.bannerDescription,
            couponCode: data.couponCode,
            couponRate: data.couponRate,
            isActive: false

        }
        try {
            const response = await axiosPublic.post("/banner", bannerData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            if (response.data.insertedId) {
                reset()
                toast.success('Banner added successfully')
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center w-full min-h-screen">
            <div className="w-full p-8 bg-white rounded-md shadow-md max-w-fullxl">
                <h2 className="mb-4 text-2xl font-bold">Add New Banner</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Banner Image URL</label>
                        <input
                            type="text"
                            className="w-full p-2 mt-1 border rounded-md"
                            {...register('bannerImage', { required: 'Banner Image URL is required' })}
                        />
                        {errors.bannerImage && <p className="text-red-500">{errors.bannerImage.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Banner Name</label>
                        <input
                            type="text"
                            className="w-full p-2 mt-1 border rounded-md"
                            {...register('bannerName', { required: 'Banner Name is required' })}
                        />
                        {errors.bannerName && <p className="text-red-500">{errors.bannerName.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Banner Title</label>
                        <input
                            type="text"
                            className="w-full p-2 mt-1 border rounded-md"
                            {...register('bannerTitle', { required: 'Banner Title is required' })}
                        />
                        {errors.bannerTitle && <p className="text-red-500">{errors.bannerTitle.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Coupon Code</label>
                        <input
                            type="text"
                            className="w-full p-2 mt-1 border rounded-md"
                            {...register('couponCode', { required: 'Coupon Code is required' })}
                        />
                        {errors.couponCode && <p className="text-red-500">{errors.couponCode.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Coupon Rate</label>
                        <input
                            type="number"
                            className="w-full p-2 mt-1 border rounded-md"
                            {...register('couponRate', { required: 'Coupon Rate is required' })}
                        />
                        {errors.couponRate && <p className="text-red-500">{errors.couponRate.message}</p>}
                    </div>





                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Banner Description</label>
                        <textarea
                            rows="3"
                            className="w-full p-2 mt-1 border rounded-md"
                            {...register('bannerDescription', { required: 'Banner Description is required' })}
                        ></textarea>
                        {errors.bannerDescription && <p className="text-red-500">{errors.bannerDescription.message}</p>}
                    </div>

                    <div className="mt-6">
                        <button type="submit" className="px-4 py-2 font-semibold text-white uppercase bg-green-600 rounded-md hover:bg-green-700 btn-block">
                            Add Banner
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default AddBanner;
