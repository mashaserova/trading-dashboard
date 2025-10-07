import { Account } from "@/types/account";

export const mockAccounts: Account[] = [
    {
        type: 'StandardTradingAccount',
        id: '3455256156',
        active: true,
        demo: false,
        equity: 340,
        leverage: 1100,
        data: [
            { timestamp: 1, value: 10 },
            { timestamp: 2, value: 15 },
            { timestamp: 3, value: 12 },
            { timestamp: 4, value: 18 },
        ]
    },
    {
        type: 'StandardTradingAccount',
        id: '5463545345',
        active: true,
        demo: true,
        equity: 690,
        leverage: 120,
        data: [
            { timestamp: 1, value: 20 },
            { timestamp: 2, value: 18 },
            { timestamp: 3, value: 25 },
            { timestamp: 4, value: 22 },
        ]
    },
    {
        type: 'AppTradingAccount',
        id: '6876248345',
        balance: 450,
    },
    {
        type: 'StandardTradingAccount',
        id: '6876248762',
        active: false,
        demo: false,
        equity: 0,
        leverage: 0,
        data: []
    },
]