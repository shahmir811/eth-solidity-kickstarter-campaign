const assert = require('assert');
const ganache = require('ganache-cli');
const { beforeEach, it } = require('mocha');
const { Web3 } = require('web3'); // Web3 must be named with capital Web3 because we are calling a constructor function

const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();

	// Use one of those accounts to deploy the contract.

	factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
		.deploy({ data: compiledFactory.bytecode })
		.send({ from: accounts[0], gas: '1000000' });

	await factory.methods.createCampaign('100').send({
		from: accounts[0],
		gas: '1000000',
	});

	[campaignAddress] = await factory.methods.getDeployedCampaigns().call();
	campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress);
});

describe('Campaigns', () => {
	it('deploys a factory and a campaign', () => {
		assert.ok(factory.options.address);
		assert.ok(campaign.options.address);
	});

	it('marks caller as the campaign manager', async () => {
		const manager = await campaign.methods.manager().call();
		assert.equal(accounts[0], manager);
	});

	it('allows people to contribute money and marks them as approver', async () => {
		await campaign.methods.contribute().send({
			value: '150',
			from: accounts[1],
		});

		const isContributor = await campaign.methods.approvers(accounts[1]).call();
		assert(isContributor);
	});

	it('requires a minimum contribution', async () => {
		try {
			await lottery.methods.enter().send({
				from: accounts[1],
				value: '5',
			});
			assert(false);
		} catch (err) {
			assert(err);
		}
	});

	it('requires a manager to make a payment request', async () => {
		await campaign.methods.createRequest('Buy batteries', '100', accounts[1]).send({
			from: accounts[0],
			gas: '1000000',
		});

		const request = await campaign.methods.requests(0).call();
		assert.equal('Buy batteries', request.description);
	});

	it('processes a request', async () => {
		await campaign.methods.contribute().send({
			from: accounts[0],
			value: web3.utils.toWei('0.02', 'ether'),
		});

		await campaign.methods.createRequest('Buy batteries', web3.utils.toWei('0.01', 'ether'), accounts[1]).send({
			from: accounts[0],
			gas: '1000000',
		});

		await campaign.methods.approveRequest(0).send({
			from: accounts[0],
			gas: '1000000',
		});

		await campaign.methods.finalizeRequest(0).send({
			from: accounts[0],
			gas: '1000000',
		});

		let balance = await web3.eth.getBalance(accounts[1]); // returns a string
		balance = web3.utils.fromWei(balance, 'ether'); // convert string amount to ether
		balance = parseFloat(balance);
		// console.log(balance);
		assert(balance > 100);
	});
});
