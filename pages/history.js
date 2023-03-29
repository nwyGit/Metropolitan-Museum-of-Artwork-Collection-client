import { useAtom } from 'jotai';
import { useRouter } from 'next/router';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { searchHistoryAtom } from '../store';
import { removeFromHistory } from '@/lib/userData';
import styles from '../styles/History.module.css';

export default function History() {
	const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
	const router = useRouter();

	if (!searchHistory) return null;

	const historyClicked = (e, index) => {
		e.stopPropagation();
		router.push(`/artwork?${searchHistory[index]}`);
	};

	const removeHistoryClicked = async (e, index) => {
		e.stopPropagation(); // stop the event from trigging other events
		setSearchHistory(await removeFromHistory(searchHistory[index]));
	};

	let parsedHistory = [];
	searchHistory.forEach((h) => {
		let params = new URLSearchParams(h);
		let entries = params.entries();
		parsedHistory.push(Object.fromEntries(entries));
	});

	return (
		<div className='container mt-2'>
			{parsedHistory.length > 0 ? (
				<Card>
					<ListGroup variant='flush'>
						{parsedHistory.map((historyItem, index) => (
							<ListGroup.Item
								key={index}
								className={styles.historyListItem}
								onClick={(e) => historyClicked(e, index)}
							>
								{Object.keys(historyItem).map((key) => (
									<>
										{key}: <strong>{historyItem[key]}</strong>&nbsp;
									</>
								))}
								<Button
									className='float-end'
									variant='danger'
									size='sm'
									onClick={(e) => removeHistoryClicked(e, index)}
								>
									&times;
								</Button>
							</ListGroup.Item>
						))}
					</ListGroup>
				</Card>
			) : (
				<Card>
					<Card.Body>
						<h4>Nothing Here</h4>
						Try searching for some artwork.
					</Card.Body>
				</Card>
			)}
		</div>
	);
}
