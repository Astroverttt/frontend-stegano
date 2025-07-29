import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProfileCard from "@/components/ProfileCard";
import { DETAIL_PAGE } from "@/constant";

export default function DetailArtworkPage() {
	const data = DETAIL_PAGE;

	return (
		<div className="min-h-screen bg-white">
			<main className="max-w-4xl mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
				<ProfileCard data={data} className="my-2" />
				<div className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden mb-6">
					<Image
						src={data.imageUrl}
						alt={data.title}
						fill
						className="object-cover"
					/>
				</div>
				<div className="flex flex-wrap gap-2 mb-6">
					{data.tags.map((tag) => (
						<span
							key={`tag-${tag.replace(/\s+/g, "-").toLowerCase()}`}
							className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
						>
							{tag}
						</span>
					))}
				</div>
				<div className="mb-8">
					<h2 className="text-lg font-semibold text-gray-900 mb-2">
						Description
					</h2>
					<p className="text-gray-700 leading-relaxed">{data.description}</p>
				</div>
				<div className="flex items-center space-x-7">
					<div className="h-0.5 w-full bg-gray-200" />
					<ProfileCard data={data} variant="bottom" />
					<div className="h-0.5 w-full bg-gray-200" />
				</div>
				<div className="flex justify-between items-center py-4">
					<button
						type="button"
						className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
					>
						<FiChevronLeft className="w-5 h-5" />
						<span>Previous</span>
					</button>
					<button
						type="button"
						className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
					>
						<span>Next</span>
						<FiChevronRight className="w-5 h-5" />
					</button>
				</div>
			</main>
		</div>
	);
}
