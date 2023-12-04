import { faBuilding, faHeart, faHospital } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Map, Marker, Overlay } from 'pigeon-maps';
import { pageTitle } from '../../Functions/DynamicTitle';

const AboutUs = () => {
    pageTitle("About Us")

    const center = [23.8103, 90.4125]; // Replace with the latitude and longitude of Bashundhara R/A, Dhaka

    return (
        <div className="container p-8 mx-auto mt-12 bg-white rounded-lg shadow-md">
            <h1 className="mb-6 text-4xl font-bold">About Al Shifa Diagnostic Center</h1>
            <div className="flex flex-col">
                <div className="mb-4">
                    <img
                        src="https://thumbs.dreamstime.com/b/hospital-building-modern-parking-lot-59693686.jpg"  // Replace with your image URL
                        alt="Al Shifa Diagnostic Center"
                        className="w-full rounded-md"
                    />
                </div>
                <div>
                    <p className="mb-4 text-lg">
                        Welcome to Al Shifa Diagnostic Center, a leading healthcare facility in Bashundhara R/A, Dhaka. We are dedicated to providing exceptional diagnostic services with a focus on accuracy and care.
                    </p>
                    <p className="mb-4 text-lg">
                        <FontAwesomeIcon icon={faHospital} className="mr-2 text-indigo-500" />
                        Our state-of-the-art center is equipped with cutting-edge technology, ensuring accurate and timely results for a wide range of diagnostic tests.
                    </p>
                    <p className="mb-4 text-lg">
                        <FontAwesomeIcon icon={faHeart} className="mr-2 text-indigo-500" />
                        At Al Shifa Diagnostic Center, we are passionate about promoting health and well-being within our community. Our experienced team of healthcare professionals is committed to delivering personalized care with compassion and precision.
                    </p>
                    <p className="mb-4 text-lg">
                        <FontAwesomeIcon icon={faBuilding} className="mr-2 text-indigo-500" />
                        Located in Bashundhara R/A, Dhaka, our modern facility is designed to create a comfortable and welcoming environment for our patients.
                    </p>

                </div>

            </div>
            <div >
                <h1 className="mb-4 text-3xl font-bold">Find Us Here </h1>
                <Map center={center} zoom={14} height={300}>
                    <Marker anchor={center} payload={1} onClick={({ event, anchor, payload }) => { }} />
                    <Overlay anchor={center} offset={[120, 79]}>
                        <div>Al Shifa Diagnostic Center</div>
                    </Overlay>
                </Map>
            </div>
        </div >
    );
};

export default AboutUs;
