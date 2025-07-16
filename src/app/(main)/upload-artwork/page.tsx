"use client";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineFileUpload } from "react-icons/md";
import Title from "@/components/Title";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

export default function UploadArtworkPage() {
	const [files, setFiles] = useState<string[]>([]);
	const onDrop = useCallback((acceptedFiles: File[]) => {
		return setFiles(acceptedFiles.map((file) => URL.createObjectURL(file)));
	}, []);

	const dropZone = useDropzone({
		onDrop,
		accept: {
			"image/*": ["image/jpeg", "image/png", "image/jpg"],
		},
	});

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="w-1/2 space-y-8">
				<Title
					title="Upload New Artwork"
					subTitle="Add your latest creation to you portfolio"
				/>

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
							placeholder="Add sub title to your artwork"
							required={true}
						/>

						<Input
							id="description"
							label="Description"
							type="description"
							placeholder="Lukisan ini merepresentasikan dinamika kehidupan urban melalui sapuan warna yang tegas dan bentuk geometris yang tidak beraturan. Setiap garis dan warna mencerminkan hiruk pikuk, ritme cepat, serta kesan modern dari sebuah kota yang terus bergerak."
							required={true}
						/>

						<Input
							id="watermark"
							label="Watermark"
							type="text"
							placeholder="Add watermark to your artwork"
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

						<div
							{...dropZone.getRootProps()}
							className="border-dashed border-2 border-gray-300 p-4 rounded-md flex flex-col items-center justify-center space-y-2"
						>
							<p>Drag and drop your image here or click to upload</p>
							<MdOutlineFileUpload className="w-10 h-10 text-gray-400 rounded-full bg-gray-100 p-2" />
							<Input {...dropZone.getInputProps()} />
							{files.map((path) => (
								<Image
									key={path}
									src={path}
									width={900}
									height={900}
									alt="uploaded artowrk"
								/>
							))}
						</div>

						<div className="flex justify-between">
							<Button type="button" variant="ghost">
								Close
							</Button>
							<Button type="button" variant="ghost">
								Save as Draft
							</Button>
							<Button type="button">Next</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
