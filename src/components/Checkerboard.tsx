import { RefObject } from "react";

type CheckerboardProps = {
    className?: string;
    squareSize?: number;
    imageRef: RefObject<HTMLImageElement | null>;
};
const Checkerboard = ({ squareSize = 15, className, imageRef }: CheckerboardProps) => {
    const [width, setWidth] = useState<number | null>(null);
    const [height, setHeight] = useState<number | null>(null);

    useEffect(() => {
        if (!imageRef.current) return;

        const { width, height } = imageRef.current;

        setWidth(Math.floor(width / squareSize) * squareSize);
        setHeight(Math.floor(height / squareSize) * squareSize);
    }, [imageRef]);

    const checkerboardStyle = {
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: "#fff",
        backgroundImage: `
      linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc),
      linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)
    `,
        backgroundSize: `${squareSize}px ${squareSize}px`,
        backgroundPosition: `0 0, ${squareSize / 2}px ${squareSize / 2}px`,
    };

    return (
        <div
            className={cn("", className)}
            style={checkerboardStyle}
        ></div>
    );
};

export default Checkerboard;
