// I add none here to avoid a lint complaint that comparisons against this
// value are both literal values.
export type GateContextClientBackingStore = 'ajaxApi' | 'none';

export interface GateContextWriteResponse<TRawResponse> {
  raw: TRawResponse;
}

export interface GateContextInput {
  walletAddress: string;
  walletVerificationMessage?: string;
  walletVerificationSignature?: string;
}

export interface GateContextClient {
  write: <TRawResponse>(
    data: GateContextInput,
  ) => Promise<GateContextWriteResponse<TRawResponse>>;
  read: () => Promise<unknown>;
}

export type ShopifyGateContextGenerator<TGateContext> = (
  input: GateContextInput,
) => Promise<TGateContext>;

export interface GateContextClientOptions<TGateContext> {
  backingStore: GateContextClientBackingStore;
  /**
   * Use to generate what the gate context should be. This may include an HMAC from the
   * backend, for example.
   */
  shopifyGateContextGenerator: ShopifyGateContextGenerator<TGateContext>;
}
