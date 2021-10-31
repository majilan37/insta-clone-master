import faker from 'faker'
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Story from './Story';
function Stories() {
    const [fakeUsers, setFakeUsers] = useState();
    const {data: session} = useSession();
    useEffect(() => {
        const suggestions = [...Array(20)].map((_,i) => ({
            ...faker.helpers.contextualCard(),
            id: i,
        }))
        setFakeUsers(suggestions)
    }, [])
    return (
        <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm 
            overflow-x-scroll scrollbar-thin scrollbar-thumb-black">
            {session && (
                <Story img={session.user.image} username={session.user.name} />
            )}
            {fakeUsers?.map((profile) => (
                <Story key={profile.id} img={profile.avatar} username={profile.username} />
            ))}
        </div>
    )
}

export default Stories
