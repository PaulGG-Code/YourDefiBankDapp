import { useWeb3 } from "@3rdweb/hooks"
import { BANK_ADDRESS, DEFI_BANK_GRAPH_URL } from "config"
import { Contract, ethers } from "ethers"
import { GraphQLClient } from "graphql-request"
import BankContract from "hardhat/artifacts/contracts/Bank.sol/Bank.json"
import { useContract } from "hooks/useContract"
import { GET_LAST_TRANSFERS } from "queries"
import toast from "react-hot-toast"
import { useQuery, useMutation } from "react-query"

const graphQLClient = new GraphQLClient(DEFI_BANK_GRAPH_URL)

export const useBank = () => {
  const { address } = useWeb3()
  const { contract: bankContract } = useContract<Contract>({
    contractAddress: BANK_ADDRESS,
    contractJson: BankContract
  })

  const { data: lastTransfers, refetch: lastTransfersRefetch } = useQuery("lastTransfers", async () => await graphQLClient.request(GET_LAST_TRANSFERS))

  const getBankBalance = async () => {
    if (!bankContract) return

    try {
      const balance = await bankContract.getBankBalance()
      return ethers.utils.formatEther(balance)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const { data: bankBalance, refetch: bankBalanceRefetch } = useQuery("bankBalance", getBankBalance, {
    enabled: !!bankContract
  })

  const getCustomerBalance = async () => {
    if (!bankContract) return

    try {
      const balance = await bankContract.getCustomerBalance()
      return ethers.utils.formatEther(balance)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const {
    data: customerBalance,
    refetch: customerBalanceRefetch
  } = useQuery(
    "customerBalance",
    getCustomerBalance,
    {
      enabled: !!bankContract
    }
  )

  const deposityMoney = async (amount: string) => {
    if (!address) {
      toast.error("You need to be logged in to deposit money")
      return
    }

    if (!bankContract) return

    if (amount === "0") {
      toast.error("Please enter an deposit balance")
      return
    }

    try {
      const tx = await bankContract.depositMoney({ value: ethers.utils.parseEther(amount) })
      await tx.wait()
      toast.success("Deposited successfully")
    } catch (error: any) {
      if (error.message.includes("err: insufficient funds for gas * price + value")) {
        toast.error("You have insufficient funds for deposit")
      } else {
        toast.error("Deposited failed")
      }
    }
  }

  const deposityMoneyMutation = useMutation<any, any, string, void>(amount => {
    return deposityMoney(amount)
  }, {
    onSuccess: () => {
      customerBalanceRefetch()
      bankBalanceRefetch()
      lastTransfersRefetch()
    }
  })

  const withdrawMoney = async (amount: string) => {
    if (!address) {
      toast.error("You need to be logged in to withdraw money")
      return
    }

    if (!bankContract) return

    if (amount === "0") {
      toast.error("Please enter an withdraw balance")
      return
    }

    try {
      const tx = await bankContract.withdrawMoney(address, ethers.utils.parseEther(amount))
      await tx.wait()
      toast.success("Withdraw successfully")
    } catch (error: any) {
      if (error.message.includes("execution reverted: You have insuffient funds to withdraw")) {
        toast.error("You have insuffient funds for withdraw")
      } else {
        toast.error("Withdraw failed")
      }
    }
  }

  const withdrawMoneyMutation = useMutation<any, any, string, void>(amount => {
    return withdrawMoney(amount)
  }, {
    onSuccess: () => {
      customerBalanceRefetch()
      bankBalanceRefetch()
      lastTransfersRefetch()
    }
  })

  return {
    lastTransfers,
    bankBalance,
    customerBalance,
    deposityMoneyMutation,
    withdrawMoneyMutation
  }
}
