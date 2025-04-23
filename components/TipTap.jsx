'use client';
import './styles.css';
import Underline from '@tiptap/extension-underline';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Toolbar from './Toolbar';

export default function TipTap({ onChange, content, description }) {
	const handleChange = (newContent) => {
		onChange(newContent);
	};
	const editor = useEditor({
		extensions: [StarterKit, Underline],
		editorProps: {
			attributes: {
				class:
					'flex flex-col px-4 py-3 justify-start min-h-80 border border-gray-300 text-slate-100 items-start w-full gap-3 font-medium text-[16px] pt-4 rounded-br-md rounded-bl-md outine-none',
			},
		},
		onUpdate: ({ editor }) => {
			handleChange(editor.getHTML());
		},
		immediatelyRender: false,
	});
	return (
		<div className='w-full mt-6'>
			<Toolbar editor={editor} content={content} description={description} />
			<EditorContent style={{ whiteSpace: 'pre-line' }} editor={editor} />
		</div>
	);
}
