import { useMedia } from '@/context/useMedia'
import Image from 'next/image'

const ImageView = () => {
    const { media } = useMedia()
    return (
        <div className="w-full h-full bg-black relative overflow-hidden">
            {media.type === 'photo' && (
                <Image
                    src={media.url}
                    alt={media.title || 'Media'}
                    width={700}
                    height={700}
                    className="w-full h-full object-cover"
                />
            )}
        </div>
    )
}

export default ImageView