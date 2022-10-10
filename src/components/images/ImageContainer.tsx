import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Ratio } from "react-bootstrap";
import { BASE_URL } from "../../hooks/useAxios";
import MyButton from "../forms/MyButton";

type ImageContainerProps = {
  imgSrc: string;
  width?: number;
  ratio?: string;
  onDelete?: () => void;
} & React.ComponentProps<"div">;

export default function ImageContainer({
  imgSrc,
  width = 400,
  ratio = "16x9",
  onDelete,
  style, ...props
}: ImageContainerProps) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: "auto",
        position: "relative",
        ...style,
      }}

      {...props}
    >
      <Ratio aspectRatio={ratio}>
        <img
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          src={`${imgSrc}`}
          className="rounded-2"
        />
      </Ratio>
      {onDelete && (
        <MyButton
          variant="danger"
          style={{ right: "5%", top: "5%", position: "absolute" }}
          onClick={() => onDelete()}
        >
          <FontAwesomeIcon icon={faTrash} />
        </MyButton>
      )}
    </div>
  );
}
