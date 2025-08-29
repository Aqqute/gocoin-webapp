import coin from "/images/go-coin.svg";

const LandingCTACard = ({ children }) => {
  return (
    <div className="h-fit md:h-[526px] w-full rounded-[30px] bg-gradient-to-b from-[#FFC61D] to-[#FF7A00] flex items-center justify-between p-2.5 py-8 md:py-0 md:p-14 text-[#171717] mt-10">
        <div className="space-y-10 flex justify-center items-center flex-col md:block">
            {children}
        </div>
        <div className="relative hidden sm:block">
            <div className="bg-gradient-to-b from-[#FFC61D] to-[#FF7A00] inset-0 h-full w-full absolute opacity-20"></div>
            <img src={coin} alt="Coin"  />
        </div>
    </div>
  )
}

export default LandingCTACard