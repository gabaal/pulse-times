import BookmarkButton from '@/components/BookmarkButton';
import CreateHistory from '@/components/CreateHistory';
import NewsCard from '@/components/NewsCard';
import { formatReadableDateTime } from '@/lib/formatTime';
import Image from 'next/image';
import { FiUser } from 'react-icons/fi';

const fetchNews = async (newsIdentifier) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/allNews/getNewsByIdOrSlug?newsIdentifier=${newsIdentifier}`,
		{
			next: { revalidate: 60 },
		}
	);

	if (!res.ok) return null;

	const data = await res.json();
	return data.news;
};

const fetchSuggestedNews = async (newsIdentifier) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/allNews/getSuggestedNews?newsIdentifier=${newsIdentifier}`,
		{ next: { revalidate: 60 } }
	);

	if (!res.ok) return [];
	const data = await res.json();
	return data.newses;
};

export default async function ViewNews({ params }) {
	const { newsIdentifier } = await params;
	const news = await fetchNews(newsIdentifier);
	const suggestedNewses = await fetchSuggestedNews(newsIdentifier);
	return (
		<main>
			<div className='py-8 lg:py-12 px-7'>
				<div className='mb-7'>
					<h4 className='text-base font-bold mb-4'>News</h4>
					<h1>{news.title}</h1>
					<span className='flex w-[60px] h-1 my-4'></span>
					<div className='flex justify-between items-center border-b border-slate-700 pb-2'>
						<p className='flex items-center gap-2 text-xs'>
							<FiUser className='inline' /> Pulse Times
							<span className='text-lg'>.</span>
							{formatReadableDateTime(news.createdAt)}
						</p>
						<BookmarkButton newsIdentifier={newsIdentifier} />
					</div>
				</div>

				<div className='grid grid-cols-12 gap-7'>
					<div className='col-span-12 md:col-span-7 lg:col-span-8'>
						<Image
							height={400}
							width={600}
							className='w-full aspect-w-16 aspect-h-9'
							src={news.thumbnailURL}
							alt={news.title}
						/>
						<p className='flex items-center gap-2 text-xs my-2'>
							Image: Internet
						</p>
						<div
							dangerouslySetInnerHTML={{ __html: news.description }}
							className='flex flex-col gap-3 text-base'></div>
						<hr className='mt-4' />
						<div className='flex flex-wrap gap-4 mt-4'>
							<span className='bg-base-200 py-2.5 px-5 text-sm'>News</span>
							<span className='bg-base-200 py-2.5 px-5 text-sm'>PulseTime</span>
							<span className='bg-base-200 py-2.5 px-5 text-sm'>SEO</span>
						</div>
					</div>

					<div className='col-span-12 md:col-span-8 lg:col-span-4'>
						<h2 className='mb-4'>Explore more</h2>
						<div className='flex flex-col gap-4'>
							{suggestedNewses.map((item) => (
								<NewsCard key={item?._id} news={item} />
							))}
						</div>
					</div>
				</div>
			</div>
			<CreateHistory />
		</main>
	);
}
