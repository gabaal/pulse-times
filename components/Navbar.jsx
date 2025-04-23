'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { FaBars, FaBook, FaChartLine, FaEye, FaHome } from 'react-icons/fa';
import { BiSolidCategory } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { useSession } from 'next-auth/react';

export default function Navbar() {
	const pathname = usePathname();
	const router = useRouter();
	const { status, data: session } = useSession();
	return (
		<div className='z-30 sticky top-0'>
			<div className='w-full flex justify-between h-16 navbar bg-gradient-to-t from-[#12243c] to-[#0f172a]'>
				<div>
					<Link href={'/'} className='text-xl flex items-center'>
						<Image
							src={
								'https://res.cloudinary.com/dfahczcmd/image/upload/v1741717115/static-images/l56bb3cmpdevqa3bfm9n.png'
							}
							alt='Logo'
							width={40}
							height={40}
						/>
						<span className='ml-2 italic'>
							Pulse<span>Times</span>
						</span>
					</Link>
				</div>
				<div className='hidden lg:flex'>
					<ul className='menu menu-horizontal'>
						<li>
							<Link
								href={'/'}
								className={`${
									pathname === '/' && 'bg-primary'
								} flex items-center`}>
								<FaHome className='mr-1' /> Home
							</Link>
						</li>
						<li>
							<Link
								href={'/news/recent-news'}
								className={`${
									pathname === '/news/recent-news' && 'bg-primary'
								} flex items-center`}>
								<FaBook className='mr-1' />
								Recent News
							</Link>
						</li>
						<li>
							<Link
								href={'/categorized'}
								className={`${
									pathname === '/categoried' && 'bg-primary'
								} flex items-center`}>
								<BiSolidCategory className='mr-1' />
								Categorized
							</Link>
						</li>
						<li>
							<Link
								href={'/news/most-viewed'}
								className={`${
									pathname === '/news/most-viewed' && 'bg-primary'
								} flex items-center`}>
								<FaEye className='mr-1' />
								Most Viewed
							</Link>
						</li>
						<li>
							<Link
								href={'/news/trending'}
								className={`${
									pathname === '/news/trending' && 'bg-primary'
								} flex items-center`}>
								<FaChartLine className='mr-1' />
								Trending
							</Link>
						</li>
						{status === 'unauthenticated' && (
							<li>
								<Link
									href={'/profile'}
									className={`${
										pathname === '/profile' && 'bg-primary'
									} flex items-center`}>
									<CgProfile className='mr-1' />
									Profile
								</Link>
							</li>
						)}
						{status === 'authenticated' && (
							<div className='mr-5 sm:mr-1 flex items-center justify-center'>
								<Image
									className='rounded-full border-2 shadow-blackish mr-3'
									role='button'
									src={session?.user?.image}
									width={28}
									height={28}
									alt='Profile Picture'
									onClick={() => router.push('/profile')}
								/>
							</div>
						)}
					</ul>
				</div>
				<div className='flex-none lg:hidden'>
					<label
						htmlFor='my-drawer-3'
						aria-label='open sidebar'
						className='btn btn-square btn-ghost'>
						<FaBars />
					</label>
				</div>
			</div>
			<div className='drawer drawer-end z-20'>
				<input type='checkbox' id='my-drawer-3' className='drawer-toggle' />
				<div className='drawer-side'>
					<label
						htmlFor='my-drawer-3'
						aria-label='close sidebar'
						className='drawer-overlay'></label>
					<div className='menu p-4 w-80 min-h-full bg-base-200 flex flex-col gap-3'>
						<p>
							<label
								htmlFor='my-drawer-3'
								className='cursor-pointer hover:bg-base-100 h-10 flex items-center p-3 rounded-md'>
								<span
									className={`w-full text-lg flex items-center ${
										pathname === '/' && 'text-primary'
									}`}
									onClick={() => router.push('/')}>
									<FaHome className='mr-2' />
									Home
								</span>
							</label>
						</p>
						<p>
							<label
								htmlFor='my-drawer-3'
								className='cursor-pointer hover:bg-base-100 h-10 flex items-center p-3 rounded-md'>
								<span
									className={`w-full text-lg flex items-center ${
										pathname === '/news/recent-news' && 'text-primary'
									}`}
									onClick={() => router.push('/news/recent-news')}>
									<FaBook className='mr-2' />
									Recent News
								</span>
							</label>
						</p>
						<p>
							<label
								htmlFor='my-drawer-3'
								className='cursor-pointer hover:bg-base-100 h-10 flex items-center p-3 rounded-md'>
								<span
									className={`w-full text-lg flex items-center ${
										pathname === '/categorized' && 'text-primary'
									}`}
									onClick={() => router.push('/categorized')}>
									<BiSolidCategory className='mr-2' />
									Categorized
								</span>
							</label>
						</p>
						<p>
							<label
								htmlFor='my-drawer-3'
								className='cursor-pointer hover:bg-base-100 h-10 flex items-center p-3 rounded-md'>
								<span
									className={`w-full text-lg flex items-center ${
										pathname === '/news/most-viewed' && 'text-primary'
									}`}
									onClick={() => router.push('/news/most-viewed')}>
									<FaEye className='mr-2' />
									Most Viewed
								</span>
							</label>
						</p>
						<p>
							<label
								htmlFor='my-drawer-3'
								className='cursor-pointer hover:bg-base-100 h-10 flex items-center p-3 rounded-md'>
								<span
									className={`w-full text-lg flex items-center ${
										pathname === '/news/trending' && 'text-primary'
									}`}
									onClick={() => router.push('/news/trending')}>
									<FaChartLine className='mr-2' />
									Trending
								</span>
							</label>
						</p>
						<p>
							<label
								htmlFor='my-drawer-3'
								className='cursor-pointer hover:bg-base-100 h-10 flex items-center p-3 rounded-md'>
								<span
									className={`w-full text-lg flex items-center ${
										pathname === '/profile' && 'text-primary'
									}`}
									onClick={() => router.push('/profile')}>
									<CgProfile className='mr-2' />
									Profile
								</span>
							</label>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
