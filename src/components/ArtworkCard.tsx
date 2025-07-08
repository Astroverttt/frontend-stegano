import Image from "next/image";

interface Props {
  title: string;
  username: string;
  imageUrl: string;
  likes: number;
}

const ArtworkCard = ({ title, username, imageUrl, likes }: Props) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition duration-200">
      <Image
        src={imageUrl}
        alt={title}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-1">
        <h4 className="font-semibold text-base text-gray-800">{title}</h4>
        <p className="text-sm text-gray-500">by @{username}</p>
        <div className="flex items-center text-sm text-gray-600 gap-1">
          <span>❤️</span>
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCard;
