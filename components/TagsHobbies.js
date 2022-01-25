import React from "react";

const TagsInput = (props) => {
    const [tags, setTags] = React.useState([]);

    const addTags = event => {
        if (event.key === "Enter" && event.target.value !== "") {
            setTags([...tags, event.target.value]);
            props.selectedTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };
    const removeTags = index => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
        props.selectedTags([...tags.filter(tag => tags.indexOf(tag) !== index)])
    };
    return (
        <div>
            <ul>
                {tags.map((tag, index) => (
                    <li key={index}>
                        <span>{tag}</span>
                        &nbsp;
                        <i 
                        onClick={() => removeTags(index)}>❌</i>
                    </li>
                ))}
            </ul>
            <label htmlFor="hobbies">Hobbies</label>
            <input
                type="text"
                id="hobbies"
                onKeyUp={event => addTags(event)}
                placeholder="Press enter to add hobby"
            />
        </div>
    );
};





export default TagsInput;