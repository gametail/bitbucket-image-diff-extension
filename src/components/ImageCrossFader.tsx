import { useContainerContext } from "@/components/container/ContainerContext";
import { ColorNames } from "@/utils/colors";

type ImageCrossFaderProps = {
    oldColor: ColorNames;
    newColor: ColorNames;
    className?: string;
};
const ImageCrossFader = ({ className, oldColor, newColor }: ImageCrossFaderProps) => {
    const { newImg, oldImg, crossfadeValue } = useContainerContext();

    return (
        <div className={cn("relative", className)}>
            <ImageWrapper
                titleAlign="left"
                color={oldColor}
                src={oldImg.src}
                title={oldImg.title}
            />
            <p className="uppercase absolute mt-0 top-4 w-full z-10 text-center">Diff</p>
            <ImageWrapper
                className="absolute inset-0"
                color={newColor}
                src={newImg.src}
                title={newImg.title}
                titleAlign="right"
                style={{ opacity: crossfadeValue }}
            />
        </div>
    );
};

export default ImageCrossFader;
