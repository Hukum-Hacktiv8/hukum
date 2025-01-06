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
  const response = await fetch(`http://localhost:3000/api/blogpost/${id}`);
  const responseJson = await response.json();
  // console.log(responseJson, "<<< 36");
  return responseJson;
};

const Page = async (props: Props) => {
  const article: any = await comotDataArticle(props.params.id);
  // console.log(props.params.id, "<<< 42");
  // console.log(article.data.author.name, "<<< 42");
  // return <NewsArticle article={{ data: article }} />;
  return <NewsArticle article={article} />;
};

export default Page;