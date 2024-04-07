/* eslint-disable import/no-extraneous-dependencies */
import { Box, Grid } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export default function ColorPicker({ selectedColor, onColorSelect }) {
	const colors = [
		'#6d001a',
		'#be0039',
		'#ff4500',
		'#ffa800',
		'#ffd635',
		'#fff8b8',
		'#00a368',
		'#00cc78',
		'#7eed56',
		'#00756f',
		'#009eaa',
		'#00ccc0',
		'#2450a4',
		'#3690ea',
		'#51e9f4',
		'#493ac1',
		'#6a5cff',
		'#94b3ff',
		'#811e9f',
		'#b44ac0',
		'#e4abff',
		'#de107f',
		'#ff3881',
		'#ff99aa',
		'#6d482f',
		'#9c6926',
		'#ffb470',
		'#000000',
		'#515252',
		'#898d90',
		'#d4d7d9',
		'#ffffff',
	];

	return (
		<Grid templateColumns="repeat(auto-fill, 32px)" gap={4} w="100%">
			{colors.map((color) => (
				<Box
					key={color}
					borderRadius="md"
					w="32px"
					h="32px"
					bg={color}
					onClick={() => onColorSelect(color)}
					border={selectedColor === color ? '2px solid black' : ''}
				/>
			))}
		</Grid>
	);
}

ColorPicker.propTypes = {
	selectedColor: PropTypes.string.isRequired,
	onColorSelect: PropTypes.func.isRequired,
};
