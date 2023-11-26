import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <>
            <main className="grid min-h-full px-6 py-24 bg-white place-items-center sm:py-32 lg:px-8">
                <div className="flex flex-col items-center justify-center text-center">
                    <img className='h-64' src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7968.jpg?w=1060&t=st=1699536538~exp=1699537138~hmac=bc92f8877b06cf7c3d20900f120fcb2032d6d86ff03b2c5d1967b965fcfb5a99" alt="" />
                    <img src="" alt="" />
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
                    <div className="flex items-center justify-center mt-10 gap-x-6">
                        <Link
                            to='/'
                            className="font-bold text-black shadow-sm btn btn-accent "
                        >
                            Go back Home
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ErrorPage;
