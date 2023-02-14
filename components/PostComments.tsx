"use client"


import { HandThumbUpIcon, UserIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import getRandomColor from '../lib/randomColors'


type Props = {
    id: string,
    comments: Comment[]
}


type UserCommentProp = {
    id: string,
    name: string,
    text: string,
    publishedAt: string
}

const UserComment = ({ params }: { params: UserCommentProp }) => {
    const { id, name, text, publishedAt } = params
    const [seeMore, setSeeMore] = useState(false);


    let col = getRandomColor()
    useEffect(() => {
        try {
            const wrapper: any = document.querySelector(`[data-id="${id}"]`);
            wrapper.style.setProperty("--bg-color", col)

        } catch (error) {
            console.log(error);
        }
    }, [])


    return <div className='px-3 py-1'>
        <div className='flex relative'>
            <div style={{ background: col }} className='rounded-full h-8 flex  items-center justify-center min-w-[2rem] z-10'>
                <UserIcon className='h-6 w-6 text-white' />
            </div>

            <div>
                <p className='font-bold text-lg ml-3 truncate italic'>{name}</p>

                <p className={`ml-3 text-gray-500 ${true ? "" : ""}`}>
                    <span className={seeMore ? "" : "line-clamp-2"}>{text}</span>
                    <button className={seeMore ? "hidden" : "inline"} onClick={() => setSeeMore(!seeMore)}>
                        {text.length > 50 && "More"}
                    </button>
                </p>
            </div>
        </div>
    </div>
}

const Comments = ({ comment }: { comment: Comment }) => {
    const { subcomments, text, name, publishedAt, _id: id }: Comment = comment;
    const [viewReplies, setViewReplies] = useState(0);
    const [remainingReplies, setRemainingReplies] = useState(subcomments.length);


    function handleViewReply() {
        let replies = viewReplies;
        replies = Math.min(viewReplies + 3, subcomments.length);
        setViewReplies(replies);
    }


    useEffect(() => {
        let remaining = subcomments.length - viewReplies;
        setRemainingReplies(remaining);
    }, [viewReplies, subcomments]);


    return <div className='bg-white'>
        <UserComment params={{ text, name, publishedAt, id }} />
        {  /* ----------- comment buttons ----------- */}
        <div className='flex space-x-3 justify-center pb-5 -mt-3'>
            <button className='font-bold text-neutral-400 cursor-pointer'>Reply</button>
            <button onClick={handleViewReply} className='font-bold text-neutral-400 cursor-pointer'> {`Replies (${remainingReplies})`}</button>
        </div>


        {subcomments.length > 0 && (
            <div className="w-[85%] ml-auto border-l">
                {/* replies */}
                {viewReplies > 0 && (
                    <div>
                        {subcomments.slice(0, viewReplies).map((subcomment, ind) => {
                            const { text, name, _id: id, publishedAt } = subcomment;
                            return <UserComment key={ind} params={{ text, name, publishedAt, id }} />;
                        })}
                    </div>
                )}
            </div>
        )}



    </div>
}

const CommentComponent = ({ params }: { params: Props }) => {
    const { id: postId, comments } = params
    console.log(comments);


    return (
        <div className='my-12'>
            <h2 className='text-2xl font-bold text-center bg-[#ff8a75]  bg-opacity-20 p-5'>Comment</h2>


            {/* comment form */}
            <div className='mt-9'>
                <div className='flex mb-5'>
                    <label className='w-[100px] bg-neutral-400 bg-opacity-20 font-medium py-2 px-3' htmlFor="name">Name</label>

                    <input className='flex-1 placeholder:text-center outline-none px-2 border border-gray-100' id='name' placeholder='Enter your name' />
                </div>

                <div className='flex mb-5'>
                    <label className='w-[100px] bg-neutral-400 bg-opacity-20 font-medium py-2 px-3 flex items-center' htmlFor="name">Comment</label>

                    <textarea className='flex-1 block h-20 resize-none p-2 placeholder:text-center outline-none px-2 border border-gray-100' id='name' />
                </div>

                <div className='flex'>
                    <button className='flex-[0.5] text-white bg-[#ff8a75] h-9 w-full text-center font-bold'>Submit</button>

                    <button className='h-9 text-center flex-[0.5] bg-blue-300 flex justify-center'>
                        <HandThumbUpIcon className=' h-8 w-8 text-white' />
                    </button>
                </div>

            </div>


            {/* comment section */}
            <section className='mt-12'>
                <h2 className='text-2xl font-bold text-center bg-[#ff8a75]  bg-opacity-20 p-5'>Comment Section</h2>

                {/* spacing */}
                <div aria-hidden className='h-6'></div>

                <div className='max-h-[80vh] overflow-y-auto mb-5'>
                    {comments.map((comment, index) => {
                        return <Comments key={comment._id} comment={comment} />
                    })}
                </div>
            </section>
        </div>

    )
}


export default CommentComponent;