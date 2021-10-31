import faker from "faker"
import { useEffect, useState } from "react"

function Suggestions() {
    const [suggestions, setSuggestions] = useState()
    useEffect(() => {
        const suggestions = [...Array(5)].map((_,i) => ({
            ...faker.helpers.contextualCard()
        })) 
        setSuggestions(suggestions)
    }, [])
    return (
        <div className="mt-4 ml-10"> 
            <div className="flex justify-between text-sm mb-5">
                <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
                <button className="text-gray-600 font-semibold">See All</button>
            </div>
            {suggestions?.map(suggestion =>(
                <div key={suggestion.id} className='flex items-center justify-between mt-3'>
                    <img className="w-10 h-10 rounded-full p-[2px] border" src={suggestion.avatar} alt="" />  
                    <div className="flex-1 ml-4">
                        <h2 className="font-semibold text-sm">{suggestion.username}</h2>
                        <h3 className="text-xs text-gray-400">Works at {suggestion.company.name}</h3>
                    </div>
                    <button className='text-blue-400 font-semibold text-sm'>Follow</button>
                </div>
            ))}
        </div>
    )
}

export default Suggestions
