type ColorPickerProps = {
    title?: string;
    color?: string;
    className?: string;
    setColor?: (color: string) => void;
    disabled?: boolean;
};
const ColorPicker = ({ title, className, color, setColor, disabled = false }: ColorPickerProps) => {
    const [innerColor, setInnerColor] = useState(color ?? "#ff0000");

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = e.target.value;
        setInnerColor(newColor);
        setColor?.(newColor);
    };
    return (
        <label
            className={cn("flex flex-col justify-center items-center", className, {
                "opacity-40": disabled,
            })}
        >
            <div className="font-medium">{title}</div>
            <div className="relative w-4 h-4 my-1 ring-1 ring-offset-4 ring-offset-neutral ring-neutral-content rounded-full overflow-clip">
                <input
                    type="color"
                    disabled={disabled}
                    value={innerColor}
                    onChange={handleColorChange}
                    className="w-full h-full"
                />
                <div
                    className={cn("absolute w-20 h-20 inset-0", {
                        "cursor-pointer": !disabled,
                    })}
                    style={{ backgroundColor: disabled ? "darkgray" : innerColor }}
                />
            </div>
        </label>
    );
};

export default ColorPicker;
