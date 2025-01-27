import { useContainerContext } from "@/components/container/ContainerContext";
import { ColorNames } from "@/utils/colors";

type ImageSplitterProps = {
    oldColor: ColorNames;
    newColor: ColorNames;
    className?: string;
};
const ImageSplitter = ({ className, oldColor, newColor }: ImageSplitterProps) => {
    const { newImg, oldImg } = useContainerContext();
    const ref = useRef<HTMLDivElement>(null);
    const [percentage, setPercentage] = useState(0.5);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (ref.current) {
            const { left, width } = ref.current.getBoundingClientRect();
            const mouseX = event.clientX;
            const relativeX = mouseX - left;
            const calculatedPercentage = Math.min(Math.max(relativeX / width, 0), 1);
            setPercentage(calculatedPercentage);
        }
    };

    return (
        <div
            ref={ref}
            className={cn("relative", className)}
            onMouseMove={handleMouseMove}
        >
            <ImageWrapper
                src={oldImg.src}
                color={oldColor}
                title={oldImg.title}
            />
            <ImageWrapper
                className="absolute inset-0"
                style={{
                    clipPath: `polygon(0 0, ${percentage * 100}% 0, ${percentage * 100}% 100%, 0 100%)`,
                }}
                src={newImg.src}
                color={newColor}
                title={newImg.title}
            />
            <div
                style={{ left: `${percentage * 100}%` }}
                className="absolute inset-y-0 h-full w-0.5 bg-neutral"
            ></div>
        </div>
    );
};

export default ImageSplitter;
