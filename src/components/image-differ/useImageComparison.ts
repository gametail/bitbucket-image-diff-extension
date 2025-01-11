import pixelmatch, { PixelmatchOptions } from "pixelmatch";
import { RefObject } from "react";
import useInitializeCanvas from "./useInitializeCanvas";

function useImageComparison(
    oldImgRef: RefObject<HTMLImageElement | null>,
    newImgRef: RefObject<HTMLImageElement | null>,
    canvasRef: RefObject<HTMLCanvasElement | null>,
    pixelmatchOptions?: PixelmatchOptions,
) {
    const [diffImage, setDiffImage] = useState<string | null>(null);
    const [diffCount, setDiffCount] = useState<number | null>(null);

    const { canvasWidth, canvasHeight } = useInitializeCanvas(oldImgRef, newImgRef, canvasRef);

    useEffect(() => {
        const compareImages = async () => {
            if (!oldImgRef.current || !newImgRef.current || !canvasRef.current || !canvasWidth || !canvasHeight) return;

            const oldImg = oldImgRef.current;
            const newImg = newImgRef.current;
            const canvas = canvasRef.current;

            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            if (!ctx) return;

            // Draw images onto the canvas
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(oldImg, 0, 0, oldImg.naturalWidth, oldImg.naturalHeight);
            const oldImgData = ctx.getImageData(0, 0, oldImg.naturalWidth, oldImg.naturalHeight);

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(newImg, 0, 0, newImg.naturalWidth, newImg.naturalHeight);
            const newImgData = ctx.getImageData(0, 0, newImg.naturalWidth, newImg.naturalHeight);

            // Create an ImageData object to store the diff result
            const diffData = ctx.createImageData(canvasWidth, canvasHeight);

            // Use pixelmatch to compute the diff
            const diffCount = pixelmatch(
                oldImgData.data,
                newImgData.data,
                diffData.data,
                canvasWidth,
                canvasHeight,
                pixelmatchOptions,
            );

            setDiffCount(diffCount);

            // Put the diff data onto the canvas
            ctx.putImageData(diffData, 0, 0);

            // Convert the canvas to a data URL for rendering the diff
            const diffImageUrl = canvas.toDataURL();
            setDiffImage(diffImageUrl);
        };

        compareImages();
    }, [oldImgRef, newImgRef, canvasRef, canvasWidth, canvasHeight, pixelmatchOptions]);

    return { diffImage, diffCount, canvasWidth, canvasHeight };
}

export default useImageComparison;
