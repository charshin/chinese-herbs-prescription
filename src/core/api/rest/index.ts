import merge from 'deepmerge';

declare global {
  interface ProxyConstructor {
    new <TSource extends object, TTarget extends object>(
      target: TSource,
      handler: ProxyHandler<TSource>,
    ): TTarget;
  }
}

/**
  HTTP Status Code is used to determine success or failure.
*/
export interface NextRouteHandlerResponse {
  code: number; // Application error code if failure, 0 means success
  message: string; // Application message to convey error or extra information about the response
  data: any; // data in JSON format, can be used to include addition data for failure too, in this case HTTP Status Code must be 200.
}

export const fetchNextRouteHandler = new Proxy<
  typeof fetch,
  (...args: Parameters<typeof fetch>) => Promise<Omit<NextRouteHandlerResponse, 'code'>>
>(fetch, {
  apply(target, thisArg, argArray) {
    const url = `${argArray[0]}`;
    const options = merge(
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      },
      argArray[1],
    );
    return (Reflect.apply(target, thisArg, [url, options]) as Promise<Response>)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ code, message, data }: NextRouteHandlerResponse) => {
        if (code !== 0) {
          throw new Error(message);
        }
        return { data, message };
      });
  },
});
