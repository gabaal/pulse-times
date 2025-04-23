export default function Select({
	labelAttr,
	typeAttr,
	nameAttr,
	classAttr,
	placeholderAttr,
	requiredAttr,
	errorAttr,
	optionsAttr,
	...props
}) {
	return (
		<label className='form-control'>
			{labelAttr && (
				<div className='label !px-0'>
					<span className='label-text'>{labelAttr}</span>
				</div>
			)}
			<div className='relative'>
				<select
					className={`h-full block bg-slate-700 outline-none rounded-md placeholder:text-sm placeholder:text-[#989DBB] focus:!ring-0 focus:border px-4 py-3 ${classAttr} ${
						errorAttr ? 'border border-red-500' : ''
					}`}
					name={nameAttr}
					required={requiredAttr}
					{...props}>
					{placeholderAttr && <option value={''}>{placeholderAttr}</option>}
					{optionsAttr &&
						optionsAttr.map((item, index) => {
							return (
								<option value={item} key={index}>
									{item}
								</option>
							);
						})}
				</select>
			</div>
			{errorAttr && (
				<div className='label !px-0'>
					<span className='label-text text-red-500'>
						<MdErrorOutline className='inline me-2' />
						{errorAttr}
					</span>
				</div>
			)}
		</label>
	);
}
