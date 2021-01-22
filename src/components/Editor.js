import React from "react";
import AceEditor from "react-ace";

export const Editor = ({ mode, onChange, value }) => (
  <AceEditor
    value={value}
    className="Editor"
    fontSize={16}
    mode={mode}
    theme="monokai"
    onChange={onChange}
    name={`${mode}_editor`}
    editorProps={{ $blockScrolling: true }}
    width="800px"
  />
);
