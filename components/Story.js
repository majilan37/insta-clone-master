

function Story({img, username}) {
    return (
        <div className="flex flex-col hover:scale-110 transition-all duration-200 ease-out">
            <img className="h-14 w-14 rounded-full object-cover object-center p-[1.5px] 
                border-red-500 border-2 cursor-pointer" 
                src={img} 
                alt='' 
            />
            <p className="text-xs w-14 truncate text-center">{username}</p>
        </div>
    )
}

export default Story
