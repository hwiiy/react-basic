import React from "react";
import { useState } from "react";
import classes from "./Review.module.css";

function Menu(props) {
  return (
    <div className={classes.Menu}>
      <h1>
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode();
          }}
        >
          MENU!
        </a>
      </h1>
    </div>
  );
}

function Content(props) {
  return (
    <div className={classes.article}>
      <article>
        <h2>{props.title}</h2>

        <div>{props.body}</div>
      </article>
    </div>
  );
}

function Links(props) {
  const li = [];

  for (let i = 0; i < props.foods.length; i++) {
    const food = props.foods[i];
    li.push(
      <li key={food.id}>
        <a
          className={classes.links}
          id={food.id}
          href={"/food/" + food.id}
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id));
          }}
        >
          {food.title}
        </a>
      </li>
    );
  }

  return <ul className={classes.content}>{li}</ul>;
}
function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onCreate(title, body);
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="Create"></input>
        </p>
      </form>
    </article>
  );
}

function App() {
  const [mode, setMode] = useState(null);
  const [id, setId] = useState(null);
  let content = null;

  const [nextId, setNextId] = useState(4);
  const [foods, setFoods] = useState([
    {
      id: 1,
      title: "kimbab",
      body: "i love kimbab ...",
    },
    {
      id: 2,
      title: "noodle",
      body: "i dont like noodle ...",
    },
    {
      id: 3,
      title: "chicken",
      body: "i love chicken...",
    },
  ]);

  if (mode === "menu") {
    content = <Content title="hello" body=" this is menu!!" />;
  } else if (mode === "link") {
    let title,
      body = null;
    for (let i = 0; i < foods.length; i++) {
      if (foods[i].id === id) {
        title = foods[i].title;
        body = foods[i].body;
      }
    }
    content = <Content title={title} body={body} />;
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(_title, _body) => {
          const newFood = { id: nextId, title: _title, body: _body };
          const newFoods = [...foods];
          newFoods.push(newFood);
          setFoods(newFoods); // 여기서 setFoods(newFood) 해서 계속 작동 안되던 것이였음 ㅠㅠ
          setMode("link");
          setId(nextId);
          setNextId(nextId + 1);
        }}
      ></Create>
    );
  }

  return (
    <div>
      <Menu
        onChangeMode={() => {
          setMode("menu");
        }}
      />
      <Links
        foods={foods}
        onChangeMode={(_id) => {
          setMode("link");
          setId(_id);
        }}
      ></Links>
      {content}
      <a
        href="/create"
        onClick={(event) => {
          event.preventDefault();
          setMode("CREATE");
        }}
      >
        Create
      </a>
    </div>
  );
}

export default App;
