import Image from 'next/image';
import { useState, useEffect } from 'react';

interface PreviewData {
  title: string;
  //   description: string;
  //   image: string;
  favicon: string;
}

interface LinkPreviewProps {
  url: string;
}

export const LinkPreview: React.FC<LinkPreviewProps> = ({ url }) => {
  const [previewData, setPreviewData] = useState<PreviewData>();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');
      const title = doc.querySelector('title')?.textContent || '';
      //   const description =
      //     doc
      //       .querySelector('meta[name="description"]')
      //       ?.getAttribute('content') || '';
      //   const image =
      //     doc
      //       .querySelector('meta[property="og:image"]')
      //       ?.getAttribute('content') || '';

      const faviconLink = doc.querySelector(
        'link[rel~="icon"]'
      ) as HTMLLinkElement;
      const faviconHref = faviconLink.getAttribute('href') || '';
      const favicon = faviconHref ? new URL(faviconHref, url).href : '';

      console.log({ url, faviconLink, favicon });

      setPreviewData({ title, favicon });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!previewData) {
    return <p>Failed to fetch link preview.</p>;
  }

  return (
    <a href={url} target="_blank">
      {previewData.favicon && (
        <img height={24} width={24} src={previewData.favicon} alt="Favicon" />
      )}
      <h3>{previewData.title}</h3>
      {/* <p>{previewData.description}</p> */}
      {/* {previewData.image && <img src={previewData.image} alt="Link Preview" />} */}
    </a>
  );
};
