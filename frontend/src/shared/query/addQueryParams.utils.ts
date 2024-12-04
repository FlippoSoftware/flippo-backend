function addQueryParams(baseUrl: string, params: Record<string, boolean | number | string>) {
  const query = Object.entries(params)
    .map((pair: [string, boolean | number | string]) => {
      if (pair[1] !== undefined) return pair.map(encodeURIComponent).join('=');

      return ''; // Skip undefined values
    })
    .join('&');

  return [baseUrl, query].join(baseUrl.includes('?') ? '&' : '?');
}

export { addQueryParams };
