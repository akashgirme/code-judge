'use client';
import { CodeEditorPanelLogic, CodeEditorPanelModel } from './code-editor-panel-logic';

export const CodeEditorPanelContainer = () => {
  const defaultValues: CodeEditorPanelModel = {
    sourceCode: '// Write your code here',
    language: 'cpp',
  };
  return <CodeEditorPanelLogic defaultValues={defaultValues} />;
};
