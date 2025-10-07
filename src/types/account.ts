interface AppTradingAccount {
    type: 'AppTradingAccount';
    id: string;
    balance: number;
}

interface StandardTradingAccount {
    type: 'StandardTradingAccount';
    id: string;
    active: boolean;
    demo: boolean;
    equity: number;
    leverage: number;
    data: Array<{
        timestamp: number,
        value: number
    }>
}

export type Account = AppTradingAccount | StandardTradingAccount;