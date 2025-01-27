import { ImageObject, useContainerContext } from "@/components/container/ContainerContext";
import ImageWrapper from "@/components/ImageWrapper";
import TabWrapper from "@/components/tabs/TabWrapper";
import TabOutlet from "../tabs/TabOutlet";
import ImageDiffer from "../image-differ/ImageDiffer";
import useTheme from "@/hooks/useTheme";

type ContainerProps = {
    images: { oldImage: ImageObject; newImage: ImageObject };
};
const Container = ({ images }: ContainerProps) => {
    const { setNewImg, setOldImg, hideSrcImages } = useContainerContext();
    const theme = useTheme();

    const { oldImage, newImage } = images;

    useEffect(() => {
        setOldImg(oldImage);
        setNewImg(newImage);
    }, []);

    return (
        <div
            className={cn("w-full", {
                "bg-dark-container": theme === "dark",
                "bg-light-container": theme === "light",
            })}
            data-theme={theme}
        >
            <TabWrapper />
            <div
                className={cn("grid grid-cols-3", {
                    "grid-cols-1 place-items-center": hideSrcImages,
                })}
            >
                <ImageWrapper
                    className={hideSrcImages ? "hidden" : ""}
                    title={oldImage.title}
                    color={oldImage.color}
                    src={oldImage.src}
                    ref="old"
                />
                <ImageWrapper
                    className={hideSrcImages ? "hidden" : ""}
                    title={newImage.title}
                    color={newImage.color}
                    src={newImage.src}
                    ref="new"
                />

                <TabOutlet
                    componentMap={{
                        layered: (
                            <ImageCrossFader
                                newColor={newImage.color}
                                oldColor={oldImage.color}
                            />
                        ),
                        diff: <ImageDiffer />,
                        split: (
                            <ImageSplitter
                                newColor={newImage.color}
                                oldColor={oldImage.color}
                            />
                        ),
                    }}
                />
            </div>
        </div>
    );
};
export default Container;
