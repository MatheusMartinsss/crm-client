import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export const TextEditor = ({ value, onChange, ...props }) => {

    return <ReactQuill
        {...props}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={{
            toolbar: {
                ...TextEditor.modules.toolbar,       
            },
            ...TextEditor.modules,
        }}
    />;
}

TextEditor.modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        ['clean'],
    ],
};

