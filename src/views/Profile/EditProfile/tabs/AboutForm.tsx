import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const AboutForm = ({
    about,
    setAbout
}) => {

    return (
        <div>
            <ReactQuill placeholder='Enter Bio...' className='h-100' theme="snow" value={about} onChange={setAbout} modules={{
                toolbar: false
            }} />
        </div>
    )

};

export default AboutForm;
