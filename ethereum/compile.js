const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// 1 - Remove the build directory
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// 2 - Read Campaign.sol file from the Contracts folder
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts; // It contains two separate objects. 1 for the campaign contract and
// the other for the campaign factory contract

// 3 - Compile both Contracts (that are in Campaign.sol) with solidity compiler
fs.ensureDirSync(buildPath);

for (let contract in output) {
	fs.outputJsonSync(path.resolve(buildPath, contract.replace(':', '') + '.json'), output[contract]);
}

// 4- Write out to the 'build' directory
