import React, { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';

export default function StudioEditorMail({ content, onChange }) {
  const editorRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const editor = grapesjs.init({
      container: containerRef.current,
      height: '70vh',
      fromElement: false,
      storageManager: {
        type: null, 
        autosave: false,
        autoload: false,
      },
      components: content || '',
      style: '',

      plugins: ['gjs-blocks-basic'],
      pluginsOpts: {
        'gjs-blocks-basic': {
          blocks: ['text', 'column1', 'column2', 'column3', 'image'],
          flexGrid: true,
        },
      },
    });

    editorRef.current = editor;

    // Allow editing updates
    editor.on('update', () => {
      const html = editor.getHtml();
      onChange && onChange(html);
    });

    // Load a default editable text block if nothing is passed
    if (!content) {
      editor.addComponents(`
        <div style="padding: 20px;">
          <h1>Email!</h1>
          <p>Please start typing here...</p>
        </div>
      `);
    }

    return () => {
      editor.destroy();
      editorRef.current = null;
    };
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '70vh',
        overflow: 'hidden',
        marginBottom: '20px',
      }}
    >
      <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
}
