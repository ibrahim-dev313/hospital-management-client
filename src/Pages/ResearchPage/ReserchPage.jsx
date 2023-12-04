import { faAtom, faBrain, faCode, faDna, faFlask, faGlobe, faHeart, faMicroscope, faNetworkWired, faRobot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { pageTitle } from '../../Functions/DynamicTitle';

const ResearchPage = () => {
    pageTitle("Our Research")

    const projects = [
        {
            id: 1,
            title: 'Advanced Diagnostic Imaging Techniques',
            description: 'This project focuses on exploring and advancing cutting-edge diagnostic imaging technologies, such as high-resolution MRI and advanced CT scans. The goal is to enhance diagnostic accuracy and efficiency in detecting a wide range of medical conditions, from neurological disorders to cardiovascular issues.',
            researchers: ['Dr. Maria Rodriguez', 'Dr. James Smith'],
            icon: faMicroscope,
        },
        {
            id: 2,
            title: 'Smart Healthcare Solutions',
            description: 'Developing innovative solutions for smart healthcare, this project integrates Internet of Things (IoT) and artificial intelligence (AI) to improve patient care and monitoring. The research explores the use of wearable devices, remote monitoring systems, and AI-driven analytics to enhance healthcare delivery.',
            researchers: ['Dr. Emily Williams', 'Dr. Michael Anderson'],
            icon: faRobot,
        },
        {
            id: 3,
            title: 'Genomic Medicine Research',
            description: 'In the Genomic Medicine Research project, our team delves into the complexities of the human genome. By analyzing genetic data, we aim to advance personalized medicine and treatment strategies, leading to more targeted and effective healthcare interventions.',
            researchers: ['Dr. Sarah Johnson', 'Dr. Robert Brown'],
            icon: faDna,
        },
        {
            id: 4,
            title: 'Neuroscience Advancements',
            description: 'This project investigates the intricacies of the human brain, aiming to unravel mysteries related to neurological disorders. Our research focuses on developing new interventions and treatment modalities for conditions such as Alzheimer\'s disease, Parkinson\'s disease, and other neurological challenges.',
            researchers: ['Dr. William Thompson', 'Dr. Linda Davis'],
            icon: faBrain,
        },
        {
            id: 5,
            title: 'Cardiovascular Health Innovations',
            description: 'Pioneering research in cardiovascular health, this project explores novel treatments and preventive measures for heart-related conditions. Our team investigates the latest advancements in cardiology, including innovative therapies and diagnostic techniques for better patient outcomes.',
            researchers: ['Dr. Mark Davis', 'Dr. Laura Turner'],
            icon: faHeart,
        },
        {
            id: 6,
            title: 'Nanotechnology Applications in Medicine',
            description: 'The Nanotechnology Applications in Medicine project focuses on leveraging nanotechnology for targeted drug delivery and medical diagnostics. By exploring the potential of nanoscale materials, we aim to revolutionize medical treatments, making them more precise and effective.',
            researchers: ['Dr. John Miller', 'Dr. Emma Turner'],
            icon: faAtom,
        },
        {
            id: 7,
            title: 'Artificial Intelligence in Medical Imaging',
            description: 'Harnessing the power of artificial intelligence, this project aims to revolutionize medical imaging analysis. By implementing advanced AI algorithms, we seek to enhance the accuracy and efficiency of interpreting medical images, leading to faster and more reliable diagnoses.',
            researchers: ['Dr. Christopher White', 'Dr. Sophia Martin'],
            icon: faCode,
        },
        {
            id: 8,
            title: 'Telemedicine and Remote Healthcare',
            description: 'Investigating the effectiveness of telemedicine, this project explores remote patient monitoring and healthcare delivery. Our research aims to understand the impact of telehealth on patient outcomes, accessibility, and the overall quality of healthcare services provided remotely.',
            researchers: ['Dr. Rebecca Hall', 'Dr. Alex Johnson'],
            icon: faNetworkWired,
        },
        {
            id: 9,
            title: 'Global Health Initiatives',
            description: 'Collaborating on global health projects, our team addresses healthcare disparities and works towards improving access to medical resources worldwide. This initiative involves partnerships with international organizations to implement sustainable healthcare solutions in underserved communities.',
            researchers: ['Dr. Olivia Garcia', 'Dr. Richard Lee'],
            icon: faGlobe,
        },
        {
            id: 10,
            title: 'Innovation in Biomedical Engineering',
            description: 'Advancing biomedical engineering, this project focuses on creating novel medical devices and technologies. Our research involves the development of cutting-edge tools that contribute to the improvement of patient care, diagnostics, and medical interventions.',
            researchers: ['Dr. Samuel Adams', 'Dr. Jessica Clark'],
            icon: faFlask,
        },
        // Add more research projects as needed
    ];

    return (
        <div className="container p-8 mx-auto mt-12 bg-white rounded-lg shadow-md">
            <h1 className="mb-6 text-5xl font-bold">Our Research & Innovation</h1>
            <div className="grid grid-cols-1 gap-8 ">
                {projects.map(project => (
                    <div key={project.id} className="mb-8">
                        <div className='divider'></div>
                        <h2 className="mb-2 text-2xl font-bold">
                            <FontAwesomeIcon icon={project.icon} className="mr-2 text-3xl text-green-500" />
                            {project.title}
                        </h2>
                        <p className="mb-2 text-2xl text-gray-600">{project.description}</p>
                        <p className="text-xl font-bold ">Researchers:</p>
                        <ul className="pl-6 text-lg font-semibold list-disc">
                            {project.researchers.map((researcher, index) => (
                                <li key={index}>{researcher}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResearchPage;
