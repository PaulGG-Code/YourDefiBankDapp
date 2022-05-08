import { useWeb3 } from "@3rdweb/hooks"
import { ethers, Contract } from "ethers"
import { useEffect, useState } from "react"

interface IuseContract {
  contractAddress: string | undefined,
  contractJson: any
}

interface IContract<T> {
  contract: T | Contract | undefined,
}

export const useContract = <T extends Contract>({ contractAddress, contractJson }: IuseContract): IContract<T> => {
  const { provider } = useWeb3()
  const signer = provider?.getSigner()
  const [contract, setContract] = useState<T | Contract>()

  useEffect(() => {
    if (provider && contractAddress) {
      const contract = new ethers.Contract(
        contractAddress,
        contractJson.abi,
        signer
      )
      setContract(contract)
    }
  }, [provider])

  return { contract }
}
