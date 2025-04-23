import RecentNewses from '@/components/RecentNewses';

const fetchNewes = async () => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/allNews?page=1`,
		{
			next: { revalidate: 3600 },
		}
	);
	if (!res.ok) return null;
	const data = await res.json();
	return data.newses;
};

export default async function Home() {
	const newses = await fetchNewes();
	return (
		<div
			style={{
				backgroundImage:
					'url("https://res.cloudinary.com/dccbdekei/image/upload/v1729067177/statics/jmz61s1kg03jsukz5zl2.jpg")',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				minHeight: '100vh',
			}}>
			<div className='hero text-white relative'>
				<div
					className='absolute inset-0 bg-black opacity-20'
					style={{ zIndex: 1 }}>
					{' '}
				</div>
				<div className='hero-content text-center relative z-10'>
					<div className='max-w-lg'>
						<h1 className='text-4xl md:text-5xl font-bold leading-snug tracking-wide'>
							Insights that Inspire <br />
							Stories that Stick
						</h1>
						<p className='py-6'>
							Explore the latest in technology, science breakthroughs, and
							entertainment trends. Stay updated with insights into innovations,
							discoveries, and cultural highlights that shape our world. Dive
							into captivating stories and expert analyses across tech, science,
							and pop culture.
						</p>
						<div className='flex gap-3 items-center justify-center'>
							<button className='btn bg-primary text-white rounded-full'>
								Get Started
							</button>
							<button className='btn  text-white rounded-full'>
								Learn More
							</button>
						</div>
					</div>
				</div>
			</div>
			<RecentNewses newses={newses} />
		</div>
	);
}
