import { FC } from "react";
import { Account } from "@/types/account";
import AppAccountCard from "./AppAccountCard";
import DeactivatedAccountCard from "./DeactivatedAccountCard";
import StandardAccountCard from "./StandartAccountCard";

interface AccountCardProps {
    account: Account;
}

const AccountCard: FC<AccountCardProps> = ({ account }) => {
    if (account.type === 'AppTradingAccount') {
        return <AppAccountCard account={account} />
    }
    if (account.type === 'StandardTradingAccount') {
        if (!account.active) {
            return <DeactivatedAccountCard account={account}/>
        }
        return <StandardAccountCard account={account} />
    }
    return null;
}

export default Account