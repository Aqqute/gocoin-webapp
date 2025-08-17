export default function Button({
    content,
    icon,
    isDisabled,
    onClick
}) {
    return (
        <button onClick={onClick} className={`${isDisabled ? 'bg-[#DEDFE4] text-[#919297]' : 'bg-[#F69626] hover:bg-[#f69526ea] text-white'} h-12 w-full rounded-full flex justify-center items-center gap-2 cursor-pointer`}>
            {icon && icon}
            <p className="font-bold text-base leading-4">{content}</p>
        </button>
    )
}