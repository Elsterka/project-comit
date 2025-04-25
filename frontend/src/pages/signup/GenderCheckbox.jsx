// GenderCheckbox is a reusable component for gender selection using checkboxes
// Props:
// - onCheckboxChange: function to update the selected gender in the parent component
// - selectedGender: the currently selected gender value ('male' or 'female')
const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
	return (
		// Container for the two gender checkboxes laid out horizontally
		<div className='flex'>
			{/* Male Checkbox */}
			<div className='form-control'>
				{/* Label acts as a clickable wrapper for the checkbox */}
				<label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""} `}>
					<span className='label-text'>Male</span>
					{/* Checkbox input for "Male" */}
					<input
						type='checkbox'
						className='checkbox border-slate-900'
						checked={selectedGender === "male"}
						onChange={() => onCheckboxChange("male")}
					/>
				</label>
			</div>
			{/* Female Checkbox */}
			<div className='form-control'>
				<label className={`label gap-2 cursor-pointer  ${selectedGender === "female" ? "selected" : ""}`}>
					<span className='label-text'>Female</span>

					{/* Checkbox input for "Female" */}
					<input
						type='checkbox'
						className='checkbox border-slate-900'
						checked={selectedGender === "female"} // checkbox is checked only if "female" is selected
						onChange={() => onCheckboxChange("female")} // updates selected gender to "female"
					/>
				</label>
			</div>
		</div>
	);
};
// Exporting GenderCheckbox so it can be reused in other components (like SignUp)
export default GenderCheckbox;
