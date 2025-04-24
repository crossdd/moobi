'use client';

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

const PreviewImage = () => {
    const [showBlur, setShowBlur] = useState(false);
    const [showImage, setShowImage] = useState(false);

    useEffect(() => {
        const blurTimer = setTimeout(() => setShowBlur(true), 800);
        const imageTimer = setTimeout(() => {
            setShowBlur(false);
            setShowImage(true);
        }, 5000);

        return () => {
            clearTimeout(blurTimer);
            clearTimeout(imageTimer);
        };
    }, []);

    return (
        <div className="w-[200px] h-[200px] flex-center">
            <Image
                src="/images/profile.jpg"
                alt="profile"
                width={200}
                height={200}
                loading="lazy"
                className={cn("rounded-full transition-all duration-500 delay-150 ease-in-out opacity-0 blur-0", {
                    "opacity-50 blur-sm": showBlur,
                    "opacity-100 blur-0": showImage,
                })}
            />
        </div>
    );
};

export default PreviewImage;
