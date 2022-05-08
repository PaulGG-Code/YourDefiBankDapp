import { CustomLink } from "components/CustomLink"
import Image from "next/image"

export const ToolsSection = () => {
  return (
    <div className="grid grid-cols-3 xs:grid-cols-1 xs:h-auto xs:gap-8 xs:py-4 h-[8rem] place-items-center bg-neutral-600/20 px-4">
      <CustomLink href="https://cadena.dev/" className="flex items-center justify-center w-[100%] h-[100%] hover:bg-neutral-800 hover:scale-105 transition-all">
        <div>
          <Image
            src="/images/CadenaLogo.png"
            alt="tools"
            width={167}
            height={40} />
        </div>
      </CustomLink>
      <CustomLink href="https://ethereum.org/" className="flex items-center justify-center w-[100%] h-[100%] hover:bg-neutral-800 hover:scale-105 transition-all">
        <div>
          <Image
            src="/images/EthLogo.png"
            alt="tools"
            width={169}
            height={50} />
        </div>
      </CustomLink>
      <CustomLink href="https://thegraph.com/" className="flex items-center justify-center w-[100%] h-[100%] hover:bg-neutral-800 hover:scale-105 transition-all">
        <div>
          <Image
            src="/images/TheGraphLogo.png"
            alt="tools"
            width={170}
            height={39} />
        </div>
      </CustomLink>
    </div>
  )
}
