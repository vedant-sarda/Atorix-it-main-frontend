const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

class ApiInterceptor {
  constructor() {
    if (typeof window === "undefined") return;
    if (window.__apiInterceptorInitialized) return;

    window.__apiInterceptorInitialized = true;
    this.originalFetch = window.fetch;
    this.init();
  }

  init() {
    const originalFetch = this.originalFetch;

    window.fetch = async (url, options = {}) => {
      let finalUrl = url;

      if (
        typeof url === "string" &&
        url.startsWith("/api")
      ) {
        finalUrl = `${API_BASE_URL}${url}`;
      }

      const response = await originalFetch(finalUrl, {
        ...options,
        credentials: "include",
      });

      return response;
    };
  }
}

if (typeof window !== "undefined") {
  new ApiInterceptor();
}