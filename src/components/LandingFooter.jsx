import LandingButton from "./LandingButton";
import logoWhite from "/images/logo-white.svg";
import { Icon } from "@iconify/react";

const LandingFooter = () => {
  const links = [
    {
      heading: "Join the waitlist",
      list: ["GoCoin App", "KiQi", "GoCollective"],
    },
    {
      heading: "Visit the website",
      list: ["Farm GoTokens"],
    },
  ];
  return (
    <footer className="bg-[#202020] h-[500px] p-20 text-white space-y-10">
      {/* main content */}
      <div className="flex gap-[100px]">
        <div className="space-y-5">
          <img src={logoWhite} alt="GoCoin" />
          <p className="text-lg leading-10">
            Join the decentralized economy for freelancers and marketers
          </p>
          <LandingButton content="Farm GoCoin Tokens" />
        </div>
        <div className="grid grid-cols-2 gap-20">
          {links.map((link, idx) => (
            <div key={idx} className="space-y-5 text-lg">
              <h4 className="font-bold">{link.heading}</h4>
              {link.list.map((l, id) => (
                <p key={id} className="font-normal">
                  {l}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="space-y-5">
          <h4 className="text-2xl leading-7">Follow Us</h4>
          <div className="flex gap-5 items-center">
            <div className="size-12 rounded-full flex justify-center items-center bg-white hover:bg-[#FBBB27] cursor-pointer">
              <Icon
                icon={"formkit:linkedin"}
                height={25}
                width={25}
                color="#000"
              />
            </div>
            <div className="size-12 rounded-full flex justify-center items-center bg-white hover:bg-[#FBBB27] cursor-pointer">
              <Icon
                icon={"basil:facebook-solid"}
                height={25}
                width={25}
                color="#000"
              />
            </div>
            <div className="size-12 rounded-full flex justify-center items-center bg-white hover:bg-[#FBBB27] cursor-pointer">
              <Icon
                icon={"basil:instagram-solid"}
                height={25}
                width={25}
                color="#000"
              />
            </div>
            <div className="size-12 rounded-full flex justify-center items-center bg-white hover:bg-[#FBBB27] cursor-pointer">
              <Icon
                icon={"flowbite:twitter-solid"}
                height={25}
                width={25}
                color="#000"
              />
            </div>
          </div>
        </div>
      </div>

      {/* divider */}
      <div className="border-t-3 border-white"></div>
      {/* copyright */}
      <p className="text-lg font-medium leading-7 text-center">
        &copy; 2025 GoCoin
      </p>
    </footer>
  );
};

export default LandingFooter;
