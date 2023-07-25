require('dotenv').config();

import CampaignFactory from './build/CampaignFactory.json';
import web3 from './web3';

// const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), process.env.SEPOLIA_DEPLOYED_ADDRESS);
const instance = new web3.eth.Contract(
	JSON.parse(CampaignFactory.interface),
	'0x319193843679e05C16389faABCFf3e6F6813c5b7'
);

export default instance;
