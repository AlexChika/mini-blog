"use client"


import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import {
    EmailShareButton,
    FacebookMessengerShareButton,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "next-share";
import { FacebookIcon } from 'next-share';

type Props = {
    slug: string,
    id: string,
    body: string
}

const Comments = ({ params }: { params: Props }) => {
    const { id, body } = params
    const [url, setUrl] = useState("")


    useEffect(() => {
        setUrl(location.href)
        return () => {
        }
    }, [])

    console.log(url);




    return (
        <div>

            {/* share this post */}
            <div>
                <h2 className='text-2xl font-bold text-center bg-[#ff8a75] bg-opacity-20 p-5'>Share Ths Post</h2>


                <div>
                    <FacebookShareButton
                        hashtag="instagram"
                        quote={body}
                        url={url}
                        blankTarget={true} >
                        <FacebookIcon />
                    </FacebookShareButton>
                </div>





            </div>
            {/* comments and comment box */}
            <div>

            </div>
            <h2 className='text-2xl font-bold text-center bg-[#ff8a75] bg-opacity-20 p-5'>Comments</h2>
        </div>
    )
}

export default Comments