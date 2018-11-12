
export const fetchStart = 'customFetchStart';
export const fetchSuccess = 'customFetchSuccess';
export const fetchFail = 'customFetchFail';

interface FetchStartEventDetail {
    readonly url: string;
    readonly init?: RequestInit;
}

interface FetchSuccessEventDetail extends FetchStartEventDetail {
    readonly response: Response;
}

interface FetchFailEventDetail extends FetchStartEventDetail {
    readonly error: Error;
}

export type FetchStartEvent = CustomEvent<FetchStartEventDetail>;
export type FetchSuccessEvent = CustomEvent<FetchSuccessEventDetail>;
export type FetchFailEvent = CustomEvent<FetchFailEventDetail>;

export function customFetch(
    url: string,
    init?: RequestInit
): Promise<Response> {
    const fetchDetail: FetchStartEventDetail = {
        url,
        init
    };

    const fetchStartEvent = new CustomEvent(fetchStart, { detail: fetchDetail });
    window.dispatchEvent(fetchStartEvent);

    return fetch(url, init)
        .then(response => {
            const fetchSuccessEvent = new CustomEvent<FetchSuccessEventDetail>(
                fetchSuccess,
                {
                    detail: { ...fetchDetail, response }
                }
            );

            window.dispatchEvent(fetchSuccessEvent);
            return response;
        })
        .catch(error => {
            const fetchSuccessEvent = new CustomEvent<FetchFailEventDetail>(
                fetchFail,
                {
                    detail: { ...fetchDetail, error }
                }
            );
            window.dispatchEvent(fetchSuccessEvent);
            return Promise.reject(error);
        });
}