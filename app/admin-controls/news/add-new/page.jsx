'use client';

import { fetchAllCategoryAction } from '@/actions/categoryActions';
import { addNewsAction } from '@/actions/newsActions';
import FileInput from '@/components/FileInput';
import Input from '@/components/Input';
import SubmitButton from '@/components/SubmitButton';
import Textarea from '@/components/Textarea';
import TipTap from '@/components/TipTap';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

export default function AddNews() {
	const formRef = useRef(null);
	const successRef = useRef(null);
	const failedRef = useRef(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [categories, setCategories] = useState([]);
	const [content, setContent] = useState('');
	const { status, data: session } = useSession();

	useEffect(() => {
		const fetchCategoryData = async () => {
			try {
				const fetchedCategoryData = await fetchAllCategoryAction();
				setCategories(fetchedCategoryData);
			} catch (error) {
				console.log(error);
			}
		};
		fetchCategoryData();
	}, []);

	return (
		<div className='grid place-items-center min-h-screen py-24'>
			<form
				ref={formRef}
				action={async (formData) => {
					successRef.current.textContent = '';
					failedRef.current.textContent = '';

					formData.append('description', content);
					formData.append('author', session?.user?.mongoId);

					const data = await addNewsAction(formData);
					if (data?.success) {
						formRef.current?.reset();
						setSelectedFile(null);
						successRef.current.textContent = 'Created!';
					} else {
						failedRef.current.textContent = data?.error;
					}
				}}
				className='w-[90%] sm:w-[580px] shadow-xl p-8 rounded-md flex flex-col gap-3 bg-base-100'>
				<h2 className='text-white font-bold text-2xl mb-4 self-center'>
					Create News
				</h2>

				<Input
					typeAttr={'text'}
					nameAttr={'title'}
					placeholderAttr={'Enter the news title'}
					requiredAttr={true}
					classAttr={'w-full'}
				/>
				<Textarea
					nameAttr={'shortDescription'}
					placeholderAttr={'Short Description'}
					requiredAttr={true}
					classAttr={'w-full resize-none'}
				/>

				<p>Select Category:</p>
				<div className='flex w-full gap-4'>
					{categories?.map((item) => (
						<div
							key={item?._id}
							className='flex items-center justify-center gap-2'>
							<input
								type='checkbox'
								className='checkbox checkbox-primary'
								name='categories'
								value={item?._id}
								id='category'
							/>
							<span>{item?.name}</span>
						</div>
					))}
				</div>
				<FileInput
					nameAttr={'thumbnailImage'}
					setSelectedFile={setSelectedFile}
					selectedFile={selectedFile}
				/>

				<TipTap
					content={content}
					onChange={(newContent) => setContent(newContent)}
				/>

				<div className='self-center mt-4'>
					<SubmitButton />
				</div>
				<p
					ref={successRef}
					className='text-green-600 text-center font-bold text-lg'></p>
				<p
					ref={failedRef}
					className='text-red-600 text-center font-bold text-lg'></p>
			</form>
		</div>
	);
}
