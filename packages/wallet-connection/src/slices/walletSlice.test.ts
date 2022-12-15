import {SerializedConnector} from '../types/connector';
import {Wallet} from '../types/wallet';

import {initialState, walletSlice} from './walletSlice';

const {
  addWallet,
  clearSignatureState,
  setAddressToVerify,
  setMessage,
  setPendingConnector,
  removeWallet,
  updateWallet,
} = walletSlice.actions;

const {getInitialState, reducer} = walletSlice;

const DEFAULT_WALLET: Wallet = {
  address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  connectorId: 'metaMask',
  connectorName: 'MetaMask',
};

const ALTERNATE_WALLET: Wallet = {
  address: '0x5ea9681C3Ab9B5739810F8b91aE65EC47de62119',
  connectorId: 'rainbow',
  connectorName: 'Rainbow',
};

const DEFAULT_SERIALIZED_CONNECTOR: SerializedConnector = {
  id: 'MetaMask',
  name: 'MetaMask',
  qrCodeSupported: false,
};

describe('walletSlice', () => {
  describe('addWallet', () => {
    it('adds a wallet to the list of connected wallets', () => {
      // Ensure we're working with a clean state.
      expect(getInitialState().connectedWallets).toHaveLength(0);

      expect(reducer(initialState, addWallet(DEFAULT_WALLET))).toStrictEqual({
        ...initialState,
        connectedWallets: [DEFAULT_WALLET],
      });
    });

    it('does not add a wallet if the address is already in the connected wallets collection', () => {
      const existingState = {
        ...initialState,
        connectedWallets: [DEFAULT_WALLET],
      };

      expect(reducer(existingState, addWallet(DEFAULT_WALLET))).toStrictEqual(
        existingState,
      );
    });
  });

  describe('clearSignatureState', () => {
    it('clears addressToVerify, message, and pendingConnector state values', () => {
      const existingState = {
        ...initialState,
        addressToVerify: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        message:
          'Verification message for 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        pendingConnector: DEFAULT_SERIALIZED_CONNECTOR,
      };

      expect(reducer(existingState, clearSignatureState())).toStrictEqual(
        initialState,
      );
    });
  });

  describe('setAddressToVerify', () => {
    it('sets address to verify to given address', () => {
      const existingState = {
        ...initialState,
        addressToVerify: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      };

      expect(
        reducer(
          existingState,
          setAddressToVerify('0x5ea9681C3Ab9B5739810F8b91aE65EC47de62119'),
        ),
      ).toStrictEqual({
        ...existingState,
        addressToVerify: '0x5ea9681C3Ab9B5739810F8b91aE65EC47de62119',
      });
    });

    it('sets address to verify to undefined when passed undefined', () => {
      const existingState = {
        ...initialState,
        addressToVerify: '0x5ea9681C3Ab9B5739810F8b91aE65EC47de62119',
      };

      expect(reducer(existingState, setAddressToVerify())).toStrictEqual(
        initialState,
      );
    });
  });

  describe('setMessage', () => {
    it('sets message to given value', () => {
      expect(
        reducer(
          initialState,
          setMessage(
            'Verification message for 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
          ),
        ),
      ).toStrictEqual({
        ...initialState,
        message:
          'Verification message for 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      });
    });

    it('sets message to undefined', () => {
      const existingState = {
        ...initialState,
        message:
          'Verification message for 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      };

      expect(reducer(existingState, setMessage())).toStrictEqual(initialState);
    });
  });

  describe('setPendingConnector', () => {
    it('sets pendingConnector to given value', () => {
      expect(
        reducer(
          initialState,
          setPendingConnector(DEFAULT_SERIALIZED_CONNECTOR),
        ),
      ).toStrictEqual({
        ...initialState,
        pendingConnector: DEFAULT_SERIALIZED_CONNECTOR,
      });
    });

    it('sets pendingConnector to undefined', () => {
      const existingState = {
        ...initialState,
        pendingConnector: DEFAULT_SERIALIZED_CONNECTOR,
      };

      expect(reducer(existingState, setPendingConnector())).toStrictEqual(
        initialState,
      );
    });
  });

  describe('removeWallet', () => {
    it('removes the wallet when it exists', () => {
      const existingState = {
        ...initialState,
        connectedWallets: [DEFAULT_WALLET],
      };

      expect(
        reducer(existingState, removeWallet(DEFAULT_WALLET)),
      ).toStrictEqual(initialState);
    });

    it('does not remove a wallet if the wallet to remove is not found', () => {
      const existingState = {
        ...initialState,
        connectedWallets: [DEFAULT_WALLET],
      };

      expect(
        reducer(existingState, removeWallet(ALTERNATE_WALLET)),
      ).toStrictEqual(existingState);
    });
  });

  describe('updateWallet', () => {
    it('updates a wallet when it exists', () => {
      const existingState = {
        ...initialState,
        connectedWallets: [DEFAULT_WALLET],
      };

      const updatedWallet = {
        ...DEFAULT_WALLET,
        connectorId: 'rainbow',
        connectorName: 'Rainbow',
      };

      expect(reducer(existingState, updateWallet(updatedWallet))).toStrictEqual(
        {
          ...initialState,
          connectedWallets: [updatedWallet],
        },
      );
    });

    it('does not update a wallet if the wallet to update is not found', () => {
      const existingState = {
        ...initialState,
        connectedWallets: [DEFAULT_WALLET],
      };

      expect(
        reducer(existingState, updateWallet(ALTERNATE_WALLET)),
      ).toStrictEqual(existingState);
    });

    /**
     * Adding a note here that I'm not particularly certain if this is the desired outcome
     * or not.
     *
     * That being, when `updateWallet` is called and the previous wallet has an
     * optional key defined, such as `signedOn`, but the payload has an undefined value.
     *
     * In this case, the expected behavior (currently) would be that we update `signedOn`
     * would become undefined, trusting that the payload is the source of truth.
     */
    it('updates defined keys to undefined as expected', () => {
      const signedWallet = {
        ...DEFAULT_WALLET,
        signedOn: new Date().toISOString(),
      };

      const updatedWallet = {
        ...DEFAULT_WALLET,
        connectorId: 'rainbow',
        connectorName: 'Rainbow',
        /**
         * In this test, the signedOn will only be updated IF it is explicitly provided
         * as an undefined value. If the key is omitted, then it is not merged and does
         * not overwrite the previous value.
         */
        signedOn: undefined,
      };

      const previousState = {
        ...initialState,
        connectedWallets: [signedWallet],
      };

      const updatedState = {
        ...initialState,
        connectedWallets: [updatedWallet],
      };

      expect(reducer(previousState, updateWallet(updatedWallet))).toStrictEqual(
        updatedState,
      );
    });
  });
});
