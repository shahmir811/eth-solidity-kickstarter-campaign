require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
// const { interface, bytecode } = require('./compile');
const compiledFactory = require('./build/CampaignFactory.json');

const MY_METAMASK_ACCOUNT_MNEMONICS = process.env.MY_METAMASK_ACCOUNT_MNEMONICS;
const INFURA_URL = process.env.INFURA_URL;

const provider = new HDWalletProvider(MY_METAMASK_ACCOUNT_MNEMONICS, INFURA_URL);

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy from account', accounts[0]);

	const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
		.deploy({ data: compiledFactory.bytecode })
		.send({ gas: '1000000', from: accounts[0] });

	console.log('Contract deployed to', result.options.address);
	provider.engine.stop();
};
deploy();
