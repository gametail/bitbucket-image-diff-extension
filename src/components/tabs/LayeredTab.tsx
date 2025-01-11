import { useContainerContext } from "@/components/container/ContainerContext";

type LayeredTabProps = {};
const LayeredTab = ({}: LayeredTabProps) => {
    const { crossfadeValue, setCrossfadeValue } = useContainerContext();

    return (
        <RangeSlider
            title={["Old", true, "New"]}
            titleClassname={["text-red-main", "", "text-green-main"]}
            value={crossfadeValue}
            setValue={setCrossfadeValue}
        />
    );
};

export default LayeredTab;
