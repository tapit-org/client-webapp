import toast from "react-hot-toast"

export const handleShowErrorToast = (text: string) => {
    return toast.error(text)
}

export const handleShowSuccessToast = (text: string) => {
    return toast.success(text)
}