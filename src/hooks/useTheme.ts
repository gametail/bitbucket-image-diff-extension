import { useEffect } from "react";

export default function useTheme() {
    const [theme, setTheme] = useState<string | null>(document.documentElement.getAttribute("data-color-mode"));

    useEffect(() => {
        const handleThemeChange = () => {
            const currentTheme = document.documentElement.getAttribute("data-color-mode");
            console.log(currentTheme);
            setTheme(currentTheme);
        };

        const observer = new MutationObserver(() => {
            handleThemeChange();
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-color-mode"],
        });
        return () => observer.disconnect();
    }, []);

    return theme;
}
