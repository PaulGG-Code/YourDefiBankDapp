import { sideAnimationRightVariants } from "animations"
import { ContractCard } from "components/ContractCard"
import { TransactionCard } from "components/TransactionCard"
import { BANK_ADDRESS } from "config"
import { ToolsSection } from "content/ToolsSection"
import { ethers } from "ethers"
import { motion } from "framer-motion"
import { useBank } from "hooks/useBank"
import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRef } from "react"
import { BsArrowUpRight, BsMouse } from "react-icons/bs"
import { middleStringTruncate } from "utils/middleStringTruncate"

enum OperationType {
  Deposit,
  Withdraw
}

const Home: NextPage = () => {
  const contractCardRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const { lastTransfers, deposityMoneyMutation, withdrawMoneyMutation, bankBalance, customerBalance } = useBank()

  const focusContractCard = () => {
    if (contractCardRef.current) {
      contractCardRef.current.style.transform = "scale(1.05)"
      contractCardRef.current.style.transition = "transform 0.6s ease-in-out"
      contractCardRef.current.style.transition = "border 0.3s ease-in-out"
      contractCardRef.current.style.border = "2px solid #fff"

      setTimeout(() => {
        const borderNeutral600 = "#525252"
        contractCardRef.current.style.transform = "scale(1)"
        contractCardRef.current.style.border = `1px solid ${borderNeutral600}`
      }, 300)
    }
  }

  return (
    <>
      <Head>
        <title>Defi Bank</title>
      </Head>
      <hr className="border-neutral-600/50" />
      <div className="flex flex-col gap-16">
        <div className="relative grid h-full grid-cols-2 gap-10 p-4 pt-40 pb-32 my-auto overflow-hidden border-b xl:px-8 xs:grid-cols-1 border-neutral-600/50">
          <div className="z-10 flex flex-col gap-8">
            <div className="flex items-center gap-2 px-4 rounded-full bg-neutral-200 max-w-max">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-semibold">Live on Rinkeby</span>
            </div>
            <h1 className="flex flex-col gap-4 font-semibold text-7xl sm:text-6xl xs:text-6xl">
              <span className="text-white">Start</span>
              <div>
                <span className="text-white">use</span>
                <span className="text-green-500"> Defi</span>
              </div>
              <div>
                <span className="text-green-500">Bank</span>
                <span className="text-white"> Dapp</span>
              </div>
            </h1>
            <p className="text-gray-300">Explore the crypto world. Save your money in Defi Bank</p>
            <button className="flex items-center gap-2 p-2 px-4 transition-all bg-green-500 rounded-md max-w-max hover:scale-105" onClick={focusContractCard}>
              <span className="font-semibold">{"Let's Get Started"}</span>
              <BsArrowUpRight className="" />
            </button>
          </div>
          <div className="z-10 flex flex-col items-center gap-2">
            <ContractCard
              ref={contractCardRef}
              totalValueLocked={bankBalance}
              totalBalance={customerBalance}
              depositMutation={deposityMoneyMutation}
              withdrawMutation={withdrawMoneyMutation} />
            <motion.div
              className="absolute left-0 right-0 flex gap-24 mx-auto top-4"
              variants={sideAnimationRightVariants}
              initial="hidden"
              animate="visible"
            >
              { lastTransfers?.transfers?.map((transfer: any) => {
                const isBankAddress = (address: string) => {
                  return address === BANK_ADDRESS?.toLocaleLowerCase()
                }

                const sender = middleStringTruncate(isBankAddress(transfer.from) ? transfer.to : transfer.from, 6, 6)
                const amount = ethers.utils.formatEther(transfer.amount)
                const operationType = isBankAddress(transfer.from) ? OperationType.Withdraw : OperationType.Deposit
                return (
                  <TransactionCard
                    key={transfer.id}
                    address={sender}
                    amount={amount}
                    operationType={operationType} />
                )
              })}
            </motion.div>
          </div>
          <div className="absolute bottom-0 w-[100%] h-[25rem]">
            <Image
              src="/images/PerspectiveGrid.svg"
              layout="fill"
              objectFit="cover" />
          </div>
          <div className="absolute right-0 bottom-0 bg-gradient-to-l from-green-600/10 to-neutral-900/10 w-[50%] h-full">
          </div>
        </div>
        <div className='flex items-center justify-center gap-6'>
          <hr className='w-40 border-neutral-600/50' />
          <BsMouse className="text-white" />
          <hr className='w-40 border-neutral-600/50' />
        </div>
        <section className="flex flex-col gap-8">
          <h2 className="text-3xl font-bold text-center text-white">Powered By</h2>
          <ToolsSection />
        </section>
      </div>
    </>
  )
}

export default Home
