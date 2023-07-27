import React from 'react';
import { Button } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';

const RequestIndex = props => {
	const { address } = props;

	return (
		<Layout>
			<h3>Requests</h3>
			<Link route={`/campaigns/${address}/requests/new`}>
				<Button primary>Add Request</Button>
			</Link>
		</Layout>
	);
};

RequestIndex.getInitialProps = props => {
	const { address } = props.query;

	return { address };
};

export default RequestIndex;
