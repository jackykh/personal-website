import Head from "next/head";
import { GetStaticProps } from "next";
import Navigation from "@/Components/uiComponents/Navigation";
import Footer from "@/Components/Footer";
import Link from "next/link";
import { authClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import Giscus from "@giscus/react";
import BlinkText from "@/Components/uiComponents/BlinkText";

const categoriesList = (props: {
  categories: Array<{
    name: string;
    id: number;
  }>;
}) => {
  const { categories } = props;
  return (
    <>
      <Head>
        <title>Categories - Jacky&apos;s Blog</title>
        <meta name="description" content="Categories - Jacky's Blog" />
      </Head>
      <Navigation />
      <main className="pt-32 pb-24 px-6 sm:px-10 flex flex-col items-center min-h-screen">
        <div className="w-full max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted mb-6">
            Blog
          </p>
          <h1 className="font-display font-medium uppercase tracking-[-0.02em] leading-none text-[clamp(2.5rem,6vw,4.5rem)] text-ink mb-12">
            Categories
          </h1>
          <div className="pb-24 flex gap-3 flex-wrap">
            {categories.map((category) => (
              <Link
                href={`/blog/category/${category.id}/page/1`}
                key={category.name}
                className="border border-line rounded-full px-5 py-2 text-sm text-soft hover:border-ink hover:text-ink transition-colors"
              >
                <BlinkText text={category.name} />
              </Link>
            ))}
          </div>
          <div className="w-full">
            <Giscus
              id="comments"
              repo="jackykh/blog-comments"
              repoId="R_kgDOM0EbrQ"
              category="Announcements"
              categoryId="DIC_kwDOM0Ebrc4CinA8"
              mapping="pathname"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="top"
              theme="noborder_light"
              lang="en"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const CATEGORIES = gql`
      query GetCategories($start: Int!, $limit: Int!) {
        categories(pagination: { start: $start, limit: $limit }) {
          data {
            id: id
            attributes {
              name
            }
          }
        }
      }
    `;
    const { data } = await authClient.query({
      query: CATEGORIES,
      variables: {
        start: 0,
        limit: 50,
      },
    });

    interface categoriesData {
      categories: {
        data: Array<{
          id: string;
          attributes: {
            name: string;
          };
        }>;
      };
    }
    const categoriesData = data as categoriesData;

    return {
      props: {
        categories: categoriesData.categories.data.map((data) => {
          return { id: data.id, name: data.attributes.name };
        }),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        categories: [],
      },
    };
  }
};

export default categoriesList;
