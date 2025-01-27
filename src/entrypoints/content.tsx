import "~/assets/main.css";
import { createRoot } from "react-dom/client";
import Container from "@/components/container/Container";
import { ContainerProvider } from "@/components/container/ContainerContext";

export default defineContentScript({
    matches: [
        // "<all_urls>",
        import.meta.env.WXT_MATCH_URL,
    ],
    async main() {
        try {
            console.log("hello");

            const body = document.body;
            body.style.height = "fit-content";

            // Wait for the element to appear
            const container = await waitForElement('[role="region"][aria-label="Diff"]');

            getHeadersAndImages().forEach((element) => injectNewContentContainer(element));

            const observer = new MutationObserver((mutationList, observer) => {
                for (const mutation of mutationList) {
                    if (mutation.type === "childList") {
                        const newElements = getHeadersAndImages();
                        if (newElements.length === 0) {
                            continue;
                        }

                        newElements.forEach((element) => injectNewContentContainer(element));
                    }
                }
            });
            observer.observe(container, {
                childList: true,
                subtree: true,
            });
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            }
        }
    },
});

function waitForElement(selector: string, timeout = 10000) {
    return new Promise<HTMLDivElement>((resolve, reject) => {
        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(interval);
                resolve(element as HTMLDivElement);
            }
        }, 200);

        setTimeout(() => {
            clearInterval(interval);
            reject(new Error(`Element not found: ${selector}`));
        }, timeout);
    });
}

const getHeadersAndImages = () => {
    const result: {
        beforeImg: HTMLImageElement;
        afterImg: HTMLImageElement;
        outerImgContainer: HTMLDivElement;
        imgContainer: HTMLDivElement;
    }[] = [];

    // get img container to add diff img (container)
    const outerImgContainerNodes = document.querySelectorAll(
        'div[data-qa="bk-file__content"]:not(div[data-img-container-processed="true"]',
    ) as NodeListOf<HTMLDivElement>;

    if (outerImgContainerNodes.length === 0) {
        return [];
    }

    // get before and after img tags for calc
    outerImgContainerNodes.forEach((node) => {
        if (node.firstChild === null) {
            return;
        }

        const imgNodes = node.querySelectorAll("img");

        result.push({
            beforeImg: imgNodes[0],
            afterImg: imgNodes[1],
            outerImgContainer: node,
            imgContainer: node.firstChild as HTMLDivElement,
        });

        node.setAttribute("data-img-container-processed", "true");
    });

    return result;
};

const injectNewContentContainer = (element: {
    outerImgContainer: HTMLDivElement;
    imgContainer: HTMLDivElement;
    beforeImg: HTMLImageElement;
    afterImg: HTMLImageElement;
}) => {
    const { beforeImg, afterImg, imgContainer } = element;

    const root = createRoot(imgContainer);
    root.render(
        <ContainerProvider>
            <Container
                images={{
                    oldImage: { title: "Old", color: "red", src: beforeImg.src },
                    newImage: { title: "New", color: "green", src: afterImg.src },
                }}
            />
        </ContainerProvider>,
    );
};
