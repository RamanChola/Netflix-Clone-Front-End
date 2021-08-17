import { ArrowBackOutlined } from "@material-ui/icons";
import "./watch.scss";

export default function Watch() {
  return (
    <div className="watch">
      <div className="back">
        <ArrowBackOutlined />
        Home
      </div>
      <video
        className="video"
        autoPlay
        muted
        controls
        src="https://upload.wikimedia.org/wikipedia/commons/7/70/NEFFEX_-_Make_It_%28Official_Video%29_Fight_Back_The_Collection_OUT_NOW%21_-_YouTube.webm"
        poster="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/NEFFEX_-_Make_It_%28Official_Video%29_Fight_Back_The_Collection_OUT_NOW%21_-_YouTube.webm/800px--NEFFEX_-_Make_It_%28Official_Video%29_Fight_Back_The_Collection_OUT_NOW%21_-_YouTube.webm.jpg"
        width="100%"
        height="100%"
      />
    </div>
  );
}
