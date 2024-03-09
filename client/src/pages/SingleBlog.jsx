import BlogCard from 'components/shared/BlogCard';
import Navbar from 'components/shared/Navbar';
import { Offcanvas } from 'components/shared/Offcanvas';
import { useAxios } from 'hooks';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom'

const SingleBlog = () => {

    const { blogid } = useParams();

    const { error, data, status_code, loading, call, } = useAxios({
        url: `/api/blog/${blogid}`,
        method: "GET"
    })

    useEffect(() => {
        call()
    }, [])
    
    let Component = <></>;
    if (loading){
        Component = (
            <div className="flex min-h-[80vh] items-center justify-center">
                <Spinner />
            </div>
        );
    }

    else if (error && error?.response?.status === 404 ) {
        Component = (
            <div className="flex items-center justify-center min-h-[80vh]">
                <p className='text-2xl font-semibold text-red-500'>Invalid blog-id.</p>
            </div>
        )
    }

    else {
        const {
            id, title, content, cover_image, creation_time, blog_owner, profile
        } = data;
        Component = (
            <BlogCard 
                id={id}
                title={title}
                author={blog_owner}
                content={content}
                createdOn={creation_time}
                coverImage={cover_image}
                profileImageSrc={profile}
                showContent={true}
                showLike={true}
                showDelete={true}
                />
        )
    }
    
    return (
        <>
            <Navbar />
            <Offcanvas />

            <div className="px-3 my-0">
                {Component}
            </div>
        </>
    )
}

export default SingleBlog