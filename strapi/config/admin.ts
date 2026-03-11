import type { Core } from '@strapi/strapi';

const getPreviewPathname = (uid, { locale, document }) => {
  const { slug } = document;

  switch (uid) {
    case "api::page.page": {
      switch (slug) {
        case "homepage":
          return locale ? `/${locale}` : "/";

        case "pricing":
          return locale ? `/${locale}/pricing` : "/pricing";

        case "contact":
          return locale ? `/${locale}/contact` : "/contact";

        case "faq":
          return locale ? `/${locale}/faq` : "/faq";

        default:
          return slug
            ? locale
              ? `/${locale}/${slug}`
              : `/${slug}`
            : "/";
      }
    }

    case "api::product.product": {
      if (!slug) {
        return locale ? `/${locale}/products` : "/products";
      }

      return locale
        ? `/${locale}/products/${slug}`
        : `/products/${slug}`;
    }

    case "api::article.article": {
      if (!slug) {
        return locale ? `/${locale}/blog` : "/blog";
      }

      return locale
        ? `/${locale}/blog/${slug}`
        : `/blog/${slug}`;
    }

    default:
      return null;
  }
};

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env("CLIENT_URL")],
      async handler(uid, {documentId, locale, status}) {
        const document = await strapi.documents(uid as any).findOne({ documentId });
        const pathname = getPreviewPathname(uid, {locale, document});

        if (!pathname) {
          return null;
        }

        const urlSearchParams = new URLSearchParams({
          url: pathname,
          secret: env("PREVIEW_SECRET"),
          status,
        });

        // return `${env('PREVIEW_URL')}${pathname}`
        return `${env("CLIENT_URL")}/api/preview?${urlSearchParams}`;
      },
    },
  },
});

export default config;
