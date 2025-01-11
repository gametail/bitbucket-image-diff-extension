import { ImageObject, useContainerContext } from "@/components/container/ContainerContext";
import ImageWrapper from "@/components/ImageWrapper";
import TabWrapper from "@/components/tabs/TabWrapper";
import TabOutlet from "../tabs/TabOutlet";
import ImageDiffer from "../image-differ/ImageDiffer";

type ContainerProps = {
    images: { oldImage: ImageObject; newImage: ImageObject };
};
const Container = ({ images }: ContainerProps) => {
    const { setNewImg, setOldImg, hideSrcImages } = useContainerContext();

    const { oldImage, newImage } = images;

    useEffect(() => {
        setOldImg(oldImage);
        setNewImg(newImage);
    }, []);

    return (
        <div className="w-full">
            <TabWrapper />
            <div
                className={cn("grid grid-cols-3 gap-4", {
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
                        diff: <ImageDiffer className="max-w-[500px]" />,
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
