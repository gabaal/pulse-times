'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export default function SigninBtn() {
	return (
		<div className='flex flex-col items-center justify-center text-white'>
			<div className='shadow-lg shadow-slate-900 rounded-lg p-8 max-w-md w-full text-center'>
				<div className='mb-6'>
					<Image
						alt='Logo'
						src={
							'https://res.cloudinary.com/dfahczcmd/image/upload/v1741717115/static-images/l56bb3cmpdevqa3bfm9n.png'
						}
						width={200}
						height={200}
						className='mx-auto'
					/>
				</div>
				<h1 className='text-3xl font-semibold mb-4'>Welcome Back!</h1>
				<p>Sign in to access your account and start your journey.</p>

				<button
					onClick={() => signIn('google')}
					className='flex bg-white items-center gap-4 mt-2 shadow-xl rounded-md pl-3 mx-auto'>
					<Image
						src={'/google-logo.webp'}
						width={30}
						height={30}
						alt='google logo'
					/>
					<span className='bg-blue-500 text-white px-4 py-3 rounded-tr-md rounded-br-md'>
						Sign in with Google
					</span>
				</button>
				<div className='mt-6 text-sm text-gray-400'>
					By signing in, you agree to our{' '}
					<Link href={'/tos'} className='text-blue-500 hover:underline'>
						Terms of Service
					</Link>{' '}
					and{' '}
					<Link href={'/privacy'} className='text-blue-500 hover:underline'>
						Privacy Policy
					</Link>
				</div>
			</div>
		</div>
	);
}
