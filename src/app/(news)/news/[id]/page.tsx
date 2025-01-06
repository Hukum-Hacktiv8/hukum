import NewsArticle from "../../NewsArticle";


interface Article {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  content: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  thumbnail: string;
  isSaved: boolean;
  tags: string[];
  relatedArticles: {
    id: number;
    title: string;
    category: string;
    thumbnail: string;
  }[];
}

type Props = {
  params: {
    id: string;
  };
};

const comotDataArticle = async (id: string): Promise<Article> => {
  const response = await fetch(`http://localhost:3001/news/${id}`);
  const responseJson = await response.json();

  return responseJson;
};

const Page = async (props: Props) => {
  const article = await comotDataArticle(props.params.id);

  return <NewsArticle article={article} />;
};

export default Page;
