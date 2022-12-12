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

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);

  return (
    <article>
      <h2>Update</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onUpdate(title, body);
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </p>
        <p>
          <textarea
            name="body"
            placeholder="body"
            value={body}
            onChange={(event) => {
              setBody(event.target.value);
            }}
          ></textarea>
        </p>
        <p>
          <input type="submit" value="Update"></input>
        </p>
      </form>
    </article>
  );
}

function App() {
  const [mode, setMode] = useState("menu");
  const [id, setId] = useState(null);
  let content = null;
  let contextControl = null;

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
  } else if (mode === "READ") {
    let title,
      body = null;
    for (let i = 0; i < foods.length; i++) {
      if (foods[i].id === id) {
        title = foods[i].title;
        body = foods[i].body;
      }
    }
    content = <Content title={title} body={body} />;
    contextControl = (
      <>
        <li>
          <a
            href="/update"
            onClick={(event) => {
              event.preventDefault();
              setMode("UPDATE");
            }}
          >
            update
          </a>
        </li>
        <li>
          <input
            type="button"
            value="Delete"
            onClick={() => {
              const newFoods = [];
              for (let i = 0; i < foods.length; i++) {
                if (foods[i].id !== id) {
                  newFoods.push(foods[i]);
                }
              }
              setFoods(newFoods);
              setMode("menu");
            }}
          />
        </li>
      </>
    );
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={(_title, _body) => {
          const newFood = { id: nextId, title: _title, body: _body };
          const newFoods = [...foods];
          newFoods.push(newFood);
          setFoods(newFoods); // 여기서 setFoods(newFood) 해서 계속 작동 안되던 것이였음 ㅠㅠ
          setMode("READ");
          setId(nextId);
          setNextId(nextId + 1);
        }}
      ></Create>
    );
  } else if (mode === "UPDATE") {
    let title,
      body = null;
    for (let i = 0; i < foods.length; i++) {
      if (foods[i].id === id) {
        title = foods[i].title;
        body = foods[i].body;
      }
    }

    content = (
      <Update
        title={title}
        body={body}
        onUpdate={(title, body) => {
          const updatedFood = { id: id, title: title, body: body };
          const newFoods = [...foods];

          for (let i = 0; i < newFoods.length; i++) {
            if (newFoods[i].id === id) {
              newFoods[i] = updatedFood;
            }
          }
          setFoods(newFoods);
          setMode("READ");
        }}
      ></Update>
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
          setMode("READ");
          setId(_id);
        }}
      ></Links>
      {content}

      <ul>
        <li>
          <a
            href="/create"
            onClick={(event) => {
              event.preventDefault();
              setMode("CREATE");
            }}
          >
            Create
          </a>
        </li>

        {contextControl}
      </ul>
    </div>
  );
}

export default App;
