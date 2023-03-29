import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { Card, Row, Col, Pagination } from 'react-bootstrap';
import ArtWorkCard from '@/components/ArtWorkCard';
import validObjectIDList from '@/public/data/validObjectIDList.json';
import Error from 'next/error';

const PER_PAGE = 12;

export default function Artwork() {
	const [artworkList, setArtworkList] = useState(null);
	const [page, setPage] = useState(1);

	const router = useRouter();
	let finalQuery = router.asPath.split('?')[1];

	const { data, error } = useSWR(
		`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
	);

	function previousPage() {
		if (page > 1) {
			setPage((page) => page - 1);
		}
	}

	function nextPage() {
		if (page < artworkList.length) {
			setPage((page) => page + 1);
		}
	}

	useEffect(() => {
		if (data) {
			let filteredResults = validObjectIDList.objectIDs.filter((x) =>
				data.objectIDs?.includes(x)
			);
			const results = [];
			for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
				const chunk = filteredResults.slice(i, i + PER_PAGE);
				results.push(chunk);
			}
			setArtworkList(results);
			setPage(1);
		}
	}, [data]);

	if (error) {
		return <Error statusCode={404} />;
	}

	if (artworkList) {
		return (
			<div className='container mt-5'>
				{artworkList.length > 0 ? (
					<>
						<Row className='gy-4'>
							{artworkList[page - 1].map((objectID) => (
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
							Try searching for something else.
						</Card.Body>
					</Card>
				)}
			</div>
		);
	} else {
		return null;
	}
}
