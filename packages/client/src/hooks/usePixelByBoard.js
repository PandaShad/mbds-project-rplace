import { useEffect, useState } from 'react';
import { getPixelByBoardId } from '../services/pixelService';

export const usePixelByBoard = (boardId) => {
	const [pixels, setPixels] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPixels = async () => {
			try {
				const response = await getPixelByBoardId(boardId);
				setPixels(response);
			} catch (error) {
				throw error.response.data || error.message;
			} finally {
				setLoading(false);
			}
		};

		fetchPixels();
	}, [boardId]);

	return { pixels, loading };
};
