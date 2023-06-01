import {utils} from 'ethers';
import {SiweMessage} from 'siwe';

import {SignatureResponse} from '~/types/wallet';
import {ConnectWalletError} from '~/utils/error';

// We cannot utilize SIWE's validate or verify methods because they
// require .decode for a class that we aren't able to polyfill in
// vite environments.
export function validatePendingWallet({
  address,
  message,
  nonce,
  signature,
}: SignatureResponse) {
  const fields = JSON.parse(message);

  const siweMessage = new SiweMessage(fields);

  /**
   * Utilize `verifyMessage` from ethers to recover the signer address
   * from the signature.
   */
  const recoveredAddress = utils.verifyMessage(
    siweMessage.prepareMessage(),
    signature,
  );

  if (address !== recoveredAddress) {
    throw new ConnectWalletError(
      'Address that signed message does not match the connected address',
    );
  }

  if (fields.nonce !== nonce) {
    throw new ConnectWalletError('Signature nonce mismatch');
  }
}
