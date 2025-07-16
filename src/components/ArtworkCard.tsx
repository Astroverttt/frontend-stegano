import Image from "next/image";
import { FiHeart } from "react-icons/fi";

export default function ArtworkCard({
	title,
	username,
	likes,
	imageUrl,
}: {
	title: string;
	username: string;
	likes: number;
	imageUrl: string;
}) {
	return (
		<div className="flex flex-col items-center justify-center">
			<Image
				src={imageUrl}
				alt={title}
				width={208}
				height={352}
				className="object-cover w-full rounded-2xl"
			/>
			<div className="flex mt-3 mb-1 w-full justify-between">
				<h4 className="text-lg font-semibold">{title}</h4>
				<div className="flex items-center space-x-2">
					<FiHeart />
					<span>{likes}</span>
				</div>
			</div>
			<span className="self-start">by @{username}</span>
		</div>
	);
}
