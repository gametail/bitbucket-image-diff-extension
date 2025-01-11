import { Tabs } from "@/components/tabs/TabWrapper";
import { createContext, useContext, useState, ReactNode, RefObject } from "react";

export type ImageObject = {
    title: string;
    color: ColorNames;
    src: string | undefined;
};

type ContainerContextType = {
    activeControlTab: Tabs;
    setActiveControlTab: (activeControlTab: Tabs) => void;
    oldImgRef: RefObject<HTMLImageElement | null>;
    oldImg: ImageObject;
    setOldImg: (oldImg: ImageObject) => void;
    newImgRef: RefObject<HTMLImageElement | null>;
    newImg: ImageObject;
    setNewImg: (newImg: ImageObject) => void;

    hideSrcImages: boolean;
    setHideSrcImages: (hideSrcImages: boolean) => void;

    crossfadeValue: number;
    setCrossfadeValue: (crossfadeValue: number) => void;

    //Diff Tab
    antialiasingIncluded: boolean;
    setAntialiasingIncluded: (antialiasingIncluded: boolean) => void;
    antialiasingColorValue: string;
    setAntialiasingColorValue: (antialiasingColorValue: string) => void;

    alphaValue: number;
    setAlphaValue: (alphaValue: number) => void;

    diffColorValue: string;
    setDiffColorValue: (diffColorValue: string) => void;

    diffAltColorEnabled: boolean;
    setDiffAltColorEnabled: (diffAltColorEnabled: boolean) => void;
    diffAltColorValue: string;
    setDiffAltColorValue: (diffAltColorValue: string) => void;

    diffMaskEnabled: boolean;
    setDiffMaskEnabled: (diffMaskEnabled: boolean) => void;

    thresholdValue: number;
    setThresholdValue: (thresholdValue: number) => void;
};

const ContainerContext = createContext<ContainerContextType | undefined>(undefined);

export const ContainerProvider = ({ children }: { children: ReactNode }) => {
    const [activeControlTab, setActiveControlTab] = useState<Tabs>("diff");
    const oldImgRef = useRef<HTMLImageElement>(null);
    const [oldImg, setOldImg] = useState<ImageObject>({
        color: "red",
        src: undefined,
        title: "Old",
    });
    const newImgRef = useRef<HTMLImageElement>(null);
    const [newImg, setNewImg] = useState<ImageObject>({
        color: "green",
        src: undefined,
        title: "New",
    });
    const [hideSrcImages, setHideSrcImages] = useState<boolean>(false);

    const [crossfadeValue, setCrossfadeValue] = useState<number>(1);

    //Diff Tab
    const [antialiasingIncluded, setAntialiasingIncluded] = useState<boolean>(true);
    const [antialiasingColorValue, setAntialiasingColorValue] = useState<string>("#ffff00");

    const [alphaValue, setAlphaValue] = useState<number>(0.1);

    const [diffColorValue, setDiffColorValue] = useState<string>("#ff0000");

    const [diffAltColorEnabled, setDiffAltColorEnabled] = useState<boolean>(false);
    const [diffAltColorValue, setDiffAltColorValue] = useState<string>("#ff00ff");

    const [diffMaskEnabled, setDiffMaskEnabled] = useState<boolean>(false);

    const [thresholdValue, setThresholdValue] = useState<number>(0.1);

    return (
        <ContainerContext.Provider
            value={{
                activeControlTab,
                setActiveControlTab,
                oldImgRef,
                oldImg,
                setOldImg,
                newImgRef,
                newImg,
                setNewImg,
                hideSrcImages,
                setHideSrcImages,
                crossfadeValue,
                setCrossfadeValue,
                antialiasingIncluded,
                setAntialiasingIncluded,
                antialiasingColorValue,
                setAntialiasingColorValue,
                alphaValue,
                setAlphaValue,
                diffColorValue,
                setDiffColorValue,
                diffAltColorEnabled,
                setDiffAltColorEnabled,
                diffAltColorValue,
                setDiffAltColorValue,
                diffMaskEnabled,
                setDiffMaskEnabled,
                thresholdValue,
                setThresholdValue,
            }}
        >
            {children}
        </ContainerContext.Provider>
    );
};

export const useContainerContext = () => {
    const context = useContext(ContainerContext);
    if (!context) {
        throw new Error("useContainerContext must be used within a ContainerProvider");
    }
    return context;
};
