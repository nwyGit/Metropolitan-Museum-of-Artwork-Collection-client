/*********************************************************************************
 *  WEB422 – Assignment 6
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Wai Yan Ng Student ID: 149637217 Date: 28 Mar 2023
 * 
 * Vercel App (Deployed) Link: 
 *********************************************************************************/

import React from 'react';
import { Image, Row, Col, Container } from 'react-bootstrap';
import useSWR from 'swr';

export default function Home() {
	const searchTerm = 'Metropolitan_Museum_of_Art';
	const { data, error } = useSWR(
		`https://en.wikipedia.org/api/rest_v1/page/summary/${searchTerm}`
	);

	if (error) {
		return (
			<>
				<p>Error loading Wikipedia description</p>
			</>
		);
	}

	if (data) {
		return (
			<>
				<Container>
					<Image
						fluid
						rounded
						src='https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg'
						alt='The Metropolitan Museum of Art'
					/>
					<Row className='mt-4'>
						<Col md={6}>
							<p>{data.extract}</p>
						</Col>
						<Col md={6}>
							<p>
								The Metropolitan Museum of Art was founded in 1870 with its
								mission to bring art and art education to the American people.
								The museum&apos;s permanent collection consists of works of art
								from classical antiquity and ancient Egypt, paintings, and
								sculptures from nearly all the European Old Masters, and an
								extensive collection of American and modern art. The Met
								maintains extensive holdings of African, Asian, Oceanian,
								Byzantine, and Islamic art. The museum is home to encyclopedic
								collections of musical instruments, costumes, and accessories,
								as well as antique weapons and armor from around the world.
								Several notable interiors, ranging from 1st-century Rome through
								modern American design, are installed in its galleries.
							</p>
							<p>
								<a
									href='https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art'
									target='_blank'
									rel='noreferrer'
								>
									https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art
								</a>
							</p>
						</Col>
					</Row>
				</Container>
			</>
		);
	} else {
		return null;
	}
}
