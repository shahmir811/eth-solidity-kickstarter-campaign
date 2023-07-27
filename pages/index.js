import React from 'react';
import { Button, Card } from 'semantic-ui-react';

import Layout from '../components/Layout';
import factory from '../ethereum/factory';
import { Link } from '../routes';

const Index = props => {
	const renderCampaigns = () => {
		const items = props.campaigns.map(address => {
			return {
				header: address,
				// description: <a>View Campaign</a>,
				description: (
					<Link href={`/campaigns/${address}`} legacyBehavior>
						<a>Go to campaign address</a>
					</Link>
				),
				fluid: true,
			};
		});

		return <Card.Group items={items} />;
	};

	return (
		<Layout>
			<h1>Welcome to CrowdCoin!</h1>
			<h3>Open Campaigns</h3>
			<Link route='/campaigns/new'>
				<Button floated='right' content='Create Campaign' icon='add circle' primary />
			</Link>
			{renderCampaigns()}
		</Layout>
	);
};

Index.getInitialProps = async ({ req }) => {
	const campaigns = await factory.methods.getDeployedCampaigns().call();
	return {
		campaigns,
	};
};

export default Index;
