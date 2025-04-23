'use client';

import Loader from '@/components/Loader';
import MsgShower from '@/components/MsgShower';
import NewsCard from '@/components/NewsCard';
import NoDataComponent from '@/components/NoDataComponent';
import ScrollMsg from '@/components/ScrollMsg';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Bookmark() {
	const [bookmarks, setBookmarks] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [end, setEnd] = useState(false);
	const [endErr, setEndErr] = useState(false);
	const router = useRouter();
	const params = useParams();
	const { status, data: session } = useSession();

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);

			try {
				const response = await fetch(`/api/bookmarks?page=${page}`);

				if (!response.ok) {
					throw new Error(`Http error! Status: ${response.status}`);
				}

				const dataArr = await response.json();

				if (!dataArr.bookmarks) {
					setError('Data not received');
					return;
				}

				if (dataArr.bookmarks.length < 1 && page === 1) {
					setEndErr(true);
					setEnd(true);
				}

				if (dataArr.bookmarks.length < 1) {
					setEnd(true);
				}

				setBookmarks((prev) => [...prev, ...dataArr.bookmarks]);
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

	if (status === 'loading') {
		return <Loader />;
	}

	return (
		<div>
			<div className='flex px-6 py-2 gap-5 flex-wrap w-full justify-center'>
				{!bookmarks ? (
					<MsgShower msg={'No News bookmark Available'} />
				) : (
					bookmarks.map((item) => {
						return <NewsCard key={item?._id} news={item?.News} />;
					})
				)}
				{loading && <Loader />}
				{error && <ScrollMsg msg={error} />}
				{endErr && <NoDataComponent />}
			</div>
		</div>
	);
}
