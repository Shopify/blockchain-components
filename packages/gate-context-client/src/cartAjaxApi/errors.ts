export class CartAjaxApiError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class CartAjaxApiNotSupportedError extends CartAjaxApiError {
  constructor() {
    super(
      'Online storefront not detected. Cart AJAX API is not supported. Set orderAttributionMode to "disabled" if you are not using Online storefront.',
    );
  }
}
