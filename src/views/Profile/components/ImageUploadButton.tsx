import { EditOutlined } from "@mui/icons-material"
import Cropper from "./Cropper"
import { Box, Grid } from "@mui/material"
import NcImage from "shared/NcImage/NcImage"
import ButtonPrimary from "shared/Button/ButtonPrimary"
import Modal from "components/Modal"
import { useRef, useState } from "react"
import useLoader from "hooks/useLoader"
import toast from "react-hot-toast"
import { Crop } from "react-image-crop"
import ButtonSecondary from "shared/Button/ButtonSecondary"
const ImageUploadButton = ({
    label,
    inputRef,
    imageBase64,
    setImageBase64,
    imageUrl,
    cropHeight,
    cropWidth,
    uploadInputId
}: any) => {
    const [showCropperModal, setShowCropperModal] = useState(false)
    const [compressedImg, setCompressedImg] = useState<File>()
    const [showLoader, setShowLoader] = useState(false)
    const [fileType, setFileType] = useState("")
    const [compressedImgSrc, setCompressedImgSrc] = useState("")
    const [crop, setCrop] = useState<Crop>()
    useLoader("image-upload", showLoader)
    const uploadInput = useRef<any>(null)
    const getDataUrl = (img: HTMLImageElement, scale: number) => {
        var canvas = document.createElement("canvas");
        canvas.height = img.height * scale;
        canvas.width = img.width * scale;
        // var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        if (ctx)
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // Show resized image in preview element
        canvas.toBlob(function (blob) {
            if (blob)
                setCompressedImg(blob as File)
        }, fileType);
        return canvas.toDataURL(fileType);
    }
    const createImgTag = (src: any, type: string) => {
        let img = document.createElement("img");
        img.onload = function (event: any) {
            let localScale = cropWidth / img.width
            if (localScale * img.height < cropHeight)
                localScale = cropHeight / img.height
            console.log(localScale)
            setFileType(type)
            setCompressedImgSrc(getDataUrl(img, localScale))
            setShowCropperModal(true)
        }
        if (src) {
            img.src = src.toString();
        }
    }
    const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowLoader(true)
        setCompressedImgSrc("")
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            let imageFile = e.target.files[0];

            console.log(imageFile)
            if (imageFile.name.split(".")[1].toLowerCase() === "heic") {
                // const formData = new FormData();
                // formData.append('file', imageFile);
                // const data = await axios.post("https://tapit-api-y4jr.onrender.com/convert-heic", formData)
                // createImgTag(data.data, "image/jpeg")
            }
            else if (imageFile.type.includes("image")) {
                reader.onload = function (e) {
                    if (e.target)
                        createImgTag(e.target.result, imageFile.type)
                }
                reader.readAsDataURL(imageFile)

            } else {
                setShowLoader(false)
                toast.error("File type not supported")
            }
        }
    }
    return (
        <div>
            <Modal
                show={showCropperModal}
                onCloseModalQuickView={() => setShowCropperModal(false)}
            >
                <Cropper
                    compressedImg={compressedImg}
                    compressedImgSrc={compressedImgSrc}
                    setImageBase64={setImageBase64}
                    cropHeight={cropHeight}
                    cropWidth={cropWidth}
                    setShowCropperModal={setShowCropperModal}
                />
            </Modal>
            <input
                ref={inputRef}
                style={{
                    display: 'none'
                }}
                id={uploadInputId}
                type="file"
                accept="image/* "
                onChange={onSelectFile}
            />
            <ButtonSecondary
                className="ml-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg w-100"
                fontSize="text-xs"
                sizeClass="py-2 px-4"
                onClick={() => { inputRef.current.click() }}
            >
                {label}
            </ButtonSecondary>
        </div>
    )
}

export default ImageUploadButton