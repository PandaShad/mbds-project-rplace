import React, { useState } from "react";
import { Button } from "reactstrap";
import logo from '../../images/logo.png'
import logo2 from '../../images/logo2.png'
import "./navbar.css";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from "reactstrap";

function Header(args) {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar {...args} expand="md"  dark color="dark">
				<NavbarBrand href="/" >
					<div className="logo-container">
					<img alt="Logo" src={logo} className="logo-image "/>
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
					<Button color="info" className="text-white">
						Sign in
					</Button>
				</Collapse>
			</Navbar>
		</div>
	);
}

export default Header;
