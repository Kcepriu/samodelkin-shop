interface IFile {
  id: number;
  attributes: {
    name: string;
    alternativeText: any;
    caption: any;
    width: any;
    height: any;
    formats: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: any;
    provider: string;
    createdAt: string;
    updatedAt: string;
  };
}
