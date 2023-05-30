import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    const isHomepage = this.props?.__NEXT_DATA__.page === "/";
    return (
      <Html>
        <Head />
        <body className={isHomepage ? "scrollbar-hide" : ""}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
