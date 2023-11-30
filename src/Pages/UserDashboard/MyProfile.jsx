import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { pageTitle } from '../../Functions/DynamicTitle';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useProfile from '../../hooks/useProfile';
const apiKey = "0ba87e91e7fbba273fe1b44a2122ae93"
const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`



const MyProfile = () => {
    pageTitle('My Profile');
    const [userData, refetch, loading] = useProfile()
    const { _id, name, email, district, bloodGroup, upazila, status } = userData;
    const axiosPublic = useAxiosPublic()
    // console.log(userData);
    const [districts, setDistricts] = useState([])
    const [upazilas, setUpazilas] = useState([])

    const { user, updateProfileInfo, setPhotoURL } = useContext(AuthContext);
    const { register, handleSubmit, resetField, formState: { errors } } = useForm();
    const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];




    useEffect(() => {
        fetch('/districts.json')
            .then(res => res.json())
            .then(data => setDistricts(data))
    }, [])
    useEffect(() => {
        fetch('/upazilas.json')
            .then(res => res.json())
            .then(data => setUpazilas(data))

    }, [])
    const onSubmit = async (data) => {
        const { name, email, photoURL, bloodGroup, district, upazila } = data;
        const userData = {
            name: name,
            email: email,
            bloodGroup: bloodGroup,
            district: district,
            upazila: upazila,
            status: 'active'
        };

        if (photoURL[0]) {
            try {
                const imageFile = { image: photoURL[0] };
                const res = await axiosPublic.post(imgHostingUrl, imageFile, {
                    headers: {
                        "content-type": "multipart/form-data"
                    }
                });
                const updatedPhotoURL = res.data.data.display_url;

                await updateProfileInfo(name, updatedPhotoURL);
                setPhotoURL(updatedPhotoURL);
                userData.photoURL = updatedPhotoURL; // Add the photoURL to userData

                const userResponse = await axiosPublic.put(`/users/${_id}`, userData, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (userResponse.data.insertedId) {
                    // toast.success('user added to database')
                    console.log(userResponse);
                }
                toast.success("Profile Updated Successfully");
                resetField('photoURL')
                refetch();
            } catch (error) {
                toast.error("Image upload failed. Profile update aborted.");
                console.error('Error uploading image:', error);
            }
        } else {
            // If no image file is selected, update other info without image
            try {
                const userResponse = await axiosPublic.put(`/users/${_id}`, userData, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });


                if (userResponse.data.insertedId) {
                    // toast.success('user added to database')
                }
                toast.success("Profile Updated Successfully");
                // reset()
                refetch();
            } catch (error) {
                toast.error("Profile update failed.");
                console.error('Error updating profile info:', error);
            }
        }
    };

    return (
        <>
            {
                loading ? <div className='flex flex-col items-center justify-center min-h-screen gap-9'>
                    <span className="flex items-center justify-center w-32 text-green-800 loading loading-bars "></span>

                </div> :
                    <div className="flex items-center justify-center w-full min-h-screen ">
                        <div className="w-full max-w-xl p-4 bg-white border-4 shadow-xl rounded-xl">
                            <h1 className="mb-4 text-3xl font-bold">My Profile</h1>
                            <div className='flex justify-center avatar'>
                                <div className="rounded-full w-36">
                                    <img className='rounded-full' src={user.photoURL} alt="" />
                                </div>
                            </div>
                            <div className="flex items-center justify-center mt-6 font-bold">
                                <h2 className="ml-1 mr-2 uppercase">Status: {status}</h2>
                                <div className={`w-3 h-3 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="font-semibold label-text">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="input input-bordered"
                                        {...register('name', { required: true })}
                                        defaultValue={name}
                                    />
                                    {errors.name && <span className="text-error">Name is required</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="font-semibold label-text">Blood Group</span>
                                    </label>
                                    <select defaultValue={bloodGroup} name="" {...register('bloodGroup', { required: true })} className='w-full select select-bordered'>
                                        <option disabled value="default">Select Blood Group</option>
                                        {bloodGroupOptions.map((group, index) => (
                                            <option key={index} value={group}>{group}</option>
                                        ))}
                                    </select>

                                    {errors.bloodGroup && <span className="text-error">Blood Group is required</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="font-semibold label-text">District</span>
                                    </label>
                                    <select defaultValue={district} {...register('district', { required: true })} className='w-full select select-bordered'>
                                        <option disabled value="default">Select District</option>
                                        {
                                            districts.map(district => <option key={district.id} value={district.name}>{district.name}</option>)
                                        }
                                    </select>
                                    {errors.district && <span className="text-error">District is required</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="font-semibold label-text">Upazila</span>
                                    </label>
                                    <select defaultValue={upazila} {...register('upazila', { required: true })} className='w-full select select-bordered'>
                                        <option disabled value="default">Select District</option>
                                        {
                                            upazilas.map(upazila => <option key={upazila.id} value={upazila.name}>{upazila.name}</option>)
                                        }
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="font-semibold label-text">Photo</span>
                                    </label>
                                    <input type="file" accept="image/x-png,image/gif,image/jpeg,image/png,image/jpg" className="w-full max-w-lg file-input file-input-bordered" {...register('photoURL', {})} />
                                    {errors.photoURL && <span className=" text-error">Photo URL is required</span>}
                                </div>

                                <div className="form-control">
                                    <button type="submit" className="btn btn-accent">
                                        Update Profile
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
            }
        </>

    );
};

export default MyProfile;
