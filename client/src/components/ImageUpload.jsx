/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import { deleteImage, uploadImages } from '../api/userApi';
import { IMG_URL } from '../constants/urls';

function ImageUpload({ uploaded, setUploaded, cover, setCover }) {
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
            } else {
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
            {uploaded?.length > 0 && uploaded?.map((photo, index) => (
                <div className="max-w-64 h-32 mt-3 relative rounded-xl overflow-hidden" key={index}>
                    <span className="cover" onClick={() => setCover(photo)}>
                        {photo === cover ?
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                            </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                        }
                    </span>
                    <img className="w-64 h-full" src={IMG_URL + photo} alt={photo} />
                    <span className="delete" onClick={() => removeImage(photo)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </span>
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