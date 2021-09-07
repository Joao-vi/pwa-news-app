import React from "react";

import ShareIcon from "../../images/share.svg";
import CopyIcon from "../../images/copy.svg";

const URL = "http://localhost:3000/api";

export function Actions({ post, subject }: any) {
  const { id, title } = post;

  const shareInfo = () => {
    navigator.share({
      title: `PWA News - ${subject}`,
      text: title,
      url: URL,
    });
  };

  const copyInfo = () => {
    navigator.clipboard.writeText(
      `${title} - Learn more about in: ${URL}/${subject}/${id} `
    );
  };

  const renderActions = () => {
    const action = copyInfo;

    const icon = CopyIcon;

    return (
      <img
        src={icon}
        width="50px"
        alt="icon"
        className="share-icon"
        onClick={action}
      />
    );
  };

  return <div className="share">{renderActions()}</div>;
}
