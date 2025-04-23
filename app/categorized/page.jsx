'use client';

import Loader from '@/components/Loader';
import MsgShower from '@/components/MsgShower';
import NewsCard from '@/components/NewsCard';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CgArrowRight } from 'react-icons/cg';

export default function CategorizedNews() {
	const [categoriesWithNews, setCategoriesWithNews] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCategoriesWithNews = async () => {
			try {
				const response = await fetch('/api/categorizedNews');
				if (!response.ok) throw new Error('Failed to fetch data');

				const data = await response.json();
				setCategoriesWithNews(data.categoriesWithNews);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchCategoriesWithNews();
	}, []);

	if (loading) return <Loader />;
	if (error) return <MsgShower msg={error} />;
	return (
		<div className='max-w-7xl mx-auto p-4'>
			{categoriesWithNews.length === 0 ? (
				<p>No categories found!</p>
			) : (
				categoriesWithNews.map(({ category, news }) => (
					<div key={category._id} className='mb-10'>
						<div className='flex justify-between'>
							<h2 className='text-2xl font-semibold mb-4'>{category.name}</h2>
							<Link
								className='text-primary underline flex items-center gap-2'
								href={`/news/byCategory/${category?._id}`}>
								View Category <CgArrowRight />
							</Link>
						</div>

						{news?.length > 0 ? (
							<div className='flex flex-wrap gap-3'>
								{news.map((item) => (
									<NewsCard key={item?._id} news={item} />
								))}
							</div>
						) : (
							<p className='text-gray-500'>No blogs in this category</p>
						)}
					</div>
				))
			)}
		</div>
	);
}
