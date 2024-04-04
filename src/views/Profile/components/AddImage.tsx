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
import Modal from "components/Modal";
import ProfileImageSlider from "components/ProfileImageSlider";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Crop } from "react-image-crop";
import NcImage from "shared/NcImage/NcImage";
import ImageSlider from "views/Profile/components/ImageSlider";
import ImageUploadButton from "views/Profile/components/ImageUploadButton";
import Cropper from "./Cropper";
import NewCropper from "./NewCropper";
import { convertHeic, uploadImage } from "services/image.service";
import { useSelector } from "react-redux";

const AddImage = ({
	cropHeight,
	cropWidth,
	circularCrop = false,
	handleUpload,
}) => {
	const inputRef = useRef(null);

	const [showProfileImageModal, setShowProfileImageModal] = useState(false);
	const handleShowProfileImageModal = () => {
		setShowProfileImageModal(true);
	};

	const [showCropperModal, setShowCropperModal] = useState(false);
	const [compressedImg, setCompressedImg] = useState<File>();
	const [showLoader, setShowLoader] = useState(false);
	const [fileName, setFileName] = useState("");
	const [fileType, setFileType] = useState("");
	const [crop, setCrop] = useState<Crop>();
	const [newImageBase64, setNewImageBase64] = useState<string>();
	const getImageBase64 = (img: HTMLImageElement, scale: number) => {
		var canvas = document.createElement("canvas");
		canvas.height = img.height * scale;
		canvas.width = img.width * scale;
		// var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		if (ctx) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		// Show resized image in preview element
		canvas.toBlob(function (blob) {
			if (blob) setCompressedImg(blob as File);
		}, fileType);
		console.log(canvas.toDataURL(fileType));
		return canvas.toDataURL(fileType);
	};
	const createImgTagForScaling = (src: any, name, type: string) => {
		let img = document.createElement("img");
		img.onload = function (event: any) {
			let localScale = cropWidth / img.width;
			if (localScale * img.height < cropHeight)
				localScale = cropHeight / img.height;
			console.log(localScale);
			setFileName(name);
			setFileType(type);
			setNewImageBase64(getImageBase64(img, localScale));
			setShowCropperModal(true);
		};
		if (src) {
			img.src = src.toString();
		}
	};
	const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setShowLoader(true);
		setNewImageBase64("");
		if (e.target.files && e.target.files.length > 0) {
			setCrop(undefined); // Makes crop preview update between images.
			const reader = new FileReader();
			let imageFile = e.target.files[0];
			let imageNameSplitArr = imageFile.name.split(".");
			if (imageNameSplitArr.pop().toLowerCase() === "heic") {
				console.log("convert to heic", imageFile.name);
				const { convertedImage, filename } = await convertHeic(
					imageFile,
					imageFile.name,
				);
				createImgTagForScaling(convertedImage, filename, "jpeg");
			} else if (imageFile.type.includes("image")) {
				reader.onload = function (e) {
					if (e.target) {
						createImgTagForScaling(
							e.target.result,
							imageFile.name,
							imageFile.type,
						);
					}
				};
				reader.readAsDataURL(imageFile);
			} else {
				setShowLoader(false);
				toast.error("File type not supported");
			}
		}
	};

	return (
		<>
			<Modal
				show={showCropperModal}
				onCloseModalQuickView={() => setShowCropperModal(false)}
				position="bottom"
				hideClose
				padding={0}
			>
				<Cropper
					image={compressedImg}
					imageBase64={newImageBase64}
					onCropSubmit={(base64: string) =>
						handleUpload(base64, fileName)
					}
					cropHeight={cropHeight}
					cropWidth={cropWidth}
					setShowCropperModal={setShowCropperModal}
					circularCrop={circularCrop}
				/>
			</Modal>
			<input
				ref={inputRef}
				style={{
					display: "none",
				}}
				id={"profile-upload"}
				type="file"
				accept="image/* "
				onChange={onSelectFile}
			/>
			<Stack
				sx={{
					p: 2,
					borderRadius: 4,
					cursor: "pointer",
					height: 100,
					minWidth: 100,
				}}
				className="bg-primary-50"
				alignItems={"center"}
				justifyContent={"center"}
				onClick={() => inputRef.current.click()}
			>
				<Add />
			</Stack>
		</>
	);
};

export default AddImage;
