import React, { useState } from 'react';

function TagInput() {
    const [tags, setTags] = useState([]);

    const inputKeyDown = (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            setTags([...tags, val]);
            TagInput.valu = null;

        } else if (e.key === 'Backspace' && !val) {
            removeTag(tags.length - 1);
        }
    };
    const removeTag = (i) => {
        const newTags = [...tags];
        newTags.splice(i, 1);
        setTags(newTags);
    }

    return (
        <div>
            <ul >
                {tags.map((tag, i) => (
                    <li key={tag}>
                        {tag}
                        <button type="button" onClick={() => { removeTag(i) }}>X</button>
                    </li>
                ))}
                <li>
                    <input type="text" onKeyDown={inputKeyDown} />

                </li>
            </ul>
        </div>


    )
}

export default TagInput;
