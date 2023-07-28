import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import RequestRow from '../../../components/RequestRow';
import Campaign from '../../../ethereum/campaign';
import { Link } from '../../../routes';

const RequestIndex = props => {
	const { address, requestCount, requests, approversCount } = props;
	const { Header, Row, HeaderCell, Body } = Table;

	const renderRows = () => {
		return requests.map((request, index) => {
			return <RequestRow key={index} id={index} request={request} address={address} approversCount={approversCount} />;
		});
	};

	return (
		<Layout>
			<h3>Requests</h3>
			<Link route={`/campaigns/${address}/requests/new`}>
				<Button primary>Add Request</Button>
			</Link>
			<Table>
				<Header>
					<Row>
						<HeaderCell>ID</HeaderCell>
						<HeaderCell>Description</HeaderCell>
						<HeaderCell>Amount</HeaderCell>
						<HeaderCell>Recipient</HeaderCell>
						<HeaderCell>Approval Count</HeaderCell>
						<HeaderCell>Approve</HeaderCell>
						<HeaderCell>Finalize</HeaderCell>
					</Row>
				</Header>
				<Body>{renderRows()}</Body>
			</Table>
			<div>Found {requestCount} requests.</div>
		</Layout>
	);
};

RequestIndex.getInitialProps = async props => {
	const { address } = props.query;
	const campaign = Campaign(address);
	const requestCount = await campaign.methods.getRequestsCount().call();
	const approversCount = await campaign.methods.approversCount().call();

	const requests = await Promise.all(
		Array(requestCount)
			.fill()
			.map((element, index) => {
				return campaign.methods.requests(index).call();
			})
	);

	console.log(requests);

	return { address, requestCount, requests, approversCount };
};

export default RequestIndex;
