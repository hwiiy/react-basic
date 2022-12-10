import { useState } from "react";

function Header(props) {
  return (
    <div>
      <h1>
        <a
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode();
          }}
          href="#"
        >
          WEB!!
        </a>
      </h1>
    </div>
  );
}

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.content}
    </article>
  );
}

function Nav(props) {
  const lis = [];

  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={"/read/" + t.id}
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode(event.target.id);
          }}
        >
          {t.title}
        </a>
      </li>
    );
  }
  return (
    <div>
      <ol>{lis}</ol>
    </div>
  );
}

function App() {
  const topics = [
    { id: 1, title: "html", body: "html is ..." },
    { id: 2, title: "css", body: "css is ..." },
    { id: 3, title: "javascript", body: "javascript is ..." },
  ];

  const [mode, setMode] = useState("null");

  let content = null;
  if (mode === "web") {
    content = <Article title="hello" content="web!"></Article>;
  } else if (mode === "read") {
    content = <Article title="hello" content="read!"></Article>;
  }

  return (
    <div>
      <Header onChangeMode={() => setMode("web")}></Header>
      <Nav topics={topics} onChangeMode={() => setMode("read")}></Nav>
      {content}
    </div>
  );
}

export default App;
