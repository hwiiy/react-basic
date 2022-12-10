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

        <img src={props.img} style={{ width: "200px", height: "150px" }}></img>

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

function Review() {
  const [mode, setMode] = useState(null);
  const [id, setId] = useState(null);
  let content = null;

  const foods = [
    {
      id: 1,
      title: "kimbab",
      body: "i love kimbab ...",
      img: "https://www.seriouseats.com/thmb/WtcBGMWbdUcAIVe8zg4VCm2aqc4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2020__01__20200122-gimbap-vicky-wasik-24-f5ed1075f35846a29e0812ee053a1bf8.jpg",
    },
    {
      id: 2,
      title: "noodle",
      body: "i dont like noodle ...",
      img: "https://www.simplyrecipes.com/thmb/rqYG_EvkZ0lNR0WRrXMBw9r5ZVk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Korean-Spicy-Cold-Noodles-LEAD-17-39a55b09d58745b68811a2fddf304250.jpg",
    },
    {
      id: 3,
      title: "chicken",
      body: "i love chicken...",
      img: "https://www.seriouseats.com/thmb/IZEAHrIKyaHMFIWFl5ss7VpvgN4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/20210714-potato-starch-fried-chicken-vicky-wasik-seriouseats-20-17e193a6bf274bba9091810a0b18ef89.jpg",
    },
  ];

  if (mode === "menu") {
    content = (
      <Content
        title="hello"
        body=" this is menu!!"
        img="https://www.shutterstock.com/image-vector/fast-food-restaurant-menu-sandwiches-600w-586392848.jpg"
      />
    );
  } else if (mode === "link") {
    let title,
      body,
      img = null;
    for (let i = 0; i < foods.length; i++) {
      if (foods[i].id === id) {
        title = foods[i].title;
        body = foods[i].body;
        img = foods[i].img;
      }
    }

    content = <Content title={title} body={body} img={img} />;
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
    </div>
  );
}

export default Review;
