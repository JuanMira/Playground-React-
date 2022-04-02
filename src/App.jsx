import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import "./App.css";

function App() {
  const [js, setJS] = useState("");
  const [css, setCss] = useState("");
  const [html, setHtml] = useState("");
  const editorRef = useRef(null);
  const irframeRef = useRef(null);

  useEffect(() => {
    changeEditor();
  }, [js, css, html]);

  function handleEditorDidMountHtml(editor, monaco) {
    editorRef.current = editor;
  }

  function handleEditorDidMountJs(editor, monaco) {
    editorRef.current = editor;
  }

  function handleEditorDidMountCss(editor, monaco) {
    editorRef.current = editor;
  }

  function changeEditor() {
    irframeRef.current.srcdoc = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        ${html}
        <script>${js}</script>
      </html>
    `;
  }

  function handleEditorChangeJS(value, event) {
    setJS(value);
  }
  function handleEditorChangeCss(value, event) {
    setCss(value);
  }

  function handleEditorChange(value, event) {
    if (event.changes[0].text !== "\r\n") setHtml(value);
  }

  return (
    <div className="container">
      <div className="options"></div>
      <div className="layout">
        <div>
          <Editor
            height={"45vh"}
            defaultLanguage="javascript"
            theme="vs-dark"
            onMount={handleEditorDidMountJs}
            onChange={handleEditorChangeJS}
          />
        </div>
        <div>
          <Editor
            height={"45vh"}
            defaultLanguage="html"
            theme="vs-dark"
            onMount={handleEditorDidMountHtml}
            onChange={handleEditorChange}
          />
        </div>
        <div>
          <Editor
            height={"45vh"}
            defaultLanguage="css"
            theme="vs-dark"
            onMount={handleEditorDidMountCss}
            onChange={handleEditorChangeCss}
          />
        </div>
        <div>
          <iframe ref={irframeRef} className="viewer" />
        </div>
      </div>
    </div>
  );
}

export default App;
