export interface IOpeneXChangeRatesLatest {

    disclaimer: string,
    license: string,
    timestamp: number,
    base: string,
    rates: Array<Object>
        // AED: 3.672538,
        // AFN: 66.809999,
        // ALL: 125.716501,
        // AMD: 484.902502,
        // ANG: 1.788575,
        // AOA: 135.295998,
        // ARS: 9.750101,
        // AUD: 1.390866,
        /* ... */
    
}

export interface IOpeneXChangeRatesLatestGet {
    base?: string,
}

export interface IOpeneXChangeRatesLatestGetRate {
    count?: string
    target?: string,
    current?: string,
}
