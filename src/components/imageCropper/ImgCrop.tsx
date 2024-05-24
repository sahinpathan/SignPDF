import { Button } from '@mui/material'
import { useContext, useRef, useState } from 'react'
import ReactCrop, { PixelCrop, type Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { MyContext } from '../../context/SignatureProvider'
import FileUpload from './FileUpload'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'


interface Props{
    handleClose: () => void
}
function ImgCrop({handleClose}:Props) {
    const [crop, setCrop] = useState<Crop>()
    const [imgSrc, setImgSrc] = useState('')
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const imgRef = useRef<HTMLImageElement>(null)
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const [aspect] = useState<number | undefined>(16 / 9)
    const { setSignature = () => {  }} = useContext(MyContext)|| {}!;

    function onSelectFile1(file: File) {
        if (file) {
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(file)
        }
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    1,
                    0,
                )
            }
        },
        100,
        [completedCrop, 1, 0],
    )

    async function onDownloadCropClick() {
        const image = imgRef.current;
        const previewCanvas = previewCanvasRef.current;
        if (!image || !previewCanvas || !completedCrop) {
            throw new Error('Crop canvas does not exist');
        }
    
        // This will size relative to the uploaded image
        // size. If you want to size according to what they
        // are looking at on screen, remove scaleX + scaleY
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
    
        const offscreen = new OffscreenCanvas(
            completedCrop.width * scaleX,
            completedCrop.height * scaleY
        );
        const ctx = offscreen.getContext('2d');
        if (!ctx) {
            throw new Error('No 2d context');
        }
    
        ctx.drawImage(
            previewCanvas,
            0,
            0,
            previewCanvas.width,
            previewCanvas.height,
            0,
            0,
            offscreen.width,
            offscreen.height
        );
    
        // Convert OffscreenCanvas to a regular canvas
        const canvas = document.createElement('canvas');
        canvas.width = offscreen.width;
        canvas.height = offscreen.height;
        const ctx2 = canvas.getContext('2d');
        if (!ctx2) {
            throw new Error('No 2d context for canvas');
        }
        ctx2.drawImage(offscreen, 0, 0);
    
        // Convert canvas to base64 string
        const base64String = canvas.toDataURL('image/png');
        setSignature(base64String)
        handleClose();
    }
    

    return (
        <>
            
            {!!imgSrc ? (
                <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspect}
                    minHeight={100}
                >
                    <img
                        ref={imgRef}
                        alt="Crop me"
                        src={imgSrc}
                        style={{ transform: `scale(${1}) rotate(${0}deg)` }}
                    />
                </ReactCrop>
            ):(
                <FileUpload onSelectFile={onSelectFile1} />
            )}
            {!!completedCrop && (
                <>
                    <div>
                        <canvas
                            ref={previewCanvasRef}
                            style={{
                                border: '1px solid black',
                                objectFit: 'contain',
                                width: completedCrop.width,
                                height: completedCrop.height,
                            }}
                        />
                    </div>
                    <div>
                        <Button onClick={onDownloadCropClick}>Upload</Button>
                    </div>
                </>
            )}
        </>
    )
}

export default ImgCrop
