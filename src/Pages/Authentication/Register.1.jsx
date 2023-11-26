import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { pageTitle } from '../../Functions/DynamicTitle';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { imgHostingUrl } from './Register';

export const Register = () => {
    pageTitle('Sign Up');

    const { registerUser, updateProfileInfo, setPhotoURL, user } = useContext(AuthContext);
    console.log(user);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [avatarURL, setAvatarURL] = useState(null);
    const [loading, setLoading] = useState(false);

    const axiosPublic = useAxiosPublic();

    const onSubmit = async (data) => {
        const { name, email, password, photoURL } = data;

        try {
            // Register the user
            const response = await registerUser(email, password);
            console.log(response.user);
            toast.success("Registration Successful");

            // Upload the image after successful registration
            let updatedPhotoURL = null;
            if (response && response.user) {
                const imageFile = { image: photoURL[0] };
                const res = await axiosPublic.post(imgHostingUrl, imageFile, {
                    headers: {
                        "content-type": "multipart/form-data"
                    }
                });
                console.log(res.data.data.display_url);
                updatedPhotoURL = res.data.data.display_url;
            }

            // Update user profile information if image upload was successful
            if (updatedPhotoURL) {
                await updateProfileInfo(name, updatedPhotoURL);
                setPhotoURL(updatedPhotoURL);
                toast.success("Profile Updated Successfully");
            } else {
                toast.error("Image upload failed. Profile update aborted.");
            }

            // Handle navigation or further actions if needed
            // Example: navigate("/");
        } catch (err) {
            if (err.message === "Firebase: Error (auth/email-already-in-use).") {
                toast.error("This email is already used.");
            }
            // Handle other errors as needed
        }


    };
    if (loading) {
        return <div>Loading</div>;
    }
    return (
        <div className="w-full min-h-screen hero">
            <div className="flex-col w-full hero-content lg:flex-row">
                <div className="flex-shrink-0 w-full shadow-2xl card bg-base-100 lg:w-1/2">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-1 card-body">
                        <h1 className="text-5xl font-bold text-center">Sign Up Now!</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="font-semibold label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Your Name" className="input input-bordered" {...register('name', { required: true })} />
                            {errors.name && <span className="error">Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="font-semibold label-text">Photo URL</span>
                            </label>
                            <input type="file" className="" {...register('photoURL', { required: true })} />
                            {errors.photoURL && <span className="error">Photo URL is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="font-semibold label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Your Email" className="input input-bordered" {...register('email', { required: true })} />
                            {errors.email && <span className="error">Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="font-semibold label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Your Password" className="input input-bordered" {...register('password', { required: true })} />
                            {errors.password && <span className="error">Password is required</span>}
                            <div className="mt-6 form-control">
                                <button className="btn btn-accent">Sign Up</button>
                            </div>
                            <p className="my-4">
                                Already have an account?{' '}
                                <Link to={'/login'} href="#" className="underline text-primary underline-offset-4 link-hover">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
