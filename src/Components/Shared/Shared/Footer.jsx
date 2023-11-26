import { faLinkedin, faSquareFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faMapMarker, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Footer = () => {
    return (
        <>
            <footer className="p-10 shadow-xl rounded-t-xl footer footer-center bg-base-200 text-base-content">
                <nav className="grid grid-flow-col gap-4">
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <div className="flex items-center justify-center gap-3 text-2xl font-bold">
                        <img className="h-12" src="https://i.ibb.co/dj88QYw/20231106-225521-0000-removebg-preview.png" alt="" /> SpaceJobs
                    </div>
                </nav>
                <div className="grid grid-flow-row gap-3 text-xl font-">
                    <div className='flex items-center justify-center gap-2'>
                        <FontAwesomeIcon icon={faMapMarker} />
                        <span>123 Space Avenue, Cosmos City</span>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <FontAwesomeIcon icon={faPhone} />
                        <span>+123 456 7890</span>
                    </div>
                    <div className='flex items-center justify-center gap-2'>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <span>info@spacejobs.com</span>
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
                    <p>Copyright © 2023 - All rights reserved by Jobify Ltd</p>
                </aside>
            </footer>
        </>
    );
};

export default Footer;
