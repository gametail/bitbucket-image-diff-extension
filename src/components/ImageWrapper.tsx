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
    const { light, dark } = COLOR_CONFIG_MAP[color];
    const theme = useTheme();
    const bg = cn({ [light.bg]: theme === "light", [dark.bg]: theme === "dark" });
    const text = cn({ [light.text]: theme === "light", [dark.text]: theme === "dark" });
    const border = cn({ [light.border]: theme === "light", [dark.border]: theme === "dark" });

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
                <div className="relative object-contain">
                    <img
                        ref={setRefs}
                        className={cn("my-4 rounded-[3px] border-solid border-[3px] w-full max-h-[650px]", border)}
                        src={src}
                    />
                </div>
            </div>
            <div>
                <span className="font-bold text-base-content">W: </span>
                <span className={text}>{imgWidth}</span> | <span className="font-bold text-base-content">H: </span>
                <span className={text}>{imgHeight}</span>
            </div>
        </div>
    );
};

export default ImageWrapper;
