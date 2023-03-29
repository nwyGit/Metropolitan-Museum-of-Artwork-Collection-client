import React from 'react';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { Pagination, Row, Col, Card } from 'react-bootstrap';
import ArtWorkCard from '../components/ArtWorkCard';

export default function Favourites() {
	const [favouritesList] = useAtom(favouritesAtom);
	const [page, setPage] = useState(1);
	
	if (!favouritesList) return null;

	function previousPage() {
		if (page > 1) {
			setPage((page) => page - 1);
		}
	}

	function nextPage() {
		if (page < favouritesList.length) {
			setPage((page) => page + 1);
		}
	}

	return (
		<div className='container mt-2'>
			{favouritesList.length > 0 ? (
				<>
					<Row className='gy-4'>
						{favouritesList.map((objectID) => (
							<Col lg={3} key={objectID}>
								<ArtWorkCard objectID={objectID} />
							</Col>
						))}
					</Row>
					<Row>
						<Col>
							<br />
							<Pagination>
								<Pagination.Prev onClick={previousPage} />
								<Pagination.Item>{page}</Pagination.Item>
								<Pagination.Next onClick={nextPage} />
							</Pagination>
						</Col>
					</Row>
				</>
			) : (
				<Card>
					<Card.Body>
						<h4>Nothing Here</h4>
						Try adding some new artwork to the list.
					</Card.Body>
				</Card>
			)}
		</div>
	);
}
