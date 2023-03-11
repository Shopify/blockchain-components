import {Chain} from '@wagmi/core';
import {ThemeProps} from '@shopify/blockchain-components';

import {OrderAttributionMode} from '../../types/orderAttribution';

interface StatementGeneratorProps {
  /**
   * Expose only the address for now, maybe we can
   * explore adding additional data from the Wallet
   * type here in the future.
   */
  address: string;
}

export type StatementGenerator =
  | ((props: StatementGeneratorProps) => Promise<string>)
  | undefined;

interface ProviderBaseProps extends ThemeProps {
  chains: Chain[];
}

interface SignatureRequiredProps extends ProviderBaseProps {
  // Defaults to true
  requireSignature?: true | undefined;
  /**
   * If you would like to customize the SIWE message, you have the option to expose
   * an optional, statement generator that returns a Human-readable ASCII assertion
   * that the user will sign. Must not contain `\n`.
   *
   * @param address: The address which the message is intented for.
   *
   * @example
   * ```ts
   * statementGenerator={({address}) => fetchStatementForAddress(address)}
   * ```
   *
   * Where `fetchStatementForAddress` might look like:
   *
   * ```ts
   * const fetchStatementForAddress = async (address: string) => {
   *   const response = await fetch(`endpointUrl/address=${address}`);
   *
   *   return response.data.statement;
   * }
   * ```
   */
  statementGenerator?: StatementGenerator;
}

interface SignatureNotRequiredProps extends ProviderBaseProps {
  requireSignature: false;
  statementGenerator?: never;
}

interface OrderAttributionModeProps {
  orderAttributionMode?: OrderAttributionMode;
}

export type ProviderProps = (
  | SignatureRequiredProps
  | SignatureNotRequiredProps
) &
  OrderAttributionModeProps;
