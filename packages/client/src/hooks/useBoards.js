import { useEffect, useState } from 'react';
import { fetchBoards } from '../services/boardService';

export const useBoards = () => {
	const [boards, setBoards] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getBoards = async () => {
			setLoading(true);
			try {
				const response = await fetchBoards();
				setBoards(response);
			} catch (error) {
				throw error.response.data || error.message;
			} finally {
				setLoading(false);
			}
		};

		getBoards();
	}, []);

	return { boards, loading };
};
