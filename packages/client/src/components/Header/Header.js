import React, { useState } from "react";
import { Button } from "reactstrap";
import logo from '../../logo.png'
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText,
} from "reactstrap";

function Header(args) {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar {...args} expand="md" dark color="dark">
				<NavbarBrand href="/" >
					<img alt="Logo" src={logo} className="logo-image" />
				</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="m-auto" navbar>
						<NavItem>
							<NavLink href="/components/">Components</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="https://github.com/reactstrap/reactstrap">
								GitHub
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
