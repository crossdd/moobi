'use client'

import {
    useState,
    useContext,
    createContext,
    ReactNode,
    Dispatch,
    SetStateAction,
} from 'react'

type MediaType = 'photo' | 'video'

interface ContextType {
    media: {
        type: MediaType,
        url: string,
        title: string
    }
    setMedia: Dispatch<SetStateAction<{
        type: MediaType;
        url: string;
        title: string;
    }>>
}

const INIT_STATE: ContextType = {
    media: {
        type: 'video',
        url: '',
        title: ''
    },
    setMedia: () => { }
}

const MediaContext = createContext<ContextType>(INIT_STATE)

const MediaProvider = ({ children }: { children: ReactNode }) => {
    const [media, setMedia] = useState({
        type: 'video' as MediaType,
        url: '',
        title: ''
    })

    return (
        <MediaContext.Provider value={{ media, setMedia }}>
            {children}
        </MediaContext.Provider>
    )
}

const useMedia = () => useContext(MediaContext)

export { useMedia, MediaProvider }
