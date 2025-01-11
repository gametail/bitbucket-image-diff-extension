import { PixelmatchOptions } from "pixelmatch";
import { useContainerContext } from "../container/ContainerContext";
import RangeSlider from "../RangeSlider";

type DiffTabProps = {};
const DiffTab = ({}: DiffTabProps) => {
    const {
        hideSrcImages,
        setHideSrcImages,
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
    } = useContainerContext();

    return (
        <div className="flex flex-wrap justify-center items-center gap-y-2">
            <InputSwitch
                title="Hide Old / New"
                value={hideSrcImages}
                setValue={setHideSrcImages}
            />
            <div className="divider divider-horizontal" />

            <div className="flex flex-col items-center">
                <p className="font-medium">AA included</p>
                <div className="flex gap-4">
                    <InputSwitch
                        value={antialiasingIncluded}
                        setValue={setAntialiasingIncluded}
                    />

                    <ColorPicker
                        className="self-end"
                        color={antialiasingColorValue}
                        setColor={setAntialiasingColorValue}
                        disabled={antialiasingIncluded}
                    />
                </div>
            </div>

            <div className="divider divider-horizontal" />

            <ColorPicker
                title="Diff Color"
                color={diffColorValue}
                setColor={setDiffColorValue}
            />

            <div className="divider divider-horizontal" />

            <div className="flex flex-col items-center">
                <p className="font-medium">Diff Alt Color</p>
                <div className="flex gap-4">
                    <InputSwitch
                        value={diffAltColorEnabled}
                        setValue={setDiffAltColorEnabled}
                    />

                    <ColorPicker
                        className="self-end"
                        color={diffAltColorValue}
                        setColor={setDiffAltColorValue}
                        disabled={!diffAltColorEnabled}
                    />
                </div>
            </div>

            <div className="divider divider-horizontal" />

            <div className="flex gap-4">
                <InputSwitch
                    title="Diff Mask"
                    value={diffMaskEnabled}
                    setValue={setDiffMaskEnabled}
                />

                <RangeSlider
                    className="w-24"
                    title={["Alpha", true]}
                    value={alphaValue}
                    setValue={setAlphaValue}
                    disabled={diffMaskEnabled}
                />
            </div>

            <div className="divider divider-horizontal" />
            <RangeSlider
                className="w-56"
                title={["Threshold", true]}
                value={thresholdValue}
                setValue={setThresholdValue}
            />
        </div>
    );
};

export default DiffTab;
