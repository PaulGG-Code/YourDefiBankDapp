import { BANK_ADDRESS } from "config"
import { forwardRef, useState } from "react"
import CopyToClipboard from "react-copy-to-clipboard"
import toast from "react-hot-toast"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi"
import { UseMutationResult } from "react-query"

interface IContractCardProps {
  totalValueLocked: string | undefined,
  totalBalance: string | undefined,
  depositMutation: UseMutationResult<any, any, string, void>,
  withdrawMutation: UseMutationResult<any, any, string, void>,
  ref: any,
}

export const ContractCard = forwardRef<HTMLDivElement, IContractCardProps>(({ totalValueLocked, totalBalance, depositMutation, withdrawMutation }, ref) => {
  const [depositAmount, setDepositAmount] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState(0)

  const handleDeposit = (event: any) => {
    setDepositAmount(event.target.value)
  }

  const handleWithdraw = (event: any) => {
    setWithdrawAmount(event.target.value)
  }

  return (
    <div ref={ref} className="flex flex-col max-w-md gap-6 p-5 mx-auto tracking-wide bg-black border rounded-md shadow-2xl xs:rotate-0 -rotate-2 border-neutral-600 font-audiowide">
      <div className="flex flex-wrap justify-between">
        <CopyToClipboard
          text={BANK_ADDRESS || ""}
          onCopy={() => toast.success("bank contract copied")}>
          <button className="transition-all border-b border-transparent hover:border-white">
            <span className="text-white ">CONTRACT</span>
          </button>
        </CopyToClipboard>
        <span className="text-white ">TVL {totalValueLocked} ETH</span>
      </div>
      <div>
        <label className="block mb-2 text-xs font-bold text-neutral-600">
            Deposit Balance {totalBalance}
        </label>
        <div className="grid grid-cols-5 gap-4">
          <input
            className="col-span-2 px-4 py-3 text-white rounded outline-none appearance-none placeholder:text-white bg-neutral-600 focus:bg-neutral-500"
            type="number"
            placeholder="0.0"
            onChange={handleDeposit} />
          <button className="flex items-center justify-center col-span-3 gap-2 p-2 px-4 transition-all bg-green-500 rounded-md hover:scale-105"
            onClick={() => depositMutation.mutate(depositAmount.toString())}>
            <span className="font-semibold">Deposit ETH</span>
            { depositMutation.isLoading && <AiOutlineLoading3Quarters className="animate-spin" size="1.2rem" /> }
            { !depositMutation.isLoading && <FiPlusSquare size="1.2rem" /> }
          </button>
        </div>
      </div>
      <div>
        <label className="block mb-2 text-xs font-bold text-neutral-600">
          Withdraw Balance
        </label>
        <div className="grid grid-cols-5 gap-4">
          <input
            className="col-span-2 px-4 py-3 text-white rounded outline-none appearance-none placeholder:text-white bg-neutral-600 focus:bg-neutral-500"
            type="number"
            placeholder="0.0"
            onChange={handleWithdraw} />
          <button className="flex items-center justify-center col-span-3 gap-2 p-2 px-4 transition-all bg-green-500 rounded-md hover:scale-105"
            onClick={() => withdrawMutation.mutate(withdrawAmount.toString())}>
            <span className="font-semibold">Withdraw ETH</span>
            { withdrawMutation.isLoading && <AiOutlineLoading3Quarters className="animate-spin" size="1.2rem" /> }
            { !withdrawMutation.isLoading && <FiMinusSquare size="1.2rem" /> }
          </button>
        </div>
      </div>
    </div>
  )
})

ContractCard.displayName = "ContractCard"
