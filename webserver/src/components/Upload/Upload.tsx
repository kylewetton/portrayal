import React, {useState} from 'react';
import UploadFormlet from './UploadFormlet';
import {UploadArea, ErrorPanel} from './styles';

interface UploadInterface {
    handleFileUpload: (files: FileList) => void;
    error: string | false;
    clearError: () => void;
}

const Upload: React.FC<UploadInterface> = ({error, handleFileUpload, clearError}) => {

    const [draggingOver, setDraggingOver] = useState<boolean>(false);
    
    const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
        clearError();
        e.preventDefault();
    }
    
    const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDraggingOver(true);
    }
    
    const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDraggingOver(false);
    }
    
    const fileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        setDraggingOver(false);
        handleFileUpload(files);
    }

    return (
        <UploadArea
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
        draggingOver={draggingOver}
        >
            {error ? <ErrorPanel>{error}</ErrorPanel> : ''}
            <p>Drag artwork here or <UploadFormlet error={error} onClick={clearError} handleUpload={handleFileUpload} /></p>
        </UploadArea>
    );
};

export default Upload;