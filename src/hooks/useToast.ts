import toast from 'react-hot-toast';
const useToast = (text: string) => {
	return toast.error(text, {
        position: 'top-center'
    })
};
export default useToast;
