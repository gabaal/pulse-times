'use client';

import MsgShower from './MsgShower';
import NewsCard from './NewsCard';

export default function RecentNewses({ newses }) {
	return (
		<div>
			<p className='py-6 underline italic text-center text-2xl'>
				Recently Added
			</p>
			<div className='flex px-6 pt-2 pb-6 gap-5 flex-wrap w-full justify-center'>
				{!newses ? (
					<MsgShower msg={'No News Available!'} />
				) : (
					newses.map((item) => {
						return <NewsCard key={item._id} news={item} />;
					})
				)}
			</div>
		</div>
	);
}
