import { FC } from "react"
import { BsArrowUpRightCircle, BsArrowDownRightCircle } from "react-icons/bs"

interface ITransactionCardProps {
  address: string,
  amount: string,
  operationType: number
}

enum OperationType {
  DEPOSIT,
  WITHDRAW
}

export const TransactionCard: FC<ITransactionCardProps> = ({ address, amount, operationType }) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-2 rounded-md min-w-max max-w-max bg-neutral-600/20">
      <div className="flex flex-col col-span-2 gap-2">
        <span className="text-neutral-400">{address}</span>
        <span className="text-lg text-neutral-400">{amount} ETH</span>
      </div>
      <div className="flex flex-col items-center col-span-1 gap-2">
        { operationType === OperationType.DEPOSIT && <BsArrowUpRightCircle className="my-auto text-green-400/50" size="1.6rem" /> }
        { operationType === OperationType.WITHDRAW && <BsArrowDownRightCircle className="my-auto text-red-400/50" size="1.6rem" /> }
      </div>
    </div>
  )
}
