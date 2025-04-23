'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { MdBookmarkAdd } from 'react-icons/md';

export default function BookmarkButton({ newsIdentifier }) {
	const { data: session } = useSession();
	const [bookmarked, setBookmarked] = useState(false);

	useEffect(() => {
		const fetchBookmarkStatus = async () => {
			if (!session?.user?.mongoId) return;
			try {
				const res = await fetch(
					`/api/bookmarks/bookmarkStatus?newsIdentifier=${newsIdentifier}`
				);
				const { hasBookmarked } = await res.json();
				setBookmarked(hasBookmarked);
			} catch (error) {
				console.log(error);
			}
		};
		fetchBookmarkStatus();
	}, [newsIdentifier, session]);

	const handleBookmark = async () => {
		if (!session?.user?.mongoId) return;

		try {
			const url = bookmarked
				? `/api/bookmarks/removeBookmark?newsIdentifier=${newsIdentifier}`
				: `/api/bookmarks/doBookmark?newsIdentifier=${newsIdentifier}`;

			const method = bookmarked ? 'DELETE' : 'POST';
			const res = await fetch(url, { method });

			if (res.ok) {
				setBookmarked(!bookmarked);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<MdBookmarkAdd
			className={`cursor-pointer h-6 w-6 ${
				bookmarked ? 'text-primary' : 'text-slate-400'
			}`}
			onClick={handleBookmark}
		/>
	);
}
