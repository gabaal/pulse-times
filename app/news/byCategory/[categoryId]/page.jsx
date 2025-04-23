'use client';

import { fetchCategoryAction } from '@/actions/categoryActions';
import Loader from '@/components/Loader';
import MsgShower from '@/components/MsgShower';
import NewsCard from '@/components/NewsCard';
import NoDataComponent from '@/components/NoDataComponent';
import ScrollMsg from '@/components/ScrollMsg';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ByCategory() {
	const [newses, setNewses] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [end, setEnd] = useState(false);
	const [endErr, setEndErr] = useState(false);
	const router = useRouter();
	const params = useParams();
	const [category, setCategory] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			const categoryData = await fetchCategoryAction(params?.categoryId);
			setCategory(categoryData);
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);

			try {
				const response = await fetch(
					`/api/allNews/byCategory?page=${page}&categoryId=${params.categoryId}`
				);

				if (!response.ok) {
					throw new Error(`Http error! Status: ${response.status}`);
				}

				const dataArr = await response.json();

				if (!dataArr.newses) {
					setError('Data not received');
					return;
				}

				if (dataArr.newses.length < 1 && page === 1) {
					setEndErr(true);
					setEnd(true);
				}

				if (dataArr.newses.length < 1) {
					setEnd(true);
				}

				setNewses((prev) => [...prev, ...dataArr.newses]);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [page]);

	const handleScroll = () => {
		if (
			window.innerHeight + document.documentElement.scrollTop + 1 >=
			document.documentElement.scrollHeight
		) {
			if (!end) {
				setPage((prev) => prev + 1);
			}
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	});

	return (
		<div>
			<p className='py-6 underline italic text-center text-2xl'>
				{category?.name}
			</p>
			<div className='flex px-6 py-2 gap-5 flex-wrap w-full justify-center'>
				{!newses ? (
					<MsgShower msg={'No News Available'} />
				) : (
					newses.map((item) => {
						return <NewsCard key={item?._id} news={item} />;
					})
				)}
				{loading && <Loader />}
				{error && <ScrollMsg msg={error} />}
				{endErr && <NoDataComponent />}
			</div>
		</div>
	);
}
