import {initialState, walletSlice} from './walletSlice';

const {reducer} = walletSlice;
const {setMessage} = walletSlice.actions;

describe('walletSlice', () => {
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
});
