import {act, renderHook} from '@testing-library/react';

import {WalletStateDefintion} from '~/state/types';
import {DEFAULT_SERIALIZED_CONNECTOR} from '~/test/fixtures/connector';
import {
  INVALID_SIGNATURE_RESPONSE,
  VALID_SIGNATURE_RESPONSE,
} from '~/test/fixtures/signature';
import {ALTERNATE_WALLET, DEFAULT_WALLET} from '~/test/fixtures/wallet';
import {useTestStore} from '~/test/store';
import {ConnectWalletError} from '~/utils/error';

describe('walletSlice', () => {
  const {result} = renderHook(() => useTestStore((state) => state.wallet));
  const {
    addWallet,
    removeWallet,
    setActiveWallet,
    setPendingConnector,
    setPendingWallet,
    updateWallet,
    validatePendingWallet,
  } = result.current;

  afterEach(() => {
    vi.clearAllMocks();
    const state = useTestStore.getState();

    // Replace state after each test.
    useTestStore.setState(state, true);
  });

  const getCurrentState = () => {
    const state = useTestStore.getState().wallet;

    return state;
  };

  const setInitialState = (props?: Partial<WalletStateDefintion>) => {
    const state = useTestStore.getState();

    useTestStore.setState(
      {
        ...state,
        wallet: {
          ...state.wallet,
          ...props,
        },
      },
      true,
    );
  };

  describe('addWallet', () => {
    it('adds a wallet to the list of connected wallets and updates the active wallet', () => {
      // Ensure we're working with a clean state.
      expect(getCurrentState().connectedWallets).toHaveLength(0);

      act(() => addWallet(DEFAULT_WALLET));

      const {activeWallet, connectedWallets} = getCurrentState();

      expect(activeWallet).toStrictEqual(DEFAULT_WALLET);
      expect(connectedWallets).toStrictEqual([DEFAULT_WALLET]);
    });

    it('does not add a wallet if the address is already in the connected wallets collection', () => {
      setInitialState({connectedWallets: [DEFAULT_WALLET]});

      expect(getCurrentState().connectedWallets).toStrictEqual([
        DEFAULT_WALLET,
      ]);

      act(() => addWallet(DEFAULT_WALLET));

      // Expect no changes to have occurred.
      expect(getCurrentState().connectedWallets).toStrictEqual([
        DEFAULT_WALLET,
      ]);
    });
  });

  describe('removeWallet', () => {
    it('removes the wallet when it exists', () => {
      setInitialState({
        activeWallet: DEFAULT_WALLET,
        connectedWallets: [DEFAULT_WALLET],
      });

      act(() => removeWallet(DEFAULT_WALLET));

      const {activeWallet, connectedWallets} = getCurrentState();

      expect(activeWallet).toStrictEqual(undefined);
      expect(connectedWallets).toStrictEqual([]);
    });

    it('does not remove a wallet if the wallet to remove is not found', () => {
      setInitialState({
        activeWallet: DEFAULT_WALLET,
        connectedWallets: [DEFAULT_WALLET],
      });

      act(() => removeWallet(ALTERNATE_WALLET));

      const {activeWallet, connectedWallets} = getCurrentState();

      expect(activeWallet).toStrictEqual(DEFAULT_WALLET);
      expect(connectedWallets).toStrictEqual([DEFAULT_WALLET]);
    });

    it('does not set the active wallet to undefined if the disconnected address is different', () => {
      setInitialState({
        activeWallet: ALTERNATE_WALLET,
        connectedWallets: [DEFAULT_WALLET, ALTERNATE_WALLET],
      });

      act(() => removeWallet(DEFAULT_WALLET));

      const {activeWallet, connectedWallets} = getCurrentState();

      expect(activeWallet).toStrictEqual(ALTERNATE_WALLET);
      expect(connectedWallets).toStrictEqual([ALTERNATE_WALLET]);
    });
  });

  describe('setActiveWallet', () => {
    it('sets activeWallet to provided wallet', () => {
      setActiveWallet(DEFAULT_WALLET);
      expect(getCurrentState().activeWallet).toStrictEqual(DEFAULT_WALLET);
    });

    it('sets activeWallet to undefined when passed undefined', () => {
      setActiveWallet(undefined);
      expect(getCurrentState().activeWallet).toStrictEqual(undefined);
    });
  });

  describe('setPendingConnector', () => {
    it('sets pendingConnector to given value', () => {
      setPendingConnector(DEFAULT_SERIALIZED_CONNECTOR);
      expect(getCurrentState().pendingConnector).toStrictEqual(
        DEFAULT_SERIALIZED_CONNECTOR,
      );
    });

    it('sets pendingConnector to undefined', () => {
      setPendingConnector(undefined);
      expect(getCurrentState().pendingConnector).toStrictEqual(undefined);
    });
  });

  describe('setPendingWallet', () => {
    it('sets pendingWallet to provided wallet', () => {
      setPendingWallet(DEFAULT_WALLET);
      expect(getCurrentState().pendingWallet).toStrictEqual(DEFAULT_WALLET);
    });

    it('sets pending wallet to undefined when passed undefined', () => {
      setPendingWallet(undefined);
      expect(getCurrentState().pendingWallet).toStrictEqual(undefined);
    });
  });

  describe('updateWallet', () => {
    it('updates a wallet when it exists and updates the active wallet when the address matches', () => {
      setInitialState({
        activeWallet: DEFAULT_WALLET,
        connectedWallets: [DEFAULT_WALLET],
      });

      // Check that our initial state is correct.
      const {activeWallet, connectedWallets} = getCurrentState();

      expect(activeWallet).toStrictEqual(DEFAULT_WALLET);
      expect(connectedWallets).toStrictEqual([DEFAULT_WALLET]);

      const updatedWallet = {
        ...DEFAULT_WALLET,
        connectorId: 'rainbow',
        connectorName: 'Rainbow',
        displayName: 'connect-wallet-test.eth',
      };

      updateWallet(updatedWallet);

      const {
        activeWallet: updatedActiveWallet,
        connectedWallets: updatedConnectedWallets,
      } = getCurrentState();

      expect(updatedActiveWallet).toStrictEqual(updatedWallet);
      expect(updatedConnectedWallets).toStrictEqual([updatedWallet]);
    });

    it('updates a wallet when it exists and does not update the active wallet if the address does not match', () => {
      setInitialState({
        activeWallet: ALTERNATE_WALLET,
        connectedWallets: [DEFAULT_WALLET, ALTERNATE_WALLET],
      });

      // Check that our initial state is correct.
      const {activeWallet, connectedWallets} = getCurrentState();

      expect(activeWallet).toStrictEqual(ALTERNATE_WALLET);
      expect(connectedWallets).toStrictEqual([
        DEFAULT_WALLET,
        ALTERNATE_WALLET,
      ]);

      const updatedWallet = {
        ...DEFAULT_WALLET,
        connectorId: 'rainbow',
        connectorName: 'Rainbow',
        displayName: 'connect-wallet-test.eth',
      };

      updateWallet(updatedWallet);

      const {
        activeWallet: updatedActiveWallet,
        connectedWallets: updatedConnectedWallets,
      } = getCurrentState();

      expect(updatedActiveWallet).toStrictEqual(ALTERNATE_WALLET);
      expect(updatedConnectedWallets).toStrictEqual([
        updatedWallet,
        ALTERNATE_WALLET,
      ]);
    });

    it('does not update a wallet if the wallet to update is not found', () => {
      setInitialState({
        activeWallet: undefined,
        connectedWallets: [DEFAULT_WALLET],
      });

      // Check that our initial state is correct.
      const {activeWallet, connectedWallets} = getCurrentState();

      expect(activeWallet).toStrictEqual(undefined);
      expect(connectedWallets).toStrictEqual([DEFAULT_WALLET]);

      updateWallet(ALTERNATE_WALLET);

      const {
        activeWallet: updatedActiveWallet,
        connectedWallets: updatedConnectedWallets,
      } = getCurrentState();

      expect(updatedActiveWallet).toStrictEqual(undefined);
      expect(updatedConnectedWallets).toStrictEqual([DEFAULT_WALLET]);
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

      setInitialState({
        connectedWallets: [signedWallet],
      });

      updateWallet(updatedWallet);

      const {connectedWallets} = getCurrentState();

      expect(connectedWallets).toStrictEqual([updatedWallet]);
    });
  });

  describe('validatePendingWallet', () => {
    it('does not manipulate state when state.pendingWallet is undefined', () => {
      const initialState = getCurrentState();

      expect(() =>
        validatePendingWallet({...DEFAULT_WALLET, ...VALID_SIGNATURE_RESPONSE}),
      ).toThrow(
        new ConnectWalletError('There is not a wallet pending validation'),
      );

      expect(getCurrentState()).toStrictEqual(initialState);
    });

    it('does not manipulate state and throws an error when the address is not verified via ethers verifyMessage util', () => {
      setInitialState({pendingWallet: DEFAULT_WALLET});

      expect(() =>
        validatePendingWallet({
          ...DEFAULT_WALLET,
          ...INVALID_SIGNATURE_RESPONSE,
        }),
      ).toThrow(
        new ConnectWalletError(
          'Address that signed message does not match the connected address',
        ),
      );

      const {activeWallet, connectedWallets} = getCurrentState();

      expect(activeWallet).not.toEqual(expect.objectContaining(DEFAULT_WALLET));
      expect(connectedWallets).not.toEqual(
        expect.objectContaining(DEFAULT_WALLET),
      );
    });

    it('manipulates state when the address from verifyMessage matches the pendingWallet address', () => {
      setInitialState({pendingWallet: DEFAULT_WALLET});

      validatePendingWallet({...DEFAULT_WALLET, ...VALID_SIGNATURE_RESPONSE});

      const {connectedWallets, pendingWallet} = getCurrentState();

      /**
       * We can use objectContaining here instead of mocking the timers
       * and doing a follow-up to reset the timers.
       */
      expect(connectedWallets).toStrictEqual(
        expect.arrayContaining([expect.objectContaining({...DEFAULT_WALLET})]),
      );

      expect(pendingWallet).toStrictEqual(undefined);
    });
  });
});
