import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';

import Error from 'next/error';

export default function ArtworkCardDetail({ objectID }) {
	const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

	const [showAdded, setShowAdded] = useState(false);

	const favouritesClicked = async () => {
		if (showAdded) {
			setFavouritesList(await removeFromFavourites(objectID));
			setShowAdded(false);
		} else {
			setFavouritesList(await addToFavourites(objectID));
			setShowAdded(true);
		}
	};

	useEffect(() => {
		setShowAdded(favouritesList?.includes(objectID));
	}, [favouritesList]);

	const { data, error } = useSWR(
		objectID
			? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
			: null
	);

	const {
		primaryImage,
		title,
		objectDate,
		classification,
		medium,
		artistDisplayName,
		artistWikidata_URL,
		creditLine,
		dimensions,
	} = data ?? {};
	if (error) {
		return <Error statusCode={404} />;
	}
	if (data) {
		return (
			<>
				<Card>
					{primaryImage && <Card.Img variant='top' src={primaryImage} />}
					<Card.Body>
						<Card.Title>{title || 'N/A'}</Card.Title>
						<Card.Text>
							<strong>Date: </strong>
							{objectDate || 'N/A'}
							<br />
							<strong>Classification: </strong>
							{classification || 'N/A'}
							<br />
							<strong>Medium: </strong> {medium || 'N/A'}
							<br />
							<br />
							{artistDisplayName && (
								<>
									<strong>Artist: </strong>
									{artistDisplayName}
									{'('}
									<a href={artistWikidata_URL} target='_blank' rel='noreferrer'>
										wiki
									</a>
									{')'}
									<br />
								</>
							)}
							<strong>Credit Line: </strong>
							{creditLine || 'N/A'}
							<br />
							<strong>Dimensions: </strong>
							{dimensions || 'N/A'}
							<br />
							<br />
							<Button
								variant={showAdded ? 'primary' : 'outline-primary'}
								onClick={favouritesClicked}
							>
								{showAdded ? '+ Favourite (added)' : '+ Favourite'}
							</Button>
						</Card.Text>
					</Card.Body>
				</Card>
			</>
		);
	} else {
		return null;
	}
}
