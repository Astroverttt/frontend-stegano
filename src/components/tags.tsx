export default function ArtworkTags({ tags }: { tags: string[] }) {
	return (
		<div className="flex space-x-2 mt-4">
			{tags.map((tag) => (
				<span
					key={tag}
					className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
				>
					{tag}
				</span>
			))}
		</div>
	);
}
