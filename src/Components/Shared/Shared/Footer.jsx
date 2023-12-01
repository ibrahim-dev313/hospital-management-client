import { faLinkedin, faSquareFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faMapMarker, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
    return (
        <>
            <footer className="p-10 shadow-xl bg-green-50 rounded-t-xl footer footer-center text-base-content">

                <nav>
                    <div className="flex items-center justify-center gap-3 text-2xl font-bold">
                        Al Shifa Diagnostics
                    </div>
                </nav>
                <div className="grid grid-flow-row gap-3 text-xl font-">
                    <div className='flex items-center justify-center gap-2'>
                        <FontAwesomeIcon icon={faMapMarker} />
                        <span>Gulshan Avenue, Dhaka</span>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <FontAwesomeIcon icon={faPhone} />
                        <span>+880 1796 500899</span>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <span>info@alshifa.org</span>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                    <a href="#" className="link link-hover">
                        <FontAwesomeIcon icon={faSquareFacebook} size='2xl' />
                    </a>
                    <a href="#" className="link link-hover">
                        <FontAwesomeIcon icon={faTwitter} size='2xl' />
                    </a>
                    <a href="#" className="link link-hover">
                        <FontAwesomeIcon icon={faLinkedin} size='2xl' />
                    </a>
                </div>
                <aside>
                    <p>Copyright © 2023 - All rights reserved by Al Shifa Diagnostics Ltd</p>
                </aside>
            </footer>
        </>
    );
};

export default Footer;
