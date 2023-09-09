interface Props {
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	value: string;
	placeholder?: string;
	label?: string;
	id: string;
	inputCustomClasses?: string;
}
const FormTextInput = ({
	value,
	onChange,
	placeholder,
	id,
	label,
	inputCustomClasses,
}: Props) => {
	const inputClasses = `${inputCustomClasses} bg-gray-50 border 
	 text-gray-900 text-sm rounded-lg w-full p-2.5`;
	return (
		<div>
			<label
				htmlFor={id}
				className="block mb-2 text-sm font-medium text-gray-900"
			>
				{label}
			</label>
			<input
				id={id}
				type="text"
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className={inputClasses}
			/>
		</div>
	);
};

export default FormTextInput;
