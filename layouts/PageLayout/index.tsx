import { Background } from "components/Background"
import { CustomLink } from "components/CustomLink"
import { Footer } from "components/Footer"
import { Logo } from "components/Logo"
import { Wallet } from "components/Wallet"
import { FC, ReactNode, useState } from "react"
import { HiMenu } from "react-icons/hi"
import Popup from "reactjs-popup"

type PageLayoutProps = {
  children: ReactNode
}

export const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  const [isOpen, setOpen] = useState(false)

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <Background>
      <div className="flex flex-col min-h-screen xl:container xl:mx-auto">
        <header className="z-10 flex items-center min-h-[76px] justify-between px-4 py-4 xl:px-8">
          <div className="flex divide-x divide-gray-500">
            <CustomLink className="pr-5" href="/">
              <Logo />
            </CustomLink>
          </div>
          <div className="flex items-center gap-4 xs:hidden">
            <Wallet />
          </div>
          <Popup
            open={isOpen}
            onClose={closeModal}
            trigger={
              <button className="hidden xs:flex">
                <HiMenu color="gray" size={24} />
              </button>
            }
            modal
            overlayStyle={{ marginTop: "60px", backgroundColor: "rgba(23,23,23,0.95)" }} >
            <div className="flex flex-col w-screen h-screen gap-8 place-content-center">
              <div className="flex justify-center gap-8">
                <Wallet />
              </div>
            </div>
          </Popup>
        </header>
        <main className="flex flex-col grow">
          {children}
        </main>
        <footer className="flex justify-center p-4 rounded-t-md">
          <Footer />
        </footer>
      </div>
    </Background>
  )
}
