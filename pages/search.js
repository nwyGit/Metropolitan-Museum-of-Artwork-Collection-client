import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '@/lib/userData';

export default function AdvancedSearch() {
	const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async(data) => {
		let queryString = '';
		
		if (data.searchBy === 'title') {
			queryString += `title=true`;
		} else if (data.searchBy === 'tags') {
			queryString += `tags=true`;
		} else if (data.searchBy === 'artistOrCulture') {
			queryString += `artistOrCulture=true`;
		}

		if (data.geoLocation) {
			queryString += '&geoLocation=' + data.geoLocation;
		}

		if (data.medium) {
			queryString += '&medium=' + data.medium;
		}

		queryString += '&isOnView=' + data.isOnView;
		queryString += '&isHighlight=' + data.isHighlight;
		queryString += '&q=' + data.q;
		
		setSearchHistory(await addToHistory(queryString)) 

		router.push('/artwork?' + queryString);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Row>
				<Col>
					<Form.Group className='mb-3'>
						<Form.Label>Search Query</Form.Label>
						<Form.Control
							{...register('q', { required: true })}
							type='text'
							placeholder=''
							className={errors.q ? 'is-invalid' : ''}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col md={4}>
					<Form.Label>Search By</Form.Label>
					<Form.Select {...register('searchBy')} className='mb-3'>
						<option value='title'>Title</option>
						<option value='tags'>Tags</option>
						<option value='artistOrCulture'>Artist or Culture</option>
					</Form.Select>
				</Col>
				<Col md={4}>
					<Form.Group className='mb-3'>
						<Form.Label>Geo Location</Form.Label>
						<Form.Control
							{...register('geoLocation')}
							type='text'
							placeholder=''
						/>
						<Form.Text className='text-muted'>
							Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;,
							&quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.),
							with multiple values separated by the | operator
						</Form.Text>
					</Form.Group>
				</Col>
				<Col md={4}>
					<Form.Group className='mb-3'>
						<Form.Label>Medium</Form.Label>
						<Form.Control {...register('medium')} type='text' placeholder='' />
						<Form.Text className='text-muted'>
							Case Sensitive String (ie: &quot;Ceramics&quot;,
							&quot;Furniture&quot;, &quot;Paintings&quot;,
							&quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple
							values separated by the | operator
						</Form.Text>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col md={4}>
					<Form.Group>
						<Form.Check
							{...register('isHighlight')}
							type='checkbox'
							label='Highlighted'
						/>
					</Form.Group>
					<Form.Group className='mb-4'>
						<Form.Check
							{...register('isOnView')}
							type='checkbox'
							label='Currently on View'
						/>
					</Form.Group>
				</Col>
			</Row>
			<Button variant='success' type='submit'>
				Submit
			</Button>
		</Form>
	);
}
