import { useEffect, useState } from 'react';
import { getPixelByBoardId } from '../services/pixelService';

export const usePixelByBoard = (boardId) => {
	const [pixels, setPixels] = useState([]);
	const [loading, setLoading] = useState(true);
	const [refetchPixels, setRefetchPixels] = useState(0);

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
	}, [boardId, refetchPixels]);

	return { pixels, loading, refetch: () => setRefetchPixels((prev) => prev + 1) };
};
