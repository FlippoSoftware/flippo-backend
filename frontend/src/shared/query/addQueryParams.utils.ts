function addQueryParams(baseUrl: string, params: Record<string, string | number | boolean>) {
  const query = Object.entries(params)
    .map((pair: [string, string | number | boolean]) => {
      if (pair[1] !== undefined) return pair.map(encodeURIComponent).join("=");

      return ""; // Skip undefined values
    })
    .join("&");

  return [baseUrl, query].join(baseUrl.includes("?") ? "&" : "?");
}

export { addQueryParams };
