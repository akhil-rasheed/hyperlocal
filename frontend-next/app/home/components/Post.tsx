interface PostProps {
  id: number;
  username: string;
  desc: string;
  title: string;
  date: Date;
}

const Post: React.FC<PostProps> = ({ id, username, desc, title }) => {
  return (
    <div
      key={id}
      className="bg-gray-300/50 m-4 font-thin text-xl rounded-sm w-full flex flex-col"
    >
      <div className="flex flex-row w-full justify-between pt-2 pb-4 px-2">
        <span className="font-thin text-sm text-black/50  ">{username} </span>
        <span className="float-right text-xs">Posted at:{
new Date(isoTimestamp)
const humanReadable = date.toLocaleString();}</span>
      </div>

      <div>{desc}</div>
    </div>
  );
};

export default Post;
