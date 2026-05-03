import { Helmet } from "react-helmet-async";

export interface SeoProps {
  title: string;
  description: string;
  path?: string; // canonical path, e.g. "/services"
  image?: string; // absolute or relative
  type?: "website" | "article";
}

const SITE_NAME = "HealthDrive";
const DEFAULT_IMAGE = "/og-image.jpg";

const Seo = ({ title, description, path = "/", image = DEFAULT_IMAGE, type = "website" }: SeoProps) => {
  const origin = typeof window !== "undefined" ? window.location.origin : "https://healthdrive.lovable.app";
  const url = `${origin}${path}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const imageUrl = image.startsWith("http") ? image : `${origin}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE_NAME} — ${title}`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={`${SITE_NAME} — ${title}`} />
    </Helmet>
  );
};

export default Seo;
