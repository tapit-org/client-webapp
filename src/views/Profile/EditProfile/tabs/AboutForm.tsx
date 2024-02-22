import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const AboutForm = ({ about, setAbout }) => {
	return (
		<div>
			<ReactQuill
				placeholder="Enter Bio..."
				style={{
					border: "1px solid #E5E7EB",
					borderRadius: 10,
					padding: 8,
				}}
				className="h-100"
				theme="snow"
				value={about}
				onChange={setAbout}
				modules={{
					toolbar: false,
				}}
			/>
		</div>
	);
};

export default AboutForm;
