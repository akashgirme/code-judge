'use client';
import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Label, Switch, Card, CardContent } from '../../../ui';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Components } from 'react-markdown';

interface MarkdownEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
}

export const MarkdownEditor = ({ initialValue = '', onChange }: MarkdownEditorProps) => {
  const [content, setContent] = useState(initialValue);
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (value: string | undefined) => {
    const newValue = value || '';
    setContent(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const components: Components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter style={oneLight} language={match[1]} PreTag="div" {...props}>
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Markdown Editor</Label>
        <div className="flex items-center space-x-2">
          <Label htmlFor="preview-mode">Preview</Label>
          <Switch
            id="preview-mode"
            checked={showPreview}
            onCheckedChange={setShowPreview}
          />
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          {showPreview ? (
            <div className="p-4 prose dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <MDEditor
              value={content}
              onChange={handleChange}
              preview="edit"
              height={400}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
