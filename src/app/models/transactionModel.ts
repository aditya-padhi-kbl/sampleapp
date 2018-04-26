enum CURRENCYTYPE {
    EUR = 'EUR',
    INR = 'INR',
    GB = 'GB',
    USD = 'USD'
}

export class Transactionmodel {
    id: number;
    user: string;
    amount: number;
    currency: CURRENCYTYPE;
    txn_date: string;
}
