type RangeSliderProps = {
    className?: string;
    title: [(string | boolean)?, (string | boolean)?, (string | boolean)?];
    titleClassname?: [string, string?, string?];
    sliderClassName?: string;
    value?: number;
    setValue?: (value: number) => void;
    disabled?: boolean;
};
const RangeSlider = ({
    className,
    value,
    title,
    titleClassname,
    sliderClassName,
    setValue,
    disabled = false,
}: RangeSliderProps) => {
    const [innerValue, setInnerValue] = useState(value ?? 0);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        setInnerValue(newValue);
        setValue?.(newValue);
    };
    return (
        <label className={cn("w-60 flex flex-col justify-center items-center", className)}>
            <div className="h-6 w-full flex justify-between">
                {title.map((el, index) => {
                    const key = `${el}-${index}`;
                    if (typeof el === "string") {
                        return (
                            <span
                                key={key}
                                className={cn("font-medium", titleClassname?.[index])}
                            >
                                {el}
                            </span>
                        );
                    } else if (typeof el === "boolean") {
                        return (
                            <span
                                key={key}
                                className={cn("font-medium", titleClassname?.[index])}
                            >
                                {Math.round(innerValue * 100).toString()}%
                            </span>
                        );
                    }
                })}
            </div>

            <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={innerValue}
                onChange={handleSliderChange}
                className={cn("range", sliderClassName, {
                    "opacity-40": disabled,
                })}
                disabled={disabled}
            />
        </label>
    );
};

export default RangeSlider;
