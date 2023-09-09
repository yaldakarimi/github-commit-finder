interface Props {
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	value: string;
	placeholder?: string;
	label?: string;
	id: string;
}
const FormTextInput = ({ value, onChange, placeholder, id, label }: Props) => {
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
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
			/>
		</div>
	);
};

export default FormTextInput;
