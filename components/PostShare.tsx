"use client";
import {
  EmailShareButton,
  EmailIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareButton,
  FacebookIcon,
} from "next-share";
const baseUrl = "https://dev-arise-blog.vercel.app";

type Props = {
  body: string;
  slug: string;
};

const PostShare = ({ params: { body, slug } }: { params: Props }) => {
  let fullUrl = `${baseUrl}/post/${slug}`;

  return (
    <div>
      <h2 className="text-2xl font-bold text-center bg-gray-400 bg-opacity-20 p-5">
        <span className="text-gradient">Share This Post</span>
      </h2>

      <div className="flex justify-center mt-5 space-x-2">
        <FacebookShareButton
          hashtag="instagram"
          quote={body}
          url={fullUrl}
          blankTarget={true}
        >
          <FacebookIcon round size={40} />
        </FacebookShareButton>

        <FacebookMessengerShareButton
          url={fullUrl}
          appId={"851802459409408"}
          blankTarget={true}
        >
          <FacebookMessengerIcon round size={40} />
        </FacebookMessengerShareButton>

        <WhatsappShareButton
          url={fullUrl}
          title={body}
          blankTarget={true}
          separator=":: "
        >
          <WhatsappIcon round size={40} />
        </WhatsappShareButton>

        <TwitterShareButton
          url={fullUrl}
          hashtags={["Sanity", "DevAriseBlog", "Tech", "alex", "next"]}
          title={body}
          blankTarget={true}
        >
          <TwitterIcon round size={40} />
        </TwitterShareButton>

        <EmailShareButton
          url={fullUrl}
          subject={"From Dev Arise Blog"}
          body={body}
          blankTarget={true}
        >
          <EmailIcon round size={40} />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default PostShare;
