import { useRouter } from 'next/router';
import { Row, Col } from 'react-bootstrap';
import ArtworkCardDetail from '@/components/ArtWorkCardDetail';

export default function ArtworkById() {
	const router = useRouter();
	const { objectID } = router.query;

	return (
		<div className='container mt-5'>
			<Row>
				<Col>
					<ArtworkCardDetail objectID={objectID} />
				</Col>
			</Row>
		</div>
	);
}
