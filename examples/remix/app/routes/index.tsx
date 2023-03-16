/* eslint-disable @shopify/jsx-no-hardcoded-content */
import {ConnectButton} from '@shopify/connect-wallet';

export default function Index() {
  return (
    <div style={{fontFamily: 'system-ui, sans-serif', lineHeight: '1.4'}}>
      <h1>Welcome to Remix</h1>

      <div style={{width: '240px', margin: '0 auto'}}>
        <ConnectButton />
      </div>
    </div>
  );
}
