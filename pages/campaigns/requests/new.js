import React, { useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';

const RequestNew = props => {
	const { address } = props;

	const [state, setState] = useState({
		value: '',
		description: '',
		recipient: '',
	});

	const [errorMessage, setErrorMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const onChangeHandler = e => {
		const { name, value } = e.target;
		setState(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const { value, description, recipient } = state;

	const onSubmit = async event => {
		event.preventDefault();

		const campaign = Campaign(address);

		setLoading(true);
		setErrorMessage('');

		try {
			const accounts = await web3.eth.getAccounts();
			await campaign.methods
				.createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
				.send({ from: accounts[0] });

			Router.pushRoute(`/campaigns/${address}/requests`);
		} catch (err) {
			setErrorMessage(err.message);
		}
		setLoading(false);
	};

	return (
		<Layout>
			<Link route={`/campaigns/${address}/requests`}>Back</Link>
			<h3>Create a Request</h3>
			<Form onSubmit={onSubmit} error={!!errorMessage}>
				<Form.Field>
					<label>Description</label>
					<Input value={description} name='description' onChange={onChangeHandler} />
				</Form.Field>
				<Form.Field>
					<label>Value in Ether</label>
					<Input value={value} name='value' onChange={onChangeHandler} />
				</Form.Field>
				<Form.Field>
					<label>Recipient</label>
					<Input value={recipient} name='recipient' onChange={onChangeHandler} />
				</Form.Field>
				<Message error header='Oops!' content={errorMessage} />
				<Button primary loading={loading}>
					Create!
				</Button>
			</Form>
		</Layout>
	);
};

RequestNew.getInitialProps = props => {
	const { address } = props.query;

	return { address };
};

export default RequestNew;
