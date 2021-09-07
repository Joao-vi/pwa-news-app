import { Row, Col } from "antd";
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

type EconomyProps = {
  values: [TNews] | undefined;
};

export function Economy({ values }: EconomyProps) {
  const history = useHistory();
  const renderImg = ({ image, description }: any) => (
    <img src={image.url} alt={description} width="100%" />
  );

  const renderDescription = (description: string) => (
    <p dangerouslySetInnerHTML={createMarkup(description)} />
  );

  const openPost = (id: string) => {
    history.push(`/economy/${id}`);
  };

  const renderPost = (post: any, index: any) => {
    const { title, image, description, id } = post;
    const isFirst = index === 0;
    const spanValue = isFirst ? 24 : 12;
    return (
      <Col span={spanValue} md={12} key={`Post - ${id}`}>
        <article onClick={() => openPost(id)}>
          <p>
            <strong dangerouslySetInnerHTML={createMarkup(title)} />
          </p>
          {image?.url
            ? renderImg({ image, description })
            : renderDescription(description)}
        </article>
      </Col>
    );
  };

  return <Row gutter={[16, 16]}>{values?.map(renderPost)}</Row>;
}
