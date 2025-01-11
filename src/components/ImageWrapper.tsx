import { useContainerContext } from "@/components/container/ContainerContext";
import { useImageSize } from "@/hooks/useImageSize";

type ImageWrapperProps = {
    src: string | undefined;
    color: ColorNames;
    title: string;
    titleAlign?: "left" | "center" | "right";
    className?: string;
    style?: React.CSSProperties;
    ref?: "old" | "new";
};
const ImageWrapper = ({ ref, title, titleAlign = "center", src, color, className, style }: ImageWrapperProps) => {
    const { bg, border, text } = COLOR_CONFIG_MAP[color];
    const { oldImgRef, newImgRef } = useContainerContext();

    const { imgRef, imgHeight, imgWidth } = useImageSize();

    const setRefs = useCallback((node: HTMLImageElement) => {
        imgRef.current = node;
        if (ref === "old") oldImgRef.current = node;
        if (ref === "new") newImgRef.current = node;
    }, []);

    return (
        <div
            className={cn("flex flex-col items-center justify-between box-border p-4", bg, className)}
            style={{ ...style }}
        >
            <div className="flex-1 flex flex-col items-center w-full">
                <div
                    className={cn("uppercase w-full px-8", text, {
                        "text-left": titleAlign === "left",
                        "text-center": titleAlign === "center",
                        "text-right": titleAlign === "right",
                    })}
                >
                    {title}
                </div>
                <div className="relative w-full">
                    <img
                        ref={setRefs}
                        className={cn("my-4 rounded-[3px] border-solid border-[3px] w-full", border)}
                        src={src}
                    />
                </div>
            </div>
            <div>
                <span className="font-bold">W: </span>
                <span className={text}>{imgWidth}</span> | <span className="font-bold">H: </span>
                <span className={text}>{imgHeight}</span>
            </div>
        </div>
    );
};

export default ImageWrapper;
