import React from 'react';
import { Button, Card, Grid } from 'semantic-ui-react';

import ContributeForm from '../../components/ContributeForm';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

const CampaignShow = props => {
	const { address, minimumContribution, balance, requestsCount, approversCount, manager } = props;

	const renderCards = () => {
		const items = [
			{
				header: manager,
				meta: 'Address of Manager',
				description: 'The manager created this campaign and can create requests to withdraw money',
				style: { overflowWrap: 'break-word' },
			},
			{
				header: minimumContribution,
				meta: 'Minimum Contribution (wei)',
				description: 'You must contribute at least this much wei to become an approver',
			},
			{
				header: requestsCount,
				meta: 'Number of Requests',
				description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers',
			},
			{
				header: approversCount,
				meta: 'Number of Approvers',
				description: 'Number of people who have already donated to this campaign',
			},
			{
				header: web3.utils.fromWei(balance, 'ether'),
				meta: 'Campaign Balance (ether)',
				description: 'The balance is how much money this campaign has left to spend.',
			},
		];

		return <Card.Group items={items} />;
	};

	return (
		<Layout>
			<h3>Campaign Show</h3>
			<Grid>
				<Grid.Row>
					<Grid.Column width={10}>{renderCards()}</Grid.Column>
					<Grid.Column width={6}>
						<ContributeForm address={address} />
					</Grid.Column>
				</Grid.Row>

				<Grid.Row>
					<Grid.Column>
						<Link route={`/campaigns/${address}/requests`}>
							<Button primary>View Requests</Button>
						</Link>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</Layout>
	);
};

CampaignShow.getInitialProps = async props => {
	const campaign = Campaign(props.query.address);
	const summary = await campaign.methods.getSummary().call();
	return {
		address: props.query.address,
		minimumContribution: BigInt(summary[0]).toString(),
		balance: BigInt(summary[1]).toString(),
		requestsCount: BigInt(summary[2]).toString(),
		approversCount: BigInt(summary[3]).toString(),
		manager: BigInt(summary[4]).toString(),
	};
};

export default CampaignShow;
