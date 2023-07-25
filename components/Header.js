import { useRouter } from 'next/router';
import React from 'react';
import { Icon, Menu } from 'semantic-ui-react';

//Hosts the top level layout of our app
const Header = () => {
	const router = useRouter();
	return (
		<Menu style={{ marginTop: '1em' }}>
			<Menu.Item onClick={() => router.push('/')}>CrowdCoin</Menu.Item>
			<Menu.Menu position='right'>
				<Menu.Item onClick={() => router.push('/')}>Campaigns</Menu.Item>
				<Menu.Item onClick={() => router.push('/campaigns/new')}>
					<Icon name='add circle' />
				</Menu.Item>
			</Menu.Menu>
		</Menu>
	);
};

export default Header;
