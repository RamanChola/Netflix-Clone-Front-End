import "./list.scss";
import ArrowBackIosOutlined from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlined from "@material-ui/icons/ArrowForwardIosOutlined";
import ListItem from "../listItem/ListItem";
import { useRef } from "react";
import { useState } from "react";
const List = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  const listRef = useRef();
  const handleClick = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 50;
    console.log(distance);
    if (direction === "left" && slideNumber > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSlideNumber(slideNumber - 1);
    }
    if (direction === "right" && slideNumber < 4) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSlideNumber(slideNumber + 1);
      setIsMoved(true);
    }
  };
  return (
    <div className="list">
      <span className="listTitle">Continue to watch</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className="container" ref={listRef}>
          <ListItem index={0}/>
          <ListItem index={1}/>
          <ListItem index={2}/>
          <ListItem index={3}/>
          <ListItem index={4}/>
          <ListItem index={5}/>
          <ListItem index={6}/>
          <ListItem index={7}/>
          <ListItem index={8}/>
          <ListItem index={9}/>
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default List;
