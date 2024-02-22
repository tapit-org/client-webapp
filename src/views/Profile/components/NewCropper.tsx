import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

const NewCropper = ({
	compressedImg,
	compressedImgSrc,
	setImageBase64,
	cropWidth,
	cropHeight,
	setShowCropperModal,
}) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);

	const onCropComplete = (croppedArea, croppedAreaPixels) => {
		console.log(croppedArea, croppedAreaPixels);
	};

	return (
		<>
			<Cropper
				cropShape="round"
				image={compressedImgSrc}
				crop={crop}
				zoom={zoom}
				aspect={1}
				onCropChange={setCrop}
				onCropComplete={onCropComplete}
				onZoomChange={setZoom}
			/>
			Hello
		</>
	);
};
export default NewCropper;
