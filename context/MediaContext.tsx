'use client';

import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState,} from 'react';
import {gallery} from '@/constants';
import {type MediaItem, type MediaType, type MusicPlayerScreen, type ScreenOptions} from "@/types";

interface Media {
    type: MediaType;
    url: string;
    title: string;
}

// type ScreenUnion = ScreenOptions | BrowserScreen | MusicPlayerScreen

interface ContextType {
    projectId: string
    setProjectId:  Dispatch<SetStateAction<string>>;
    media: Media;
    setMedia: Dispatch<SetStateAction<Media>>;
    allMedia: MediaItem[];
    setAllMedia: Dispatch<SetStateAction<MediaItem[]>>;
    currentScreen: ScreenOptions;
    setCurrentScreen: Dispatch<SetStateAction<ScreenOptions>>;
    lastScreen: ScreenOptions;
    setLastScreen: Dispatch<SetStateAction<ScreenOptions>>;
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
    currentScreen: 'boot',
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

    const [lastScreen, setLastScreen] = useState<ScreenOptions>("home")
    const [currentScreen, setCurrentScreen] = useState<ScreenOptions>('boot');

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
