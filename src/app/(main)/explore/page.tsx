import ArtworkCard from "@/components/ArtworkCard";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { EXPLORE_PAGE } from "@/constant";

export default function ExplorePage() {
	return (
		<div className="mx-7 text-center mt-5">
			<h1 className="text-3xl font-bold">Showcase Your Digital Art</h1>
			<h3 className="text-lg text-gray-500 pt-8 pb-3">
				Join the community of creative digital artists
			</h3>
			<div className="space-x-5 flex">
				<Select
					id="category"
					options={[
						{ value: "landscape", label: "Landscape" },
						{ value: "portrait", label: "Portrait" },
						{ value: "abstract", label: "Abstract" },
					]}
					placeholder="Select Category"
					className="w-fit"
				/>
				<Button variant="outline">Latest</Button>
				<Button variant="outline">Popular</Button>
				<Button variant="outline">Brand Logo</Button>
				<Button variant="outline">Football</Button>
				<Button variant="outline">Paint</Button>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full mt-4">
				{EXPLORE_PAGE.map((artwork) => (
					<ArtworkCard
						key={artwork.id}
						title={artwork.title}
						username={artwork.username}
						likes={artwork.likes}
						imageUrl={artwork.imageUrl}
					/>
				))}
			</div>
		</div>
	);
}
