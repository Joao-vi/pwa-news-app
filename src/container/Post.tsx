import { Actions } from "./components/Actions";
import { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { getNews, getNewsById } from "../services/api";
import { createMarkup } from "../utilis";
import { Col, Row } from "antd";

type TParams = {
  subject: string;
  id: string;
};

type TTNews = {
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

export function Post() {
  const { id, subject } = useParams<TParams>();
  const [post, setPost] = useState<any>({});
  const [news, setNews] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleNews = useCallback((data) => {
    setLoading(false);
    console.log(data[0].value.value);
    setNews(data[0].value.value);
    setPost(data[1].value);
  }, []);

  useEffect(() => {
    setLoading(true);
    Promise.allSettled([getNews(subject), getNewsById(subject, id)]).then(
      handleNews
    );
  }, [id, subject, handleNews]);

  const renderDescription = (description: string) => (
    <p dangerouslySetInnerHTML={createMarkup(description)}></p>
  );

  const openPost = (id: string) => history.push(`/${subject}/${id}`);

  const renderImg = ({ url, description }: any) => (
    <img src={url} alt={description} width="100%" />
  );
  const renderPost = (post: any) => {
    const { title, image, description, id } = post;

    return (
      <Col span={12} key={id}>
        <article onClick={() => openPost(id)}>
          <p>
            <strong dangerouslySetInnerHTML={createMarkup(title)} />
          </p>
          {image?.url ? renderImg(image) : renderDescription(description)}
        </article>
      </Col>
    );
  };

  if (loading) return <h1>Loading</h1>;

  const { title, image, description, body, dataPubislhed } = post;

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24} md={16}>
          <Actions post={post} subject={subject} />
          <p>{dataPubislhed}</p>
          <h1 dangerouslySetInnerHTML={createMarkup(title)} />
          {image && renderImg(image)}
          <p
            className="text"
            dangerouslySetInnerHTML={createMarkup(description)}
          />
          <hr />
          <p className="text" dangerouslySetInnerHTML={createMarkup(body)} />
        </Col>
      </Row>

      <Row>
        <Col span={24} md={20}>
          <hr />
          <h2>Releated Newss</h2>
          <Row gutter={[16, 16]}>{news.map(renderPost)}</Row>
        </Col>
      </Row>
    </div>
  );
}
