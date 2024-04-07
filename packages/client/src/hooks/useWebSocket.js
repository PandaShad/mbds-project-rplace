/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

export const useWebSocket = (url, onMessage, onPixel) => {
	const socketRef = useRef(null);
	useEffect(() => {
		if (!socketRef.current) {
			socketRef.current = io(url);

			socketRef.current.on('message', onMessage);
			socketRef.current.on('createPixel', onPixel);
			socketRef.current.on('updatePixel', onPixel);
		}

		return () => {
			if (socketRef.current) {
				socketRef.current.disconnect();
				socketRef.current = null;
			}
		};
	}, [url, onMessage, onPixel]);
};
