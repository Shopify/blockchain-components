export interface ShopifyService {
  name: string;
  pathname?: string;
  shopifyAnalyticsPageType?: string;
}

export interface WindowWithShopifyAnalytics {
  ShopifyAnalytics?: {
    meta: {
      page?: {
        pageType: string;
        resourceId?: number;
        resourceType?: string;
      };
    };
  };
}
