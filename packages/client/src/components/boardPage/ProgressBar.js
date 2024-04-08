/* eslint-disable import/no-extraneous-dependencies */
import { Progress } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function ProgressBar({ waitingTime }) {
	const waitingTimeMs = waitingTime * 1000;
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const updateInterval = 100;
		const progressIncrement = (updateInterval / waitingTimeMs) * 100;

		const interval = setInterval(() => {
			setProgress((prevProgress) => {
				const updatedProgress = prevProgress + progressIncrement;
				return updatedProgress > 100 ? 100 : updatedProgress;
			});
		}, updateInterval);

		return () => clearInterval(interval);
	}, [waitingTimeMs]);

	return (
		<Progress minW="100%" value={progress} />
	);
}

ProgressBar.propTypes = {
	waitingTime: PropTypes.number.isRequired,
};
