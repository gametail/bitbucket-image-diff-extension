export function useImageSize() {
    const imgRef = useRef<HTMLImageElement>(null);
    const [imgWidth, setImgWidth] = useState<number | null>();
    const [imgHeight, setImgHeight] = useState<number | null>();

    useEffect(() => {
        if (imgRef.current) {
            setImgWidth(imgRef.current.naturalWidth);
            setImgHeight(imgRef.current.naturalHeight);
        }
    }, [imgRef.current]);
    return { imgRef, imgWidth, imgHeight };
}
