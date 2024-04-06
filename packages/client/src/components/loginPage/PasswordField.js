/* eslint-disable import/no-extraneous-dependencies */
import {
	FormControl,
	FormLabel,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	useDisclosure,
	useMergeRefs,
} from '@chakra-ui/react';
import { forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line
import { HiEye, HiEyeOff } from 'react-icons/hi';

export const PasswordField = forwardRef((props, ref) => {
	const { isOpen, onToggle } = useDisclosure();
	const inputRef = useRef(null);
	const mergeRef = useMergeRefs(inputRef, ref);
	const onClickReveal = () => {
		onToggle();
		if (inputRef.current) {
			inputRef.current.focus({
				preventScroll: true,
			});
		}
	};
	return (
		<FormControl>
			<FormLabel htmlFor="password">Password</FormLabel>
			<InputGroup>
				<InputRightElement>
					<IconButton
						variant="text"
						aria-label={
							isOpen ? 'Mask password' : 'Reveal password'
						}
						icon={isOpen ? <HiEyeOff /> : <HiEye />}
						onClick={onClickReveal}
					/>
				</InputRightElement>
				<Input
					id="password"
					ref={mergeRef}
					name="password"
					type={isOpen ? 'text' : 'password'}
					autoComplete="current-password"
					required
					onChange={props.onChange}
					{...props}
				/>
			</InputGroup>
		</FormControl>
	);
});

PasswordField.propTypes = {
	onChange: PropTypes.func,
};

PasswordField.defaultProps = {
	onChange: () => {},
};
PasswordField.displayName = 'PasswordField';
