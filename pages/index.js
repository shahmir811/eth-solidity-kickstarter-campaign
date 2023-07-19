import React from 'react';
import factory from '../ethereum/factory';

const Index = props => {
	console.log(props);

	return (
		<div>
			<h1>Welcome to CrowdCoin!</h1>
			{/* <p>{props.campaigns[0]}</p> */}
		</div>
	);
};

Index.getInitialProps = async ({ req }) => {
	const campaigns = await factory.methods.getDeployedCampaigns().call();
	return {
		campaigns,
	};
};

export default Index;
