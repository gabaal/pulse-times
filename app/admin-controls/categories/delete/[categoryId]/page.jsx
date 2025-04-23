'use client';

import { deleteCategoryAction } from '@/actions/categoryActions';
import DeleteConfirmer from '@/components/DeleteConfirmer';
import Loader from '@/components/Loader';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DeleteCategory() {
	const params = useParams();
	const { status, data: session } = useSession();
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const doRedirect = async () => {
			if (!session?.user || session?.user?.role !== 'superAdmin') {
				router.replace('/admin-controls');
			} else {
				setLoading(false);
			}
		};
		doRedirect();
	}, [session, router]);

	if (loading || status === 'loading') {
		return <Loader />;
	}
	return (
		<DeleteConfirmer
			ModelType={'Category'}
			deleteAction={() => deleteCategoryAction(params?.categoryId)}
		/>
	);
}
