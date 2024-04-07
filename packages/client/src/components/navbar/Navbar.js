/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap';
import { Button } from '@chakra-ui/react';
import logo from '../../images/logo.png';
import logo2 from '../../images/logo2.png';
import './navbar.css';
import { useAuth } from '../../providers/authProvider';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useAuth } from '../../providers/authProvider';

function NavbarCompenant(args) {
	const [isOpen, setIsOpen] = useState(false);

	const { isDarkMode, toggleDarkMode } = useDarkMode();
	const { token } = useAuth();

	const toggle = () => setIsOpen(!isOpen);

	const handleDarkModeToggle = () => {
		toggleDarkMode();
	};

	useEffect(() => {
		toggleDarkMode();
	}, []);
	return (
		<div>
			<Navbar {...args} expand="md" style={{ background: '#F1F1F1' }}>
				<NavbarBrand href="/">
					<div className="logo-container d-flex ">
						<img alt="Logo" src={logo} className="logo-image " />
						<img alt="Logo" src={logo2} className="logo-image ms-1" />
					</div>
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="me-auto" navbar>
						<NavItem>
							<NavLink> </NavLink>
						</NavItem>
					</Nav>
					<Button onClick={handleDarkModeToggle} className="me-2" variant="ghost">
						{isDarkMode ? <SunIcon /> : <MoonIcon />}
					</Button>
					{
						token ? (
							<Button colorScheme="teal"><NavLink href="/myprofile">Profil</NavLink></Button>
						) : (
							<Button colorScheme="teal"><NavLink href="/login">Log in</NavLink></Button>
						)
					}
				</Collapse>
			</Navbar>
		</div>
	);
}

export default NavbarCompenant;
