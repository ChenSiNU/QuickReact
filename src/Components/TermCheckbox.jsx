import React from "react";

const TermCheckbox = ({ label, checked, onChange }) => {
	return (
		<label>
			<input
				type='checkbox'
				checked={checked}
				onChange={() => onChange(label)}
				data-cy={label}
			/>
			{label}
		</label>
	);
};

export default TermCheckbox;
