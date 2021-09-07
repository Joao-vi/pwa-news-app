import { Row, Col, Divider } from "antd";
import { useHistory } from "react-router-dom";

import { createMarkup } from "../../utilis";

type TNews = {
  body: string;
  datePublished: string;
  description: string;
  id: string;
  title: string;
  url: string;
  image: {
    url: string | undefined;
    description: string;
  };
};

type TechnologyProps = {
  values: [TNews] | undefined;
};

export function Technology({ values }: TechnologyProps) {
  const history = useHistory();

  function renderImg({ url, description }: any) {
    return (
      <div>
        <img src={url} alt={description} width="100%" />
      </div>
    );
  }

  function openPost(id: string) {
    history.push(`/technology/${id}`);
  }

  function renderPost(post: TNews) {
    const { title, image, description, id } = post;

    return (
      <Col span={12} md={6} key={`Technology - ${id}  `}>
        <article onClick={() => openPost(id)}>
          <p>
            <strong dangerouslySetInnerHTML={createMarkup(title)} />
          </p>
          <p dangerouslySetInnerHTML={createMarkup(description)}></p>

          {image.url && renderImg(image)}
        </article>
      </Col>
    );
  }

  return <Row gutter={[16, 16]}>{values?.map(renderPost)}</Row>;
}
