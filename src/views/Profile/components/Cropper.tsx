
import useLoader from "hooks/useLoader"
import { useRef, useState } from "react"

import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
} from 'react-image-crop'

import 'react-image-crop/dist/ReactCrop.css'
import { toast } from "react-toastify"
import { Box, Grid } from "@mui/material"
import ButtonPrimary from "shared/Button/ButtonPrimary"
import ButtonSecondary from "shared/Button/ButtonSecondary"
// import axios from "axios.config"

function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 100,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}
const Cropper = ({ compressedImg, compressedImgSrc, setImageBase64, cropWidth, cropHeight, setShowCropperModal }: any) => {
    const uploadInput = useRef<any>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const [crop, setCrop] = useState<Crop>()
    const [currentCrop, setCurrentCrop] = useState<PixelCrop>()
    const [fileType, setFileType] = useState("")
    const [showPopup, setShowPopup] = useState<boolean>(false)
    const [showLoader, setShowLoader] = useState(false)
    useLoader("crop", showLoader)
    
    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (cropWidth && cropHeight) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, cropWidth / cropHeight))
        }
        setShowLoader(false)
    }
    const handleClosePopup = () => {
        if (uploadInput && uploadInput.current != null) {
            uploadInput.current.value = ""
        }
        setShowCropperModal(false)
    }
    const getCroppedDataUrl = (img: HTMLImageElement, crop: any) => {
        if (img) {
            var canvas = document.createElement("canvas");
            let widthScale = cropWidth / crop.width
            let heightScale = cropHeight / crop.height
            canvas.width = cropWidth
            canvas.height = cropHeight
            let cropX = crop.x * widthScale
            let cropY = crop.y * heightScale
            var ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
            }
            // Show resized image in preview element
            return canvas.toDataURL(fileType);
        } else {
            return ''
        }
    }
    const handleCropComplete = () => {
        setShowLoader(true)
        const reader = new FileReader()
        let imageFile = compressedImg;
        if (imageFile) {
            reader.onload = function (e) {
                let img = document.createElement("img");
                img.onload = function (event: any) {
                    setImageBase64(getCroppedDataUrl(img, currentCrop))
                    setShowLoader(false)
                }
                if (e.target && e.target.result) {
                    img.src = e.target.result.toString();
                }
            }
            reader.readAsDataURL(imageFile)
        }
        handleClosePopup()
    }

    return (
        <Box className='mx-0 px-0' >
            <div>
                <div>
                    <div className="text-center p-0 " >
                        {Boolean(compressedImgSrc) && (
                            <ReactCrop
                                className="p-0 m-0"
                                crop={crop}
                                onChange={(_, percentCrop) => setCrop(percentCrop)}
                                onComplete={(c) => {
                                    setCurrentCrop(c)
                                }}
                                aspect={cropWidth / cropHeight}
                                maxWidth={cropWidth}
                                minHeight={cropHeight}
                                minWidth={cropWidth}
                                locked
                            >
                                <img
                                    ref={imgRef}
                                    alt="Crop me"
                                    src={compressedImgSrc}
                                    width="100%"
                                    onLoad={onImageLoad}
                                />
                            </ReactCrop>
                        )}
                    </div>
                    <div>
                        <div>

                            <Grid container >
                                <Grid item className="p-0 m-0">
                                    <ButtonSecondary onClick={handleClosePopup}>
                                        Close
                                    </ButtonSecondary>
                                </Grid>
                                <Grid item className="p-0 m-0">
                                    <ButtonPrimary onClick={handleCropComplete}>
                                        Crop
                                    </ButtonPrimary>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default Cropper