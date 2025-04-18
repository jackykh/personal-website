import Head from "next/head";
import { GetStaticProps } from "next";
import Navigation from "@/Components/uiComponents/Navigation";
import Footer from "@/Components/Footer";
import Link from "next/link";
import { authClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import Giscus from "@giscus/react";
import BlinkText from "@/Components/uiComponents/BlinkText";
import classes from "@/styles/Category.module.css";

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
      <main
        className={`py-24 px-8 flex flex-col items-center ${classes.bgGrid}`}
      >
        <h1 className="text-4xl pb-4 font-bold">Categories</h1>
        <div className="flex flex-col w-[60rem] max-w-full items-center">
          <div className="pt-8 pb-32 max-w-[40rem] flex gap-y-2 gap-x-4 flex-wrap">
            {categories.map((category) => (
              <Link
                href={`/blog/category/${category.id}/page/1`}
                key={category.name}
              >
                <BlinkText
                  text={category.name}
                  className="text-xl rounded px-2 py-1 bg-[#1A1E23] text-white"
                />
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
              theme="light_high_contrast"
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
};

export default categoriesList;
