import logo from "./logo.svg";
import "./App.css";

import { Editor } from "react-draft-wysiwyg";
import "./react-draft-wysiwyg.css";

function App() {
  return (
    <div className="App">
      <Editor
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        // wrapperStyle={<wrapperStyleObject>}
        // editorStyle={<editorStyleObject>}
        // toolbarStyle={<toolbarStyleObject>}
      />
    </div>
  );
}

export default App;
