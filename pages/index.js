import React from 'react';
import { Button, Card } from 'semantic-ui-react';

import Layout from '../components/Layout';
import factory from '../ethereum/factory';

const Index = props => {
	const renderCampaigns = () => {
		const items = props.campaigns.map(address => {
			return {
				header: address,
				description: <a>View Campaign</a>,
				fluid: true,
			};
		});

		return <Card.Group items={items} />;
	};

	return (
		<Layout>
			<h1>Welcome to CrowdCoin!</h1>
			<h3>Open Campaigns</h3>
			<Button floated='right' content='Create Campaign' icon='add circle' primary />
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
