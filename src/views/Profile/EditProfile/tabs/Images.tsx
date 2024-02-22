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

const Images = ({
	profileImage,
	setProfileImage,
	coverImage,
	setCoverImage,
}) => {
	const [profileImages, setProfileImages] = useState([]);
	const [coverImages, setCoverImages] = useState([]);
	const [images, setImages] = useState([]);
	const [profileImageBase64, setProfileImageBase64] = useState("");
	const [coverImageBase64, setCoverImageBase64] = useState("");
	const [selectedProfileImageName, setSelectedProfileImageName] =
		useState("");
	const [selectedCoverImageName, setSelectedCoverImageName] = useState("");
	const [showProfileImageModal, setShowProfileImageModal] = useState(false);
	useEffect(() => {
		if (profileImageBase64) {
			setProfileImage(profileImageBase64);
		}
	}, [profileImageBase64]);

	useEffect(() => {
		if (coverImageBase64) {
			setCoverImage(coverImageBase64);
		}
	}, [coverImageBase64]);
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
		const newImage = await uploadImage(base64Image, fileName, "profile");
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
		const response = await deleteImage(filename, type);
		console.log(response);
		if (type == "profile") {
			setProfileImages((prev) =>
				prev.filter((image) => image.filename != filename),
			);
		} else {
			setCoverImage((prev) =>
				prev.filter((image) => image.filename != filename),
			);
		}
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
								setImages={setProfileImages}
								cropHeight={400}
								cropWidth={400}
								circularCrop
								handleUpload={handleUploadProfileImage}
							/>
							<ImageSlider
								key={profileImages.length}
								images={profileImages}
								selected={selectedProfileImageName}
								aspectRatio={1}
								rounded
								handleSelect={(image) => {
									setProfileImage(image.url);
									setSelectedProfileImageName(image.filename);
								}}
								handleDelete={(filename) =>
									handleDeleteImage(filename, "profile")
								}
							/>
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
								setImages={setCoverImages}
								cropHeight={400}
								cropWidth={600}
								handleUpload={handleUploadCoverImage}
							/>
							<ImageSlider
								key={coverImages.length}
								images={coverImages}
								selected={selectedCoverImageName}
								aspectRatio={2 / 3}
								handleSelect={(image) => {
									setCoverImage(image.url);
									setSelectedCoverImageName(image.filename);
								}}
								handleDelete={(filename) => {
									deleteImage(filename, "cover");
								}}
							/>
						</Stack>
					</Stack>
				</Stack>
			</Box>
		</Stack>
	);
};

export default Images;
