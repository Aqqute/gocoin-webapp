import { ArrowUpRight } from "lucide-react";

const LandingButton = ({
    content = "",
    variant = "primary", // primary, secondary, black
}) => {
    // Define variant styles
    const variants = {
        primary: {
            className: "bg-[#FBBB27] text-black hover:bg-[#e6a821]",
            iconColor: "#000"
        },
        secondary: {
            className: "bg-transparent text-white border border-white hover:bg-white hover:text-black",
            iconColor: "#fff"
        },
        black: {
            className: "bg-[#171717] text-[#FBBB27] border-2 border-[#FBBB27] hover:bg-[#FBBB27] hover:text-[#171717]",
            iconColor: "#FBBB27"
        }
    };

    // Get the current variant styles
    const currentVariant = variants[variant] || variants.primary;

    // Base classes that apply to all variants
    const baseClasses = "h-[60px] p-6 rounded-[10px] gap-2 flex justify-center items-center cursor-pointer transition-all duration-300 font-bold";

    // Combine base classes with variant-specific classes
    const buttonClasses = `${baseClasses} ${currentVariant.className}`;

    return (
        <button className={buttonClasses}>
            {content}
            <ArrowUpRight size={20} color={currentVariant.iconColor} />
        </button>
    );
};

export default LandingButton;