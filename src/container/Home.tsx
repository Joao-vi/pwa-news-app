import { FC, useEffect, useState } from "react";

import { Row, Col } from "antd";

import { getNews, getNewsById } from "../services/api";

import { Economy } from "./components/Economy";
import { Technology } from "./components/Technology";
import { World } from "./components/World";

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

type TNews = {
  world: [TTNews] | undefined;
  economy: [TTNews] | undefined;
  technology: [TTNews] | undefined;
};

export const Home: FC = () => {
  const [news, setNews] = useState<TNews>();
  const [loading, setLoading] = useState(false);

  function handleNews(articles: any) {
    setLoading(false);
    setNews({
      world: articles[0]?.value.value,
      economy: articles[1]?.value.value,
      technology: articles[2]?.value.value,
    });
  }

  useEffect(() => {
    setLoading(true);

    Promise.allSettled([
      getNews("world"),
      getNews("economy"),
      getNews("technology"),
    ]).then(handleNews);
  }, []);

  if (loading) return <div>Carregando...</div>;
  return (
    <div>
      <Row gutter={[4, 4]}>
        <Col span={24} md={15}>
          <h1>Economy</h1>
          <Economy values={news?.economy} />
        </Col>
        <hr />

        <Col md={8}>
          <h1>World</h1>
          <World values={news?.world} />
        </Col>
      </Row>
      <hr />
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h1>Technology</h1>
          <Technology values={news?.technology} />
        </Col>
      </Row>
    </div>
  );
};
