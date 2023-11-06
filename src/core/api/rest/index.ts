declare global {
  interface ProxyConstructor {
    new <TSource extends object, TTarget extends object>(
      target: TSource,
      handler: ProxyHandler<TSource>,
    ): TTarget;
  }
}

export const fetchTMDB = new Proxy<
  typeof fetch,
  (...args: Parameters<typeof fetch>) => Promise<any>
>(fetch, {
  apply(target, thisArg, argArray) {
    const url = `${process.env.TMDB_API_URL}${argArray[0]}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      },
      ...argArray[1],
    };
    return (Reflect.apply(target, thisArg, [url, options]) as Promise<Response>)
      .then((response) => response.json())
      .then(({ success, errors, ...data }: { success?: false; errors?: string[] }) => {
        if (success === false || errors) {
          throw new Error(errors?.join(', ') || 'Unknown API error');
        }
        return data;
      });
  },
});
