import { Add, Edit } from "@mui/icons-material";
import {
	Box,
	Divider,
	Grid,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import CoverImageSlider from "components/CoverImageSlider";
import ProfileImageSlider from "components/ProfileImageSlider";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { deleteImage, getImageList, uploadImage } from "services/image.service";
import NcImage from "shared/NcImage/NcImage";
import AddImage from "views/Profile/components/AddImage";
import ImageSlider from "views/Profile/components/ImageSlider";
import ImageUploadButton from "views/Profile/components/ImageUploadButton";

const Images = ({ profileImage, coverImage, updateData }) => {
	const [profileImages, setProfileImages] = useState([]);
	const [coverImages, setCoverImages] = useState([]);
	const [images, setImages] = useState([]);
	const [profileImageBase64, setProfileImageBase64] = useState("");
	const [coverImageBase64, setCoverImageBase64] = useState("");
	const [selectedProfileImageName, setSelectedProfileImageName] =
		useState("");
	const [selectedCoverImageName, setSelectedCoverImageName] = useState("");
	const [showProfileImageModal, setShowProfileImageModal] = useState(false);

	const handleShowProfileImageModal = () => {
		setShowProfileImageModal(true);
	};
	useEffect(() => {
		const handleSetProfileImages = async () => {
			setProfileImages(await getImageList("profile"));
		};
		const handleSetCoverImages = async () => {
			setCoverImages(await getImageList("cover"));
		};
		handleSetProfileImages();
		handleSetCoverImages();
	}, []);
	const handleUploadProfileImage = async (
		base64Image: string,
		fileName: string,
	) => {
		console.log(base64Image, fileName);
		const newImage = await uploadImage(base64Image, fileName, "profile");
		console.log(newImage);
		console.log(profileImages);
		setProfileImages((prev) => [newImage, ...prev]);
	};
	const handleUploadCoverImage = async (
		base64Image: string,
		fileName: string,
	) => {
		const newImage = await uploadImage(base64Image, fileName, "cover");
		setCoverImages((prev) => [newImage, ...prev]);
	};
	const handleDeleteImage = async (
		filename: string,
		type: "profile" | "cover",
	) => {
		// const response = await deleteImage(filename, type);
		// console.log(response);
		// if (type == "profile") {
		// 	setProfileImages((prev) =>
		// 		prev.filter((image) => image.filename != filename),
		// 	);
		// } else {
		// 	setCoverImage((prev) =>
		// 		prev.filter((image) => image.filename != filename),
		// 	);
		// }
	};
	return (
		<Stack spacing={3} className="pb-4">
			<Box>
				<Stack spacing={3}>
					<Stack spacing={2}>
						<Stack spacing={1}>
							<Typography
								variant="body2"
								sx={{ px: 1, fontWeight: "bold" }}
							>
								Profile Images
							</Typography>
							<Divider />
						</Stack>
						<Stack direction={"row"} spacing={2}>
							<AddImage
								cropHeight={400}
								cropWidth={400}
								circularCrop
								handleUpload={handleUploadProfileImage}
							/>
							{profileImages && (
								<ImageSlider
									key={profileImages.length}
									images={profileImages}
									selected={profileImage}
									aspectRatio={1}
									rounded
									handleSelect={(image) => {
										updateData("profileImage", image);
									}}
									handleDelete={(filename) =>
										handleDeleteImage(filename, "profile")
									}
								/>
							)}
						</Stack>
					</Stack>
				</Stack>
			</Box>
			<Box>
				<Stack spacing={3}>
					<Stack spacing={2}>
						<Stack spacing={1}>
							<Typography
								variant="body2"
								sx={{ px: 1, fontWeight: "bold" }}
							>
								Cover Images
							</Typography>
							<Divider />
						</Stack>
						<Stack direction={"row"} spacing={2}>
							<AddImage
								cropHeight={400}
								cropWidth={600}
								handleUpload={handleUploadCoverImage}
							/>
							{coverImages && (
								<ImageSlider
									key={coverImages.length}
									images={coverImages}
									selected={coverImage}
									aspectRatio={2 / 3}
									handleSelect={(image) => {
										updateData("coverImage", image);
									}}
									handleDelete={(filename) => {
										deleteImage(filename, "cover");
									}}
								/>
							)}
						</Stack>
					</Stack>
				</Stack>
			</Box>
		</Stack>
	);
};

export default Images;
