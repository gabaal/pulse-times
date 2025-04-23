'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function NewsCard({ news }) {
	const router = useRouter();
	const pathname = usePathname();
	return (
		<div
			onClick={() => router.push(`/news/view/${news.slug}`)}
			className='card hover:cursor-pointer md:w-96 sm:max-w-96 w-full bg-slate-800 shadow-xl rounded-lg overflow-hidden'>
			{news?.thumbnailURL && (
				<figure>
					<Image
						src={news?.thumbnailURL}
						alt={news?.title}
						width={600}
						height={400}
						className='object-cover h-48 w-full'
					/>
				</figure>
			)}

			<div className='card-body bg-slate-900 text-gray-100 p-5'>
				<h2 className='card-title text-lg font-bold hover:text-indigo-400 transition'>
					{news?.title}
				</h2>

				{news?.shortDescription && (
					<p className='mt-2 text-sm text-gray-300'>{news?.shortDescription}</p>
				)}

				<div className='mt-3 text-xs text-gray-400'>
					{news?.viewsCount} views
				</div>

				{pathname.includes('/admin-controls') && (
					<div className='card-actions justify-end mt-4'>
						<button
							className='btn btn-primary btn-sm'
							onClick={(e) => {
								e.stopPropagation();
								router.push(`/admin-controls/news/update/${news?._id}`);
							}}>
							Edit
						</button>
						<button
							className='btn btn-error btn-sm'
							onClick={(e) => {
								e.stopPropagation();
								router.push(`/admin-controls/news/delete/${news?._id}`);
							}}>
							Delete
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
