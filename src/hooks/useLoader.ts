import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addLoader, removeLoader } from 'store/reducers/loaders';
const useLoader = (id, bool, type = 'icon', text = 'Loading...') => {
	const dispatch = useDispatch();
	useEffect(() => {
		if (bool) {
			dispatch(
				addLoader({
					id: id,
					show: bool,
					type: type,
					text: text,
				}),
			);
		} else {
			dispatch(removeLoader(id));
		}
	}, [bool]);
};
export default useLoader;
