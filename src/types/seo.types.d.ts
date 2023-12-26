interface ISeo {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  metaRobots: string;
  structuredData: {
    [key: string]: string;
  };
  metaViewport: string;
  canonicalURL: string;
}
