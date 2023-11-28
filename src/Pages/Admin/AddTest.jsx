import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const AddTest = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic()
    const onSubmit = async (data) => {
        // Handle form submission here
        try {
            const response = await axiosPublic.post("/test", data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response.data);
            if (response.data.insertedId) {
                toast.success('Test added successfully')
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center w-full min-h-screen">
            <div className="w-full p-8 bg-white rounded-md shadow-md max-w-fullxl">
                <h2 className="mb-4 text-2xl font-bold">Add New Test</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Test Image URL</label>
                        <input
                            type="text"
                            className="w-full p-2 mt-1 border rounded-md"
                            {...register('testImage', { required: 'Test Image URL is required' })}
                        />
                        {errors.testImage && <p className="text-red-500">{errors.testImage.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Test Name</label>
                        <input
                            type="text"
                            className="w-full p-2 mt-1 border rounded-md"
                            {...register('testName', { required: 'Test Name is required' })}
                        />
                        {errors.testName && <p className="text-red-500">{errors.testName.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Test Date</label>
                        <input
                            type="date"
                            className="w-full p-2 mt-1 border rounded-md"
                            {...register('testDate', { required: 'Test Date is required' })}
                        />
                        {errors.testDate && <p className="text-red-500">{errors.testDate.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Available Slots</label>
                        <input
                            type="number"
                            className="w-full p-2 mt-1 border rounded-md"
                            {...register('availableSlots', { required: 'Available Slots is required' })}
                        />
                        {errors.availableSlots && <p className="text-red-500">{errors.availableSlots.message}</p>}
                    </div>



                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">Test Description</label>
                        <textarea
                            rows="3"
                            className="w-full p-2 mt-1 border rounded-md"
                            {...register('testDescription', { required: 'Test Description is required' })}
                        ></textarea>
                        {errors.testDescription && <p className="text-red-500">{errors.testDescription.message}</p>}
                    </div>

                    <div className="mt-6">
                        <button type="submit" className="font-bold text-white uppercase bg-green-600 rounded-md hover:bg-green-700 btn btn-block">
                            Add Test
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default AddTest;
