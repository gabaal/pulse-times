'use client';

import Loader from '@/components/Loader';
import MsgShower from '@/components/MsgShower';
import NewsCard from '@/components/NewsCard';
import ScrollMsg from '@/components/ScrollMsg';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AllNews() {
	const [newses, setNewses] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [end, setEnd] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);

			try {
				const response = await fetch(`/api/allNews?page=${page}`);

				if (!response.ok) {
					throw new Error(`Http error! Status: ${response.status}`);
				}

				const dataArr = await response.json();

				if (!dataArr.newses) {
					setError('Data not received');
					return;
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
			<div className='flex flex-wrap items-center justify-between pl-7 pr-5 py-4'>
				<h2 className='font-bold text-lg'>All News</h2>
				<div className='flex justify-between flex-wrap'>
					<button
						className='bg-primary h-12 w-28 rounded-md'
						onClick={() => router.push('/admin-controls/news/add-new')}>
						Add
					</button>
				</div>
			</div>
			<div className='flex px-6 py-2 gap-5 flex-wrap w-full justify-center md:justify-stretch'>
				{!newses ? (
					<MsgShower msg={'No News Available'} />
				) : (
					newses.map((item) => {
						return <NewsCard key={item?._id} news={item} />;
					})
				)}
				{loading && <Loader />}
				{error && <ScrollMsg msg={error} />}
				{end && <ScrollMsg msg={'No further News!'} />}
			</div>
		</div>
	);
}
