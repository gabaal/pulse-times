import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import MsgShower from '@/components/MsgShower';
import Link from 'next/link';
import MenuItem from '@/components/MenuItem';
import { MdCategory, MdNewspaper } from 'react-icons/md';
import { RiAdminFill } from 'react-icons/ri';
import { FaLink } from 'react-icons/fa';

export default async function AdminControls() {
	const session = await getServerSession(authOptions);

	if (session?.user?.role === 'admin' || session?.user?.role === 'superAdmin') {
		return (
			<div className='mx-auto ml-8'>
				<h2 className='py-4 font-bold text-2xl text-white'>Controls</h2>
				<div className='py-4 flex flex-wrap justify-evenly last:justify-stretch'>
					{session?.user?.role === 'superAdmin' && (
						<Link href={'/admin-controls/admin-create-delete'}>
							<MenuItem Icon={RiAdminFill} Title={'Manage Admins'} />
						</Link>
					)}
					<Link href={'/admin-controls/categories'}>
						<MenuItem Icon={MdCategory} Title={'Categories'} />
					</Link>
					<Link href={'/admin-controls/news'}>
						<MenuItem Icon={MdNewspaper} Title={'News'} />
					</Link>
				</div>
			</div>
		);
	}
	return <MsgShower msg={'You are not authorized'} />;
}
