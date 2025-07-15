import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

export default function EditArtworkPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-3xl font-extrabold text-gray-900">
						Upload New Artwork
					</h2>
					<p className="mt-2 text-sm text-gray-600">
						Add your latest creation to you portfolio
					</p>
				</div>

				<form className="space-y-6">
					<div className="rounded-md shadow-sm space-y-4 px-6 py-8">
						<Input
							id="title"
							label="Title"
							type="text"
							placeholder="Abstract City"
							required={true}
						/>

						<Input
							id="sub-title"
							label="Sub Title"
							type="text"
							placeholder="Veniam veniam consequat minim ullamco cupidatat aliquip."
						/>

						<Input
							id="description"
							label="Description"
							type="description"
							placeholder="Lukisan ini merepresentasikan dinamika kehidupan urban melalui sapuan warna yang tegas dan bentuk geometris yang tidak beraturan. Setiap garis dan warna mencerminkan hiruk pikuk, ritme cepat, serta kesan modern dari sebuah kota yang terus bergerak."
							required={true}
						/>

						<Select
							id="category"
							label="Category"
							options={[
								{ value: "landscape", label: "Landscape" },
								{ value: "portrait", label: "Portrait" },
								{ value: "abstract", label: "Abstract" },
							]}
							placeholder="Select Category"
							required={true}
						/>

						<Select
							id="lisence"
							label="Lisence"
							options={[
								{ value: "free", label: "Free" },
								{ value: "paid", label: "Paid" },
							]}
							placeholder="Select Lisence"
							required={true}
						/>

						<div className="flex justify-between">
							<Button type="button" variant="ghost" className="justify-center">
								Close
							</Button>
							<Button type="submit" className="justify-center">
								Save Edit
							</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
