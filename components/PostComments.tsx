"use client"


import { HandThumbUpIcon, UserIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { groq } from 'next-sanity'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState, useRef } from 'react'
import getRandomColor from '../lib/randomColors'
import { client } from '../lib/sanity.client'





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


    return <div className='px-3 mb-2'>
        <div className='flex relative'>
            <div data-id={id} className='bg-[var(--bg-color)] rounded-full h-7 flex  items-center justify-center min-w-[1.75rem] z-10'>
                <UserIcon className='h-5 w-5 text-white' />
            </div>

            <div>
                <p className='font-bold text-base ml-3 truncate italic'>{name}</p>

                <p className={`ml-3 text-gray-500`}>
                    <span className={seeMore ? "" : "line-clamp-2"}>{text}</span>

                    {
                        text && text.length > 50 && <button className={seeMore ? "hidden" : "inline text-xs"} onClick={() => setSeeMore(!seeMore)}>
                            More...
                        </button>
                    }

                </p>
            </div>
        </div>
    </div>
}

type CommentsProp = {
    comment: Comment
    setReplyComment: Dispatch<SetStateAction<null | Comment>>
}
const Comments = ({ comment, setReplyComment }: CommentsProp) => {
    const { subcomments, text, name, publishedAt, _id: id }: Comment = comment;
    const [viewReplies, setViewReplies] = useState(0);
    const [remainingReplies, setRemainingReplies] = useState(subcomments ? subcomments.length : 0);


    function handleViewReply() {
        if (!subcomments) return

        let replies = viewReplies;
        replies = Math.min(viewReplies + 3, subcomments.length);
        setViewReplies(replies);
    }


    useEffect(() => {
        if (!subcomments) return

        let remaining = subcomments.length - viewReplies;
        setRemainingReplies(remaining);
    }, [viewReplies, subcomments]);


    return <div className='bg-white p-3'>
        <UserComment params={{ text, name, publishedAt, id }} />
        {  /* ----------- comment buttons ----------- */}
        <div className='flex space-x-3 justify-center'>
            <button onClick={() => setReplyComment(comment)} className='font-bold text-neutral-400 cursor-pointer'>Reply</button>
            <button onClick={handleViewReply} className='font-bold text-neutral-400 cursor-pointer'> {`Replies (${remainingReplies})`}</button>
        </div>


        {subcomments && subcomments.length > 0 && (
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


type CommentComponentProps = {
    id: string,
    comments: Comment[],
    likes: number
}
const CommentComponent = ({ params }: { params: CommentComponentProps }) => {
    const { id: postId, comments, likes } = params

    const [_Likes, SetLikes] = useState(likes);
    const [_Comments, SetComments] = useState(comments);

    const [replyComment, setReplyComment] = useState<null | Comment>(null); //commemt to be replied
    const [replyId, setReplyId] = useState(postId)//post or comment id to be commented on
    const [commentObj, setCommentObj] = useState({
        name: "",
        text: ""
    })
    const commentHeaderRef = useRef<HTMLDivElement>(null);

    function formOnchange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const name = e.target.name;
        let value;
        if (name === "name") {
            value = e.target.value.substring(0, 15)
        } else {
            value = e.target.value.substring(0, 200)
        }

        setCommentObj({
            ...commentObj, [name]: value
        })
    }

    const newComment = {
        _type: 'comment',
        name: commentObj.name,
        text: commentObj.text,
        subcomments: [],
        publishedAt: new Date().toISOString()
    }

    const newSubComment = {
        _type: 'subcomment',
        name: commentObj.name,
        text: commentObj.text,
    }

    async function addCommentRef(field: string, commentRef: { _type: string, _ref: string }) {
        const result = await client
            .patch(replyId)
            .setIfMissing({ [field]: [] })
            .append(field, [commentRef])
            .commit({ autoGenerateArrayKeys: true })
        return result
    }

    async function handleSubmitComment() {
        // form validations
        if (!commentObj.name || !commentObj.text) {
            return alert("Please fill the form correctly")
        }
        if (commentObj.name.trim().length < 3 || commentObj.text.trim().length < 5) {
            return alert("Name or comment too scanty")
        }

        try {

            if (replyComment) {
                await commentOnComment()
            } else {
                await commentOnPost()
            }

            setCommentObj({ name: commentObj.name, text: "" })
        } catch (error) {
            alert("Error !!! Couldnt post comment.")
        }

    }

    async function commentOnPost() {
        if (replyComment) return //double check
        const comment = await client.create(newComment)

        const newcommentRef = {
            _type: "reference",
            _ref: comment._id,
        }

        await addCommentRef("comments", newcommentRef)
        updateComments()
    }

    async function commentOnComment() {
        if (!replyComment) return //double check

        const result = await client.create(newSubComment)
        const newcommentRef = {
            _type: "reference",
            _ref: result._id,
        }

        await addCommentRef("subcomments", newcommentRef)
        updateComments()
    }

    async function handleLikePost(postId: string, set: Function) {
        try {
            client
                .patch(postId) // Document ID to patch
                .inc({ likes: 1 }) // Increment field by count
                .commit() // Perform the patch and return a promise
                .then((likes) => {
                    SetLikes(likes.likes)
                    alert("post liked successfully");
                })
        } catch (error) {
            alert("an error occured");
        }
    }

    async function updateComments() {
        const q = groq`*[_type == "post" && _id == $postId]{
            comments[]->{
                ...,
                subcomments[]->
            }
        }`

        try {
            const res = await client.fetch(q, { postId })
            SetComments(res[0].comments)

        } catch (error) {
            console.log(error);
        }

    }


    useEffect(() => {
        if (replyComment) {
            setReplyId(replyComment._id)
            if (commentHeaderRef.current) {
                window.scrollTo(0, commentHeaderRef.current.offsetTop)
            }
        } else {
            setReplyId(postId)
        }
    }, [replyComment])


    return (
        <div className='my-12'>
            <h2 ref={commentHeaderRef} className='text-2xl font-bold text-center bg-[#ff8a75]  bg-opacity-20 p-5'>Comment</h2>


            {/* comment form */}
            <div className='mt-9'>

                {/* reply indicator */}
                <div className={`bg-gray-200 flex justify-between text-gray-400 px-3 py-1 ${replyComment ? "flex" : "hidden"}`}>
                    <p className='font-semibold italic'>replying {"@" + replyComment?.name}</p>
                    <button onClick={() => setReplyComment(null)}>
                        <XCircleIcon className='h-6 w-6' />
                    </button>
                </div>


                {/* name inputs */}
                <div className='flex mb-5'>
                    <label className='w-[100px] border border-gray-800 font-medium py-2 px-3' htmlFor="name">Name</label>

                    <input onChange={formOnchange} value={commentObj.name} id="name" name="name" className='flex-1 border border-gray-800 placeholder:text-center outline-none px-2' placeholder='Enter your name' />
                </div>



                {/* comment text input  */}
                <div className='flex mb-5'>
                    <label className='w-[100px] border border-gray-800  font-medium py-2 px-3 flex items-center' htmlFor="text">Comment</label>

                    <textarea value={commentObj.text} onChange={formOnchange} name="text" className='flex-1 block h-20 resize-none p-2 placeholder:text-center outline-none px-2 border border-gray-800' id='text' />

                </div>

                <div className='flex'>
                    <button onClick={handleSubmitComment} className='flex-[0.5] text-white bg-[#ff8a75] h-9 w-full text-center font-bold'>Submit</button>

                    <button onClick={() => handleLikePost(postId, () => { })} className='h-9 text-center flex-[0.5] bg-blue-300 flex justify-center items-center space-x-2'>
                        <HandThumbUpIcon className=' h-8 w-8 text-white' />
                        <span className='font-bold text-white'>{_Likes} likes</span>

                    </button>
                </div>

            </div>


            {/* comment section */}
            <section className='mt-12'>
                <h2 className='text-2xl font-bold text-center bg-[#ff8a75]  bg-opacity-20 p-5'>Comment Section</h2>

                {/* spacing */}
                <div aria-hidden className='h-6'></div>

                <div className='max-h-[80vh] overflow-y-auto mb-5'>
                    {_Comments && _Comments.map((comment) => {
                        return <Comments key={comment._id} comment={comment} setReplyComment={setReplyComment} />
                    })}
                </div>
            </section>
        </div>

    )
}


export default CommentComponent;