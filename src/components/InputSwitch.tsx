type InputSwitchProps = {
    title?: string;
    value?: boolean;
    setValue?: (value: boolean) => void;
};
const InputSwitch = ({ title, value, setValue }: InputSwitchProps) => {
    const [innerValue, setInnerValue] = useState(value ?? false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.checked;
        setInnerValue(newValue);
        setValue?.(newValue);
    };
    return (
        <label className="flex flex-col justify-center items-center">
            <div className="font-medium">{title}</div>
            <input
                type="checkbox"
                checked={innerValue}
                onChange={handleChange}
                className="toggle toggle-success"
            />
        </label>
    );
};

export default InputSwitch;
