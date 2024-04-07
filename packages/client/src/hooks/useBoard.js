import { useEffect, useState } from 'react';
import { getBoardById } from '../services/boardService';

export const useBoard = (id) => {
	const [board, setBoard] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBoard = async () => {
			try {
				const response = await getBoardById(id);
				setBoard(response);
			} catch (error) {
				throw error.response.data || error.message;
			} finally {
				setLoading(false);
			}
		};

		fetchBoard();
	}, [id]);

	return { board, loading };
};
