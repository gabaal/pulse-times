'use client';

import { fetchAllCategoryAction } from '@/actions/categoryActions';
import {
	addNewsAction,
	fetchNewsAction,
	updateNewsAction,
} from '@/actions/newsActions';
import FileInput from '@/components/FileInput';
import Input from '@/components/Input';
import SubmitButton from '@/components/SubmitButton';
import Textarea from '@/components/Textarea';
import TipTap from '@/components/TipTap';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function UpdateNews() {
	const formRef = useRef(null);
	const successRef = useRef(null);
	const failedRef = useRef(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [categories, setCategories] = useState([]);
	const [content, setContent] = useState('');
	const [description, setDescription] = useState('');
	const { status, data: session } = useSession();
	const params = useParams();
	const router = useRouter();
	const [newsData, setNewsData] = useState({
		title: '',
		shortDescription: '',
		categories: [],
	});

	useEffect(() => {
		const fetchNewsData = async () => {
			try {
				const fetchedNewsData = await fetchNewsAction(params.newsId);
				setNewsData({
					title: fetchedNewsData.title,
					shortDescription: fetchedNewsData.shortDescription,
					categories: fetchedNewsData.categories,
				});
				setContent(fetchedNewsData?.description);
				setDescription(fetchedNewsData?.description);
			} catch (error) {
				console.log(error);
			}
		};

		if (params.newsId) {
			fetchNewsData();
		}
	}, [params]);

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

					formData.append('newsId', params.newsId);
					formData.append('description', content);
					formData.append('author', session?.user?.mongoId);

					const data = await updateNewsAction(formData);
					if (data?.success) {
						formRef.current?.reset();
						setSelectedFile(null);
						successRef.current.textContent = 'Updated!';
						router.push('/admin-controls');
					} else {
						failedRef.current.textContent = data?.error;
					}
				}}
				className='w-[90%] sm:w-[580px] shadow-xl p-8 rounded-md flex flex-col gap-3 bg-base-100'>
				<h2 className='text-white font-bold text-2xl mb-4 self-center'>
					Update News
				</h2>

				<Input
					typeAttr={'text'}
					nameAttr={'title'}
					placeholderAttr={'Enter the news title'}
					requiredAttr={true}
					classAttr={'w-full'}
					value={newsData.title}
					onChange={(e) => setNewsData({ ...newsData, title: e.target.value })}
				/>
				<Textarea
					nameAttr={'shortDescription'}
					placeholderAttr={'Short Description'}
					requiredAttr={true}
					classAttr={'w-full resize-none'}
					value={newsData.shortDescription}
					onChange={(e) =>
						setNewsData({ ...newsData, shortDescription: e.target.value })
					}
				/>

				<p>Select Category:</p>
				<div className='flex w-full gap-4'>
					{categories?.map((item) => (
						<div
							key={item?._id}
							className='flex items-center justify-center gap-2'>
							<input
								type='checkbox'
								checked={newsData?.categories?.some((category) => {
									return category === item?._id;
								})}
								className='checkbox checkbox-primary'
								name='categories'
								value={item?._id}
								id={item?._id}
								onChange={(e) => {
									const newCategories = e.target.checked
										? [...newsData.categories, item._id]
										: newsData.categories.filter(
												(category) => category !== item._id
										  );
									setNewsData({ ...newsData, categories: newCategories });
								}}
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
					description={description}
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
