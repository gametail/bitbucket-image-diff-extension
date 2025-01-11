import { useContainerContext } from "@/components/container/ContainerContext";
import DiffTab from "@/components/tabs/DiffTab";
import LayeredTab from "@/components/tabs/LayeredTab";
import SplitTab from "@/components/tabs/SplitTab";

export type Tabs = "layered" | "split" | "diff";

const tabs: Record<Tabs, { tabName: string; renderedComponent: React.ReactNode }> = {
    layered: { tabName: "Layered", renderedComponent: <LayeredTab /> },
    split: { tabName: "Split", renderedComponent: <SplitTab /> },
    diff: { tabName: "Diff", renderedComponent: <DiffTab /> },
};

type TabWrapperProps = {};
const TabWrapper = ({}: TabWrapperProps) => {
    const { activeControlTab, setActiveControlTab } = useContainerContext();

    return (
        <div className="w-full my-4 flex flex-col gap-4 items-center">
            <div className="join bg-tab-wrapper-gray border border-gray-light">
                {Object.entries(tabs).map(([key, { tabName }]) => (
                    <div
                        key={key}
                        onClick={() => setActiveControlTab(key as Tabs)}
                        className={cn("w-28 join-item btn hover:bg-gray-light bg-gray-dark", {
                            "bg-gray-light": key === activeControlTab,
                        })}
                    >
                        {tabName}
                    </div>
                ))}
            </div>

            <>{tabs[activeControlTab].renderedComponent}</>
        </div>
    );
};

export default TabWrapper;
