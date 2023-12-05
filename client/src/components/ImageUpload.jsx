/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import { deleteImage, uploadImages } from '../api/userApi';
import { IMG_URL } from '../constants/urls';

function ImageUpload({ uploaded, setUploaded }) {
    const [images, setImages] = useState([]);
    const [selected, setSelected] = useState([]);
    // const [uploaded, setUploaded] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    function selectFiles() {
        fileInputRef.current.click();
    }
    async function uploadPhotos(photos) {
        const formData = new FormData()
        photos?.forEach((image) => {
            formData.append('images', image);
        });
        const { data } = await uploadImages(formData)
        console.log('upload photos', data);
        setUploaded((prevImages) => ([...prevImages, ...data]))
        setImages([]);
    }
    useEffect(() => {
        // This block of code will run after each render
        if (images.length > 0) {
            console.log('selected images', images);
            uploadPhotos(images);
        }
    }, [images]);
    function addPhotos(files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!file.type.startsWith('image/')) {
                alert('Please select only image files.');
                continue;
            }
            const maxSize = 2 * 1024 * 1024; // 2MB in bytes
            if (file.size > maxSize) {
                alert('File size exceeds the maximum allowed size of 2MB.');
                continue;
            }
            if (selected.some((item) => item.name == file.name)) {
                alert('File already selected or uploaded');
                continue;
            }else{
                setImages((prevImages) => [...prevImages, file]);
                setSelected((prevFiles) => [...prevFiles, file]);
            }
        }
    }
    function onFileSelect(e) {
        const files = e.target.files;
        if (files.length === 0) return;
        console.log('files', files);
        addPhotos(files)
    }
    async function removeImage(name) {
        const { data } = await deleteImage(name);
        console.log('removed', data);
        setUploaded((prevImages) => prevImages.filter((image) => image !== name));
    }
    function onDragOver(e) {
        e.preventDefault();
        setIsDragging(true);
        e.dataTransfer.dropEffect = 'copy';
    }
    function onDragLeave(e) {
        e.preventDefault();
        setIsDragging(false);
    }
    function onDrop(e) {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        addPhotos(files)
    }
    return (
        // 
        <div className="card gap-2 grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
            {uploaded?.length > 0 && uploaded?.map((photos, index) => (
                <div className="max-w-64 h-32 mt-3 relative" key={index}>
                    <span className="delete" onClick={() => removeImage(photos)}>
                        &times;
                    </span>
                    <img className="rounded-md w-64 h-full" src={IMG_URL + photos} alt={photos} />
                </div>
            ))}
            <div className="drag-area max-w-64 h-32" onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
                {isDragging ? (
                    <span>
                        Drop image here
                    </span>
                ) : (
                    <>
                        <span>
                            Drag and drop photos here
                        </span>
                        <span>OR</span>
                        <span className="select" role="button" onClick={selectFiles}>
                            Browse
                        </span>
                    </>
                )}
                <span className='text-center text-gray-500 text-xs'>*Max file size of 2MB</span>
                <input type="file" name='image' accept='image/*' className='file' multiple ref={fileInputRef} onChange={onFileSelect} />
            </div>
        </div>
    )
}

export default ImageUpload