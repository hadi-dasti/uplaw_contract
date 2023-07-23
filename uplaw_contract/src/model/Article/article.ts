

//interface of articles
export interface Article {
  numberArticle: string,
  author: string,
  titleArticle: string,
  description: string,
 datePublishArticle: Date,
 [key: string]: string | Date // define index signature
};

// data Article
export const articles: Article[] = [
    {
        numberArticle: "1",
        author: "John Doe",
        titleArticle: "First Article",
        description: "This is the first article",
        datePublishArticle: new Date("2023-07-23"),
    },
    {
        numberArticle: "2",
        author: "Jane Doe",
        titleArticle: "Second Article",
        description: "This is the second article",
        datePublishArticle: new Date("2023-07-24"),
    },
];