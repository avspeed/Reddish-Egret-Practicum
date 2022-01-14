import React, { useState } from 'react';
import 'firebase/firestore';

import { storage} from "../config/fire-config";
import { CountryDropdown } from 'react-country-region-selector';
import Languages from '../components/Languages';



export default function ProfilePage() {
    //useState hooks for form elements 
    const [country, setCountry] = useState('');
    const [Lang, setLang] = useState('');
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState('');

    //event handlers
    const selectCountry = (val) => {
        setCountry(val);
    }
    const selectLanguage = (e) => {
        setLang(e.target.value)
    }
    const handleChange = (e) => {
        setImage(e.target.files[0]);


    }

    console.log("image:", image);
    //Below line of code to upload image to firestore  
    const imageUpload = (e) => {

        const ref = storage.ref(`/images/${image.name}`);
        const uploadTask = ref.put(image);

        uploadTask.on(
            "state_changed",
            snapshot => {

            },
            error => {
                console.log(error);
            },
            () => {
                ref
                    .getDownloadURL()
                    .then((url) => {
                        setImage(null);
                        setUrl(url);
                    });
            });

    }



    return (
        <div>
            
                <div style={{ display: 'block' }}>

                    <input style={{ margin: "20px" }} type="file" onChange={handleChange} />
                    <button onClick={imageUpload}>Upload</button>
                    <img src={url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400" />
                    <br />

                </div>
                <br />
                <form>
                <div>
                    <label>Language:</label>&nbsp;&nbsp;


                    <select value={Lang} onChange={selectLanguage}>
                        {Languages.map((language, index) => <option key={index}>{language.value}</option>)}
                    </select>

                </div>
                <br />

                <div>
                    <label htmlFor='location'>Location</label>&nbsp;&nbsp;
                    <input type="text" id="location" />
                </div>
                <br />

                <div>
                    <label>Country:</label>&nbsp;&nbsp;

                    <CountryDropdown value={country}
                        onChange={(val) => selectCountry(val)}
                    />

                </div>
                <br />

                <label htmlFor='interests'>Hobbies:</label>&nbsp;&nbsp;
                <input type="text" id="interests" />
                <br />
                <button type="submit">Update profile</button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button type="submit">Cancel</button>
            </form>



        </div>
    )

}
