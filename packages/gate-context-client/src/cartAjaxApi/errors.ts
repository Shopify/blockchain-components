export class CartAjaxApiError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class CartAjaxApiNotSupportedError extends CartAjaxApiError {
  constructor() {
    super('cart ajax api not supported');
  }
}
