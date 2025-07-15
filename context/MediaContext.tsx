'use client';

import {
    useState,
    useContext,
    createContext,
    ReactNode,
    Dispatch,
    SetStateAction,
} from 'react';
import { gallery } from '@/constants';
import {type MediaItem, type MediaType, type ScreenDisplay} from "@/types";

interface Media {
    type: MediaType;
    url: string;
    title: string;
}

interface ContextType {
    projectId: string
    setProjectId:  Dispatch<SetStateAction<string>>;
    media: Media;
    setMedia: Dispatch<SetStateAction<Media>>;
    allMedia: MediaItem[];
    setAllMedia: Dispatch<SetStateAction<MediaItem[]>>;
    currentScreen: ScreenDisplay;
    setCurrentScreen: Dispatch<SetStateAction<ScreenDisplay>>;
    lastScreen: ScreenDisplay;
    setLastScreen: Dispatch<SetStateAction<ScreenDisplay>>;
    goToNextMedia: () => void;
    goToPreviousMedia: () => void;
}

const defaultMedia: Media = {
    type: 'photo',
    url: '',
    title: '',
};

const defaultAllMedia= gallery.flatMap(group => group.items);

const INIT_STATE: ContextType = {
    projectId: "",
    setProjectId: () => {},
    media: defaultMedia,
    setMedia: () => {},
    allMedia: defaultAllMedia as MediaItem[],
    setAllMedia: () => {},
    currentScreen: 'lock',
    setCurrentScreen: () => {},
    lastScreen: 'lock',
    setLastScreen: () => {},
    goToNextMedia: () => {},
    goToPreviousMedia: () => {},
};

const MediaContext = createContext<ContextType>(INIT_STATE);

const MediaProvider = ({ children }: { children: ReactNode }) => {
    const [media, setMedia] = useState<Media>(defaultMedia);
    const [projectId, setProjectId] = useState<string>("");

    const [lastScreen, setLastScreen] = useState<ScreenDisplay>("home")
    const [currentScreen, setCurrentScreen] = useState<ScreenDisplay>('lock');

    const [allMedia, setAllMedia] = useState<MediaItem[]>(defaultAllMedia as MediaItem[]);

    const currentIndex = allMedia.findIndex(item => item.thumbnail === media.url);

    const goToMedia = (index: number) => {
        const item = allMedia[index];
        setMedia({
            type: item.type,
            url: item.thumbnail,
            title: item.title || '',
        });
        setCurrentScreen(item.type === 'video' ? 'video-player' : 'image-view');
    };

    const goToNextMedia = () => {
        if (allMedia.length === 0) return;
        const nextIndex = (currentIndex + 1) % allMedia.length;
        goToMedia(nextIndex);
    };

    const goToPreviousMedia = () => {
        if (allMedia.length === 0) return;
        const prevIndex = (currentIndex - 1 + allMedia.length) % allMedia.length;
        goToMedia(prevIndex);
    };

    return (
        <MediaContext.Provider
            value={{
                projectId,
                setProjectId,
                media,
                setMedia,
                allMedia,
                setAllMedia,
                currentScreen,
                setCurrentScreen,
                lastScreen,
                setLastScreen,
                goToNextMedia,
                goToPreviousMedia,
            }}
        >
            {children}
        </MediaContext.Provider>
    );
};

const useMedia = () => useContext(MediaContext);

export { MediaProvider, useMedia };
