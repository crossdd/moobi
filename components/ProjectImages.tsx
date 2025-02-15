import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "./ui/card"

export const ProjectImages = ({ images, title }: { images: string[], title: string }) => {
    return (
        <Carousel className="w-full max-h-[60vh]">
            <CarouselContent>
                {images.map((image, index) => (
                    <CarouselItem key={index}>
                        <Card className="w-full h-[40vh] lg:h-[45vh] relative">
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                <Image src={image} alt={title} width={480} height={480} className="absolute inset-0 w-full top-1/2 -translate-y-1/2 h-auto object-cover hover:scale-110 transition-all duration-500 ease-in-out rounded-lg" />
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}