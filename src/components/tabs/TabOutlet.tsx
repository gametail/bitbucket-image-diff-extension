import { useContainerContext } from "../container/ContainerContext";
import { Tabs } from "./TabWrapper";

type TabOutletProps = {
    componentMap: Record<Tabs, React.ReactNode>;
};
const TabOutlet = ({ componentMap }: TabOutletProps) => {
    const { activeControlTab } = useContainerContext();

    return <>{componentMap[activeControlTab]}</>;
};

export default TabOutlet;
