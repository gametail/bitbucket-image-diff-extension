import { useContainerContext } from "@/components/container/ContainerContext";
import useImageComparison from "./useImageComparison";
import { ImCheckmark } from "react-icons/im";
import { CgSpinner } from "react-icons/cg";
import { PixelmatchOptions } from "pixelmatch";
import Checkerboard from "../Checkerboard";

type ImageDifferProps = {
    className?: string;
};
const ImageDiffer = ({ className }: ImageDifferProps) => {
    const theme = useTheme();
    const { light, dark } = COLOR_CONFIG_MAP["blue"];

    const bg = cn({ [light.bg]: theme === "light", [dark.bg]: theme === "dark" });
    const text = cn({ [light.text]: theme === "light", [dark.text]: theme === "dark" });
    const border = cn({ [light.border]: theme === "light", [dark.border]: theme === "dark" });

    const { light: lightGreen, dark: darkGreen } = COLOR_CONFIG_MAP["green"];

    const bgSuccess = cn({ [lightGreen.bg]: theme === "light", [darkGreen.bg]: theme === "dark" });
    const textSuccess = cn({ [lightGreen.text]: theme === "light", [darkGreen.text]: theme === "dark" });
    const borderSuccess = cn({ [lightGreen.border]: theme === "light", [darkGreen.border]: theme === "dark" });

    const imgRef = useRef<HTMLImageElement>(null);

    const {
        oldImgRef,
        newImgRef,
        antialiasingIncluded,
        antialiasingColorValue,
        alphaValue,
        diffColorValue,
        diffAltColorEnabled,
        diffAltColorValue,
        diffMaskEnabled,
        thresholdValue,
    } = useContainerContext();

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pixelmatchOptions: PixelmatchOptions = {
        includeAA: antialiasingIncluded,
        aaColor: hexToRGBTuple(antialiasingColorValue),
        alpha: alphaValue,
        diffColor: hexToRGBTuple(diffColorValue),
        diffColorAlt: diffAltColorEnabled ? hexToRGBTuple(diffAltColorValue) : undefined,
        diffMask: diffMaskEnabled,
        threshold: thresholdValue,
    };

    const { diffImage, diffCount, canvasWidth, canvasHeight } = useImageComparison(
        oldImgRef,
        newImgRef,
        canvasRef,
        pixelmatchOptions,
    );

    const hasNoDiffs = diffCount === 0;

    return (
        <div
            className={cn(
                "flex flex-col items-center justify-between box-border p-4",
                bg,
                { [bgSuccess]: hasNoDiffs },
                className,
            )}
        >
            <div className="flex-1 flex flex-col items-center w-full">
                <p className={cn("uppercase", text, { [textSuccess]: hasNoDiffs })}>Diff</p>
                <div className="relative flex-1 items-center flex flex-col">
                    <Checkerboard
                        imageRef={imgRef}
                        className={cn("absolute inset-0 my-4", {
                            invisible: !diffMaskEnabled,
                        })}
                    />

                    {diffImage ? (
                        <img
                            src={diffImage}
                            ref={imgRef}
                            alt="Image Diff"
                            className={cn(
                                "my-4 rounded-[3px] border-solid border-[3px] w-full max-h-[650px] object-contain z-10",
                                border,
                                {
                                    [borderSuccess]: hasNoDiffs,
                                },
                            )}
                        />
                    ) : (
                        <div
                            className={cn(
                                "flex-1 my-4 rounded-[3px] uppercase text-4xl border-solid border-[3px] flex flex-col justify-center items-center font-bold w-full text-center p-4 gap-4",
                                border,
                            )}
                        >
                            <p>Loading Diff</p>
                            <CgSpinner
                                size={40}
                                className="animate-spin"
                            />
                        </div>
                    )}
                    {hasNoDiffs && (
                        <div
                            className={cn(
                                "absolute z-10 flex justify-center items-center flex-col inset-0",
                                bgSuccess,
                                "bg-opacity-75",
                            )}
                        >
                            <ImCheckmark
                                className={textSuccess}
                                size={100}
                            />
                            <p className={cn("text-4xl font-bold uppercase text-pretty", textSuccess)}>No diffs</p>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <span className="font-bold">W: </span>
                {canvasWidth ? (
                    <span className={cn(text, { [textSuccess]: hasNoDiffs })}>{canvasWidth}</span>
                ) : (
                    <CgSpinner className="animate-spin inline-block" />
                )}{" "}
                | <span className="font-bold">H: </span>
                {canvasHeight ? (
                    <span className={cn(text, { [textSuccess]: hasNoDiffs })}>{canvasHeight}</span>
                ) : (
                    <CgSpinner className="animate-spin inline-block" />
                )}
            </div>
            <canvas
                ref={canvasRef}
                style={{ display: "none" }}
            />
        </div>
    );
};

export default ImageDiffer;
