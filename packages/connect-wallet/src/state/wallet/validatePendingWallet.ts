import {SiweMessage} from 'siwe';
import {verifyMessage} from 'viem';

import {SignatureResponse} from '~/types/wallet';
import {ConnectWalletError} from '~/utils/error';

// We cannot utilize SIWE's validate or verify methods because they
// require .decode for a class that we aren't able to polyfill in
// vite environments.
export async function validatePendingWallet({
  address,
  message,
  nonce,
  signature,
}: SignatureResponse) {
  const fields = JSON.parse(message);

  const siweMessage = new SiweMessage(fields);

  /**
   * Utilize `verifyMessage` from viem ensure the message was signed by
   * the correct address
   */
  const valid = await verifyMessage({
    address,
    message: siweMessage.prepareMessage(),
    signature,
  });

  if (!valid) {
    throw new ConnectWalletError(
      'Address that signed message does not match the connected address',
    );
  }

  if (fields.nonce !== nonce) {
    throw new ConnectWalletError('Signature nonce mismatch');
  }
}
