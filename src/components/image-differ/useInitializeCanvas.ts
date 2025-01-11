import { RefObject, useLayoutEffect } from "react";

function useInitializeCanvas(
    oldImgRef: RefObject<HTMLImageElement | null>,
    newImgRef: RefObject<HTMLImageElement | null>,
    canvasRef: RefObject<HTMLCanvasElement | null>,
) {
    const [canvasWidth, setCanvasWidth] = useState<number | null>(0);
    const [canvasHeight, setCanvasHeight] = useState<number | null>(0);
    const [canvasCtx, setCanvasCtx] = useState<CanvasRenderingContext2D | null>(null);

    useLayoutEffect(() => {
        const initializeCanvas = async () => {
            if (!oldImgRef.current || !newImgRef.current || !canvasRef.current) return;

            const oldImg = oldImgRef.current;
            const newImg = newImgRef.current;

            // Wait for both images to load
            await Promise.all([
                new Promise<void>((resolve) => {
                    if (oldImg.complete) resolve();
                    else oldImg.onload = () => resolve();
                }),
                new Promise<void>((resolve) => {
                    if (newImg.complete) resolve();
                    else newImg.onload = () => resolve();
                }),
            ]);

            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d", { willReadFrequently: true });
            if (!ctx) return;

            // Set canvas dimensions based on natural image sizes
            const width = Math.max(oldImg.naturalWidth, newImg.naturalWidth);
            const height = Math.max(oldImg.naturalHeight, newImg.naturalHeight);
            canvas.width = width;
            canvas.height = height;

            setCanvasWidth(width);
            setCanvasHeight(height);
            setCanvasCtx(ctx);
        };

        initializeCanvas();
    }, [oldImgRef, newImgRef, canvasRef]);

    return {
        canvasWidth,
        canvasHeight,
        canvas: canvasRef.current,
        ctx: canvasCtx,
    };
}

export default useInitializeCanvas;
