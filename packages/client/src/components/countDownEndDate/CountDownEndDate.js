/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CountDownEndDate = ({ endDate }) => {
	const [timeleft, setTimeLeft] = useState('');

	useEffect(() => {
		const updateCountdown = () => {
			const now = new Date();
			const end = new Date(endDate);
			const diff = end - now;

			if (diff <= 0) {
				setTimeLeft('Expired');
				return;
			}

			const days = Math.floor(diff / (1000 * 60 * 60 * 24));
			const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((diff % (1000 * 60)) / 1000);

			setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
		};

		const interval = setInterval(updateCountdown, 1000);
		return () => clearInterval(interval);
	}, [endDate]);

	return <span>{timeleft}</span>;
};

export default CountDownEndDate;

CountDownEndDate.propTypes = {
	endDate: PropTypes.string.isRequired,
};
