import { CHAIN_ID, RINKEBY_CHAIN_ID } from "config"
import { AddEthereumChainParameter } from "@3rdweb/hooks"

// Chains & Icons -> https://github.com/ethereum-lists/chains/tree/master/_data

interface t {
  [key: number]: AddEthereumChainParameter
}

export const addNetowrkMetadata: t = {
  [RINKEBY_CHAIN_ID]: {
    chainId: `0x${CHAIN_ID.toString(16)}`,
    chainName: "Rinkeby",
    nativeCurrency: {
      name: "Rinkeby Ether",
      symbol: "ETH",
      decimals: 18
    },
    rpcUrls: ["https://rinkeby.infura.io/v3/"],
    blockExplorerUrls: ["https://rinkeby.etherscan.io"],
    iconUrls: [""]
  }
}

export const networkMetadata = {}
