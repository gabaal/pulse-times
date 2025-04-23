'use client';

import { useEffect } from 'react';
import { BiBold, BiItalic } from 'react-icons/bi';
import { FaListUl, FaQuoteLeft, FaUnderline } from 'react-icons/fa';
import { MdFormatStrikethrough, MdUndo } from 'react-icons/md';
import { LuHeading2 } from 'react-icons/lu';
import { LiaListOlSolid } from 'react-icons/lia';
import { IoMdRedo } from 'react-icons/io';
import { IoCode } from 'react-icons/io5';

export default function Toolbar({ editor, content, description }) {
	useEffect(() => {
		editor && editor.commands.setContent(description);
	}, [description, editor]);

	if (!editor) {
		return null;
	}
	return (
		<div className='px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-center gap-5 w-full flex-wrap border border-gray-300'>
			<div className='flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap'>
				<button
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().toggleBold().run();
					}}
					className={
						editor.isActive('bold')
							? 'bg-primary text-white p-2 rounded-lg'
							: 'text-primary'
					}>
					<BiBold className='w-5 h-5' />
				</button>
				<button
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().toggleItalic().run();
					}}
					className={
						editor.isActive('italic')
							? 'bg-primary text-white p-2 rounded-lg'
							: 'text-primary'
					}>
					<BiItalic className='w-5 h-5' />
				</button>
				<button
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().toggleUnderline().run();
					}}
					className={
						editor.isActive('underline')
							? 'bg-primary text-white p-2 rounded-lg'
							: 'text-primary'
					}>
					<FaUnderline className='w-5 h-5' />
				</button>
				<button
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().toggleStrike().run();
					}}
					className={
						editor.isActive('strike')
							? 'bg-primary text-white p-2 rounded-lg'
							: 'text-primary'
					}>
					<MdFormatStrikethrough className='w-5 h-5' />
				</button>
				<button
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().toggleHeading({ level: 2 }).run();
					}}
					className={
						editor.isActive('heading', { level: 2 })
							? 'bg-primary text-white p-2 rounded-lg'
							: 'text-primary'
					}>
					<LuHeading2 className='w-5 h-5' />
				</button>
				<button
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().toggleBulletList().run();
					}}
					className={
						editor.isActive('bulletList')
							? 'bg-primary text-white p-2 rounded-lg'
							: 'text-primary'
					}>
					<FaListUl className='w-5 h-5' />
				</button>
				<button
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().toggleOrderedList().run();
					}}
					className={
						editor.isActive('orderedList')
							? 'bg-primary text-white p-2 rounded-lg'
							: 'text-primary'
					}>
					<LiaListOlSolid className='w-5 h-5' />
				</button>
				<button
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().toggleBlockquote().run();
					}}
					className={
						editor.isActive('blockquote')
							? 'bg-primary text-white p-2 rounded-lg'
							: 'text-primary'
					}>
					<FaQuoteLeft className='w-5 h-5' />
				</button>
				<button
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().setCode().run();
					}}
					className={
						editor.isActive('code')
							? 'bg-primary text-white p-2 rounded-lg'
							: 'text-primary'
					}>
					<IoCode className='w-5 h-5' />
				</button>
				<button
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().undo().run();
					}}
					className={
						editor.isActive('undo')
							? 'bg-primary text-white p-2 rounded-lg'
							: 'text-primary'
					}>
					<MdUndo className='w-5 h-5' />
				</button>
				<button
					onClick={(e) => {
						e.preventDefault();
						editor.chain().focus().redo().run();
					}}
					className={
						editor.isActive('redo')
							? 'bg-primary text-white p-2 rounded-lg'
							: 'text-primary'
					}>
					<IoMdRedo className='w-5 h-5' />
				</button>
			</div>
		</div>
	);
}
