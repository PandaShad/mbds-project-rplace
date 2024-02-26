/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import {
	Button,
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap';
import logo from '../../images/logo.png';
import logo2 from '../../images/logo2.png';
import './navbar.css';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function NavbarCompenant(args) {
	const [isOpen, setIsOpen] = useState(false);
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar {...args} expand="md" dark color="dark">
				<NavbarBrand href="/">
					<div className="logo-container">
						<img alt="Logo" src={logo} className="logo-image " />
						<img alt="Logo" src={logo2} className="logo-image ms-1" />
					</div>
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="me-auto" navbar>
						<NavItem>
							<NavLink href="/components/">Explorer Boards</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="https://github.com/reactstrap/reactstrap">
								Mes Boards
							</NavLink>
						</NavItem>
					</Nav>
					{
						isAuthenticated ? (
							<Button color="info" className="text-white" onClick={() => navigate('/myprofile')}>Profil</Button>
						) : (
							<Button color="info" className="text-white" onClick={() => navigate('/login')}>Log in</Button>
						)
					}
				</Collapse>
			</Navbar>
		</div>
	);
}

export default NavbarCompenant;
