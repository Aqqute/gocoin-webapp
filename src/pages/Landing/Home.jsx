import LandingButton from "../../components/LandingButton";
import LandingNavigation from "../../components/LandingNavigation";
import backgroundSvg from "/images/go-coin-hero-bg-black.svg";
import backgroundSvgGray from "/images/go-coin-hero-bg-gray.svg";
import earnNow from "/images/earn-now.svg";
import ownWorth from "/images/own-worth.svg";
import vector from "/images/Vector.svg";
import LandingCTACard from "../../components/LandingCTACard";
import { Coffee } from "lucide-react";
import LandingFooter from "../../components/LandingFooter";

function Tab({ children, isUppercase = true }) {
  return (
    <div className="h-fit md:h-11 w-4/5 md:w-fit border border-white rounded-xl py-2 px-5 flex justify-center items-center text-center mx-24 md:mx-0">
      <p className={isUppercase ? "uppercase text-sm" : "text-base"}>
        {children}
      </p>
    </div>
  );
}

export default function LandingHome() {
  const cards = [
    {
      heading: "For Brands",
      list: [
        {
          title: "Campaign Execution",
          content: "Leverage Go Coin App to incentivize fan‑driven marketing.",
        },
        {
          title: "On‑Demand Talent",
          content:
            "Tap a global pool of Creatives for design, copy, video, and more.",
        },
        {
          title: "Analytics & Insights",
          content:
            "Real‑time dashboards show campaign ROI in token and fiat terms.",
        },
      ],
    },
    {
      heading: "For Creatives",
      list: [
        {
          title: "Post & Earn",
          content:
            "Offer gigs on Go Collective and get paid in GoC—no waiting, no hidden fees.",
        },
        {
          title: "Task Rewards",
          content:
            "Complete in‑app micro‑tasks (social shares, reviews, content creation) to farm extra GoC.",
        },
        {
          title: "DAO Grants",
          content:
            "Pitch your passion project and win community‑voted funding.",
        },
      ],
    },
  ];

  const whatYouCanDoWithGoC = [
    "Get paid instantly for freelance gigs on Go Collective",
    "Earn from marketing tasks with the Go Coin App",
    "Govern the future of the platform via the Creative DAO",
    "Stake, farm, and burn to earn rewards",
    
  ];

  return (
    <>
      <section className="h-full md:h-screen bg-[#0A0A0A] relative pb-10 md:pb-0">
        <LandingNavigation />
        <img
          src={backgroundSvg}
          className="absolute inset-0 z-0 w-full h-full object-cover"
        />

        {/* hero */}
        <div className="flex flex-col justify-center items-center relative z-10 my-20 text-[#E1E1E1] space-y-8">
          <Tab>
            Join the decentralized economy for freelancers and marketers
          </Tab>
          <h1 className="font-medium text-[45px] md:text-8xl text-center">
            <span>The Future of <br className="block md:hidden" />Creativity is</span>
            <span className="block text-[#FBBB27]">Borderless</span>
          </h1>
          <p className="text-lg md:text-2xl text-center font-normal w-[264px] md:w-[600px] leading-10">
            Go Coin is the token that lets Creatives and Brands connect, engage,
            and earn—instantly and borderlessly.
          </p>

          <div className="flex flex-col md:flex-row gap-6 items-center">
            <LandingButton content="Farm GoC Tokens" />
            <LandingButton content="Read Litepaper" variant="secondary" />
          </div>
        </div>
      </section>

      <section className="bg-[#121212] text-[#E6E6E6] flex flex-col justify-center items-center py-20 gap-5 md:gap-10 px-5 md:px-20">
        <Tab isUppercase={false}>Why GoCoin?</Tab>
        <h2 className="font-semibold text-2xl md:text-6xl text-center md:leading-16">
          Go Coin is a utility token powering a{" "}
          <br className="hidden md:block" /> decentralized economy for
          creatives.
        </h2>
        <p className="text-sm md:text-2xl leading-5 md:leading-10 text-center">
          Go Coin fuses a Proof‑of‑Activity model with a deflationary token{" "}
          <br className="hidden md:block" /> economy—built on Solana and bridged
          across Ethereum, BSC & Polygon.
        </p>

        {/* grid boxes */}
        <div className="mt-10 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-[30px]">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#171717] h-[545px] w-full md:w-[650px] flex justify-center items-center flex-col gap-6 rounded-[30px] space-y-6"
            >
              <h4 className="font-semibold text-2xl md:text-[40px]">{card.heading}</h4>
              <ul className="list-disc md:w-[565px] text-base md:text-xl space-y-6 px-10">
                {card.list.map((l, id) => (
                  <li key={id}>
                    <span className="font-semibold">{l.title}: </span>
                    <span>{l.content}</span>
                  </li>
                ))}
              </ul>
              <LandingButton variant="secondary" content="Farm GoC Tokens" />
            </div>
          ))}

          {/* boxes with images */}
          <div className="bg-[#171717] md:h-[600px] rounded-[30px] relative">
            <img
              src={backgroundSvgGray}
              className="absolute inset-0 z-0 w-full h-full object-cover"
            />
            <div className="relative z-10 flex flex-col items-center justify-between h-full pt-9 gap-8 md:gap-0">
              <h4 className="font-semibold text-2xl md:text-[40px] text-center">
                Earn now on the GoCoin <br className="hidden md:block" /> App
              </h4>
              <img src={earnNow} alt="Earn Now" className="w-[288px] md:w-[400px]" />
            </div>
          </div>
          <div className="bg-[#171717] md:h-[600px] rounded-[30px] relative">
            <img
              src={backgroundSvgGray}
              className="absolute inset-0 z-0 w-full h-full object-cover"
            />
            <div className="relative z-10 flex flex-col items-center justify-between h-full pt-9 gap-8 md:gap-0">
              <h4 className="font-semibold text-2xl md:text-[40px] text-center">
                Own your worth wih <br className="hidden md:block" /> GoCoin
              </h4>
              <img src={ownWorth} alt="Earn Now" className="w-[288px] md:w-[400px]" />
            </div>
          </div>
        </div>

        {/* What You Can Do with GoC */}
        <div className="h-[548px] bg-[#171717] w-full rounded-[30px] relative">
            <img
              src={backgroundSvgGray}
              className="absolute inset-0 z-0 w-full h-full object-cover"
            />
            <div className="relative z-10 flex flex-col items-center justify-between h-[500px] md:h-full p-5 md:p-10">
                <h4 className="font-semibold text-2xl md:text-[40px] text-center mt-2.5 md:mt-5">What You Can Do with GoC</h4>
                <div className="space-y-3.5 md:space-y-[19px] w-full">
                    {whatYouCanDoWithGoC.map((tab, id) => (
                        <div key={id} className="h-[67px] rounded-lg border border-black/10 bg-black/10 py-3.5 px-5 md:px-[37px] flex items-center gap-3">
                            <img src={vector} alt="Icon" />
                            <p className="text-sm md:text-xl leading-5 md:leading-10">{tab}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* How GoCoin  Works */}
        <div className="flex justify-center items-center flex-col">
            <h4 className="font-semibold text-2xl md:text-[40px] text-center mt-5">How GoCoin Works</h4>
            <ul className="list-decimal text-sm md:text-2xl leading-5 md:leading-[31px] space-y-6 mt-8 mb-12 flex flex-col items-center ml-5 md:ml-0">
                <li>Earn Your Token: Creatives farm GoC by completing micro‑tasks or delivering projects.</li>
                <li>Use or Stake: Spend GoC on tools, subscriptions, or stake for yield.</li>
                <li>Govern & Grow: Vote on platform upgrades, funding rounds, and strategic partnerships.</li>
            </ul>
            <LandingButton content="Download the GoCoin App" />
        </div>


        <LandingCTACard>
            <div className="uppercase border border-[#171717] rounded-lg h-11 md:h-10 flex items-center gap-1 px-5 font-medium text-[#171717] text-xs md:text-base w-fit">
                <Coffee />
                <p className="whitespace-nowrap">Download and start farming</p>
            </div>
            <h3 className="font-bold text-2xl md:text-[40px] leading-8 md:leading-11 text-center md:text-start">Ready to Join and <br className="hidden md:block"/> Earn GoCoins?</h3>
            <p className="text-[#212121] text-sm md:text-lg font-normal text-center md:text-start">The platform that rewards your creativity and powers <br className="hidden md:block"/> your brand’s campaigns is here</p>
            <LandingButton variant="black" content="Download the GoCoin App" />
        </LandingCTACard>
      </section>

      <LandingFooter/>
    </>
  );
}
