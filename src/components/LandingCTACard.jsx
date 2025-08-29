import coin from "/images/go-coin.svg";

const LandingCTACard = ({ children }) => {
  return (
    <div className="h-[526px] w-full rounded-[30px] bg-gradient-to-b from-[#FFC61D] to-[#FF7A00] flex items-center justify-between p-14 text-[#171717] mt-10">
        <div className="space-y-10">
            {children}
        </div>
        <div className="relative">
            <div className="bg-gradient-to-b from-[#FFC61D] to-[#FF7A00] inset-0 h-full w-full absolute opacity-20"></div>
            <img src={coin} alt="Coin"  />
        </div>
    </div>
  )
}

export default LandingCTACard