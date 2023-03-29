import {
	Container,
	Nav,
	Navbar,
	Form,
	Button,
	NavDropdown,
} from 'react-bootstrap';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
	const [searchField, setSearchField] = useState('');
	const [isExpanded, setIsExpanded] = useState(false);
	const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

	const toggleExpanded = () => setIsExpanded(!isExpanded);
	const handleNavLinkClick = () => setIsExpanded(false);

	const router = useRouter();

	const handleSubmit = async (event) => {
		event.preventDefault();
		const queryString = `title=true&q=${searchField}`;
		setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
		if (searchField.length > 0)
			router.push(`/artwork?title=true&q=${searchField}`);
		setIsExpanded(false);
	};

	let token = readToken();

	function logout() {
		removeToken();
		router.push('/login');
	}

	return (
		<>
			<Navbar
				className='fixed-top'
				bg='dark'
				variant='dark'
				expand='sm'
				expanded={isExpanded}
			>
				<Container>
					<Navbar.Brand>Wai Yan Ng</Navbar.Brand>
					<Navbar.Toggle
						aria-controls='navbar-collapse'
						onClick={toggleExpanded}
					/>
					<Navbar.Collapse id='navbar-collapse'>
						<Nav className='me-auto'>
							<Link href='/' passHref legacyBehavior>
								<Nav.Link
									active={router.pathname === '/'}
									onClick={handleNavLinkClick}
								>
									Home
								</Nav.Link>
							</Link>
							{token && (
								<>
									<Link href='/search' passHref legacyBehavior>
										<Nav.Link
											active={router.pathname === '/search'}
											onClick={handleNavLinkClick}
										>
											Advanced Search
										</Nav.Link>
									</Link>
								</>
							)}
						</Nav>
						&nbsp;
						{token && (
							<>
								<Form className='d-flex' onSubmit={handleSubmit}>
									<Form.Control
										type='search'
										placeholder='Search'
										className='me-2 form-control'
										aria-label='Search'
										value={searchField}
										onChange={(event) => {
											setSearchField(event.target.value);
										}}
									/>
									<Button type='submit' variant='success'>
										Search
									</Button>
								</Form>
							</>
						)}
						&nbsp;
						{token && (
							<>
								<Nav>
									<NavDropdown
										title={readToken().userName}
										id='basic-nav-dropdown'
									>
										<Link href='/favourites' passHref legacyBehavior>
											<NavDropdown.Item
												href='/favourites'
												onClick={handleNavLinkClick}
											>
												Favourites
											</NavDropdown.Item>
										</Link>
										<Link href='/history' passHref legacyBehavior>
											<NavDropdown.Item
												href='/history'
												onClick={handleNavLinkClick}
											>
												Search History
											</NavDropdown.Item>
										</Link>
										<NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
									</NavDropdown>
								</Nav>
							</>
						)}
						{!token && (
							<>
								<Nav>
									<Link href='/register' passHref legacyBehavior>
										<Nav.Link
											active={router.pathname === '/register'}
											onClick={handleNavLinkClick}
										>
											Register
										</Nav.Link>
									</Link>
									<Link href='/login' passHref legacyBehavior>
										<Nav.Link
											active={router.pathname === '/login'}
											onClick={handleNavLinkClick}
										>
											Login
										</Nav.Link>
									</Link>
								</Nav>
							</>
						)}
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<br />
			<br />
		</>
	);
}
