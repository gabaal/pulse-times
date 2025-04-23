'use client';

import {
	createCategoryAction,
	fetchCategoryAction,
	updateCategoryAction,
} from '@/actions/categoryActions';
import FileInput from '@/components/FileInput';
import Input from '@/components/Input';
import SubmitButton from '@/components/SubmitButton';
import Textarea from '@/components/Textarea';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function UpdateCategory() {
	const formRef = useRef(null);
	const successRef = useRef(null);
	const failedRef = useRef(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [categoryData, setCategoryData] = useState({});
	const router = useRouter();
	const params = useParams();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedCategoryData = await fetchCategoryAction(
					params.categoryId
				);
				setCategoryData(fetchedCategoryData);
			} catch (error) {
				failedRef.current.textContent = 'Error fetching Data';
			}
		};

		if (params?.categoryId) {
			fetchData();
		}
	}, [params?.categoryId]);
	return (
		<div className='grid place-items-center min-h-screen'>
			<form
				ref={formRef}
				action={async (formData) => {
					successRef.current.textContent = '';
					failedRef.current.textContent = '';
					formData.append('categoryId', params.categoryId);

					const data = await updateCategoryAction(formData);

					if (data?.success) {
						formRef.current?.reset();
						setSelectedFile(null);
						successRef.current.textContent = 'Updated successfully!';
						router.replace('/admin-controls');
					} else {
						failedRef.current.textContent = data?.error;
					}
				}}
				className='w-[90%] sm:w-[580px] shadow-xl p-8 rounded-md flex flex-col gap-3 bg-base-100'>
				<h2 className='text-white font-bold text-2xl mb-4 self-center'>
					Update Category
				</h2>

				<Input
					typeAttr={'text'}
					nameAttr={'name'}
					placeholderAttr={'Category Name'}
					requiredAttr={true}
					classAttr={'w-full'}
					value={categoryData?.name}
					onChange={(e) => {
						setCategoryData({
							...categoryData,
							name: e.target.value,
						});
					}}
				/>
				<Textarea
					nameAttr={'description'}
					placeholderAttr={'Description'}
					requiredAttr={true}
					classAttr={'w-full resize-none'}
					value={categoryData?.description}
					onChange={(e) => {
						setCategoryData({
							...categoryData,
							description: e.target.value,
						});
					}}
				/>

				<FileInput
					nameAttr={'thumbnailImage'}
					setSelectedFile={setSelectedFile}
					selectedFile={selectedFile}
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
