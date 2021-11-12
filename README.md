This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, clone Repository and cd into pokemon-app, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Implementation Notes

I decided to use NextJs to scaffold a quick app and used React Query for handling requests to the API.

Using React Query made making multiple API calls easy and it's ability to store each calls response using a unique query key makes it possible to avoid making multiple calls for the same resource(s) within a given time period.

## Possible Improvements

1. Write basic tests to cover the components, I currently do not have any test setup.
2. When a user clicks on a pokemon card on the home page and gets navigated to the pokemon details screen, I am currently making a call on the pokemon detail page to fetch details of the particular pokemon. This step seems a bit redundant since I already had all the details for each card being displayed in the grid on the home page. I had considered maybe introducing a state library to hold clicked card detail and just pass it to the details page on load.
3. Implement the search functionality, I didn't have enough time to really give this a crack but I am confident it can be implemnted in the future.
4. I found myself reapeating a lot of type definitions (name: string; url: string;), I feel creating an exportable type would be nice to avoid code duplication.
5. Styling! Removing browser defaults, using custom fonts, making the app mobile responsive. All these will be nice additions.
6. Create a constant file to store values that are needed across the app. This will give a single source of truth for those values and make changing them easy in the future.
