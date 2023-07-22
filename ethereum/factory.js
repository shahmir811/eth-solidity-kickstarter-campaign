require('dotenv').config();

import CampaignFactory from './build/CampaignFactory.json';
import web3 from './web3';

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), process.env.SEPOLIA_DEPLOYED_ADDRESS);

export default instance;
