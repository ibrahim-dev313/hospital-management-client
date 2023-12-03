import { faBrain, faHeart, faMicroscope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const BlogPage = () => {
    const blogs = [
        {
            id: 1,
            title: 'The Impact of Diet on Heart Health',
            content: `Maintaining a heart-healthy diet is crucial for overall well-being. Consuming a balanced diet rich in fruits, vegetables, and whole grains can significantly reduce the risk of heart disease. In this blog, we explore the connection between diet and heart health and provide practical tips for a heart-healthy lifestyle.`,
            author: 'Dr. Sarah Johnson, Cardiologist',
            date: 'January 10, 2023',
            icon: faHeart,
        },
        {
            id: 2,
            title: 'Advancements in Cancer Screening Technologies',
            content: `As technology continues to advance, so do the methods for cancer screening. In this blog post, we delve into the latest innovations in cancer screening technologies, their accuracy, and how they contribute to early detection and improved treatment outcomes.`,
            author: 'Dr. Michael Rodriguez, Oncologist',
            date: 'January 5, 2023',
            icon: faMicroscope,
        },
        {
            id: 3,
            title: 'Mental Health Matters: Breaking the Stigma',
            content: `Addressing mental health is as important as physical health. This blog discusses the stigma surrounding mental health issues and the importance of open conversations. We share insights into promoting mental well-being and seeking help when needed.`,
            author: 'Dr. Emily Williams, Psychiatrist',
            date: 'December 28, 2022',
            icon: faBrain,
        },
        // Add more blog entries as needed
    ];

    return (
        <div className="container p-8 mx-auto mt-12 bg-white rounded-lg shadow-md">

            <h1 className="mb-6 text-5xl font-bold">Blogs</h1>


            <div className="grid grid-cols-1 gap-8 ">
                {blogs.map(blog => (
                    <div key={blog.id} className="mb-8">
                        <div className='divider'></div>

                        <h2 className="mb-2 text-2xl font-bold">
                            <FontAwesomeIcon icon={blog.icon} className="mr-2 text-indigo-500" />
                            {blog.title}
                        </h2>
                        <p className="mb-2 text-gray-600">{blog.date} by {blog.author}</p>
                        <p className="text-lg">{blog.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
