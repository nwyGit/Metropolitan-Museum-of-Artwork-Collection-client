import { Card, Button } from 'react-bootstrap';
import useSWR from 'swr';
import Link from 'next/link';
import Error from 'next/error';

export default function ArtWorkCard({ objectID }) {
	const { data, error } = useSWR(
		`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
	);
	const { primaryImageSmall, title, objectDate, classification, medium } =
		data ?? {};
	if (error) {
		return <Error statusCode={404} />;
	}
	if (data) {
		return (
			<>
				<Card>
					<Card.Img
						variant='top'
						src={
							primaryImageSmall ||
							'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'
						}
					/>
					<Card.Body>
						<Card.Title>{title || 'N/A'}</Card.Title>
						<Card.Text>
							<strong>Date: </strong> {objectDate || 'N/A'} <br />
							<strong>Classification: </strong>
							{classification || 'N/A'} <br />
							<strong>Medium: </strong> {medium || 'N/A'}
							<br />
							<br />
							<Link href={`/artwork/${objectID}`} passHref>
								<Button variant='success'>
									<strong>ID: </strong> {objectID}
								</Button>
							</Link>
						</Card.Text>
					</Card.Body>
				</Card>
			</>
		);
	} else {
		return null;
	}
}
