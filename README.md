# Personal Website with Blog

This project is a responsive personal website built with Next.js, featuring a blog section with advanced features such as SSG (Static Site Generation), ISR (Incremental Static Regeneration), and an intelligent Summary API powered by Deepseek. The website integrates with a self-hosted Strapi CMS and dynamically generates summaries for blog posts that lack them.

## Features

- **Responsive Design**: Adapts to different screen sizes for an optimal user experience across devices.
- **Blog with SSG and ISR**: Combines Static Site Generation for fast load times with Incremental Static Regeneration to ensure up-to-date content.
- **GraphQL Integration**: Connects to a Strapi backend via GraphQL to manage and retrieve blog data.
- **Intelligent Summary API**: Automatically generates or updates blog post summaries using Deepseek's `deepseek-chat` model.
- **Automatic Page Revalidation**: Automatically revalidates pages when content changes via a custom API webhook.
- **Dynamic Sitemap**: Generates sitemaps dynamically by querying Strapi based on post data.

## Key Files

- **Components**: Modular and reusable components for navigation, pagination, and blog sections.
- **hooks**: Custom hooks to manage UI behaviors, such as media queries and debugging.
- **lib/apollo-client.ts**: Configures Apollo Client for GraphQL API integration.
- **pages/api/revalidate.ts**: Handles page revalidation triggered by Strapi webhook events.
- **pages/api/summary.ts**: Provides an API to generate and update blog post summaries using Deepseek.

## Revalidation API

The revalidate.ts API listens for specific events from Strapi (e.g., entry updates, deletions) and selectively revalidates blog posts and paginated lists. Key parts of this API:

- **Authentication**: Requires a secret token to ensure valid requests.
- **Event Handling**: Supports entry.update, entry.delete, entry.publish, and entry.unpublish.
- **Pagination Revalidation**: Revalidates paginated pages for posts and category-specific pages based on updated post counts.

## Summary API

The `summary.ts` API dynamically generates and updates summaries for blog posts. It uses Deepseek's `deepseek-chat` model to analyze blog content and create concise, high-quality summaries in Traditional Chinese.

### How It Works

1. **Fetch Post Data**:
   - Retrieves the blog post content and existing summary (if available) from the Strapi backend via GraphQL.
2. **Generate Summary**:
   - If the blog lacks a summary, it invokes the Deepseek API to generate one.
3. **Update Backend**:
   - Updates the generated summary back to the Strapi backend using a GraphQL mutation.
4. **Response**:
   - Returns the summary in JSON format to the client.

### Key Features

- Supports Traditional Chinese and outputs summaries within 200 characters.
- Handles errors gracefully (e.g., missing content or API failures).
- Limits API runtime to 60 seconds for optimal performance.

## Getting Started

### Prerequisites

- **Node.js** and **npm** installed.
- A **Strapi CMS** backend with:
  - GraphQL plugin configured.
  - Content types for blog posts with `content` and `summary` fields.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jackykh/personal-website.git
   cd personal-website
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env.local` file in the root directory.
   - Define the following variables:
     ```plaintext
     NEXT_PUBLIC_STRAPI_URL=https://your-strapi-instance.com/graphql
     MY_SECRET_TOKEN=your-secret-token
     DEEPSEEK_APIKEY=your-Deepseek-api-key
     ```

4. Run the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the website.

### Deployment

1. Deploy to a platform that supports Next.js (e.g., Vercel).
2. Configure environment variables in the deployment platform:
   - `NEXT_PUBLIC_STRAPI_URL`
   - `MY_SECRET_TOKEN`
   - `DEEPSEEK_APIKEY`
3. Set up a webhook in Strapi to call your deployed revalidation endpoint (`/api/revalidate`) with the secret token on content changes.

## License

Copyright © 2022-present Jacky Cheung. All rights reserved.
