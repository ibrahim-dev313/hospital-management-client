import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { pageTitle } from '../../Functions/DynamicTitle';
import { AuthContext } from '../../Providers/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const apiKey = "0ba87e91e7fbba273fe1b44a2122ae93";
const imgHostingUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const Register = () => {
    pageTitle('Register');
    const navigate = useNavigate();

    const { registerUser, updateProfileInfo, setPhotoURL } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const { register, handleSubmit, watch, setError, formState: { errors } } = useForm();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [loading, setLoading] = useState(false);

    const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

    useEffect(() => {
        fetch('districts.json')
            .then(res => res.json())
            .then(data => setDistricts(data));
    }, []);

    useEffect(() => {
        fetch('upazilas.json')
            .then(res => res.json())
            .then(data => setUpazilas(data));
    }, []);

    const onSubmit = async (data) => {
        const { name, email, password, confirmPassword, photoURL, bloodGroup, district, upazila } = data;

        // Check if passwords match
        if (password !== confirmPassword) {
            setError('confirmPassword', {
                type: 'manual',
                message: 'Passwords do not match',
            });
            return;
        }

        // Validate password requirements
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

        if (!passwordRegex.test(password)) {
            setError('password', {
                type: 'manual',
                message: 'Password must be at least 6 characters, contain at least one capital letter, and one number.',
            });
            return;
        }

        const userData = {
            name: name,
            email: email,
            bloodGroup: bloodGroup,
            district: district,
            upazila: upazila,
            status: 'active',
            userType: 'user',
        };

        try {
            setLoading(true);
            const response = await registerUser(email, password);
            toast.success("Registration Successful");

            let updatedPhotoURL = null;
            if (response && response.user) {
                const imageFile = { image: photoURL[0] };
                const res = await axiosPublic.post(imgHostingUrl, imageFile, {
                    headers: {
                        "content-type": "multipart/form-data",
                    },
                });
                updatedPhotoURL = res.data.data.display_url;
            }

            if (updatedPhotoURL) {
                await updateProfileInfo(name, updatedPhotoURL);
                setPhotoURL(updatedPhotoURL);
                const userResponse = await axiosPublic.post('/users', userData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (userResponse.data.insertedId) {
                    console.log(userResponse.data);
                }
                setLoading(false);
            } else {
                toast.error("Image upload failed. Profile update aborted.");
            }

            navigate("/");

        } catch (err) {
            if (err.message === "Firebase: Error (auth/email-already-in-use).") {
                toast.error("This email is already used.");
            }
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen hero">
            {loading ?
                <span className="loading loading-spinner loading-lg"> loading</span>
                :
                <div className="flex-col w-full hero-content lg:flex-row">
                    <div className="flex-shrink-0 w-full shadow-2xl card bg-base-100 lg:w-1/2">
                        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-1 card-body">
                            <h1 className="text-5xl font-bold text-center">Sign Up Now!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="font-semibold label-text">Email</span>
                                </label>
                                <input type="email" placeholder="Your Email" className="input input-bordered" {...register('email', { required: true })} />
                                {errors.email && <span className=" text-error">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="font-semibold label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Your Name" className="input input-bordered" {...register('name', { required: true })} />
                                {errors.name && <span className=" text-error">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="font-semibold label-text">Photo</span>
                                </label>
                                <input type="file" accept="image/x-png,image/gif,image/jpeg,image/png,image/jpg" className="w-full max-w-lg file-input file-input-bordered" {...register('photoURL', { required: true })} />
                                {errors.photoURL && <span className=" text-error">Photo URL is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="font-semibold label-text">Blood Group</span>
                                </label>
                                <select defaultValue={'default'} name="" {...register('bloodGroup', { required: true })} className='w-full select select-bordered'>
                                    <option disabled value="default">Select Blood Group</option>
                                    {bloodGroupOptions.map((group, index) => (
                                        <option key={index} value={group}>{group}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="font-semibold label-text">District</span>
                                </label>
                                <select defaultValue={'default'} {...register('district', { required: true })} className='w-full select select-bordered'>
                                    <option disabled value="default">Select District</option>
                                    {districts.map((district) => (
                                        <option key={district.id} value={district.name}>{district.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="font-semibold label-text">Upazila</span>
                                </label>
                                <select defaultValue={'default'} {...register('upazila', { required: true })} className='w-full select select-bordered'>
                                    <option disabled value="default">Select District</option>
                                    {upazilas.map((upazila) => (
                                        <option key={upazila.id} value={upazila.name}>{upazila.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="font-semibold label-text">Password</span>
                                </label>
                                <input type="password" placeholder="Your Password" className="input input-bordered" {...register('password', { required: true })} />
                                {errors.password && <span className=" text-error">{errors.password.message}</span>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="font-semibold label-text">Confirm Password</span>
                                </label>
                                <input type="password" placeholder="Confirm Password" className="input input-bordered" {...register('confirmPassword', { required: true })} />
                                {errors.confirmPassword && <span className=" text-error">{errors.confirmPassword.message}</span>}
                            </div>

                            <div className="mt-6 form-control">
                                <button className="btn btn-accent">Sign Up</button>
                            </div>
                            <p className="my-4">
                                Already have an account?{' '}
                                <Link to={'/login'} className="underline text-primary underline-offset-4 link-hover">
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            }
        </div>
    );
};

export default Register;
