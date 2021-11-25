# remix-pokemon-db

A small project listing pokemons with their specific details using the full stack web framework Remix.

## Learnings

### Why Remix

- Every day a new JavaScript framework is born. But not all should be taken seriously as they lack community support and expertise. Remix is created by the team behind React Router and tries to innovate into the direction of Server Side Rendering (SSR) and is a direct competitor to Next.js and Gatsby all building on top of React.js
- In general the trend of modern JavaScript frameworks right now is going back to the PHP way of handling more frontend related stuff on the server. Remix offers only Server Side Rendering (SSR) and not Static Site Generation (SSG) or Incremental Site Rendering (ISR) thus is pivots away from the JAM Stack that got popular during the last years
- JAM Stack apps are really fast in their rendering and are easy to deploy since there are only static files. They have their problems handling dynamic data as the page needs to be rebuild on change
- Server Side Rendering (SSR) apps require a backend server to deliver the application. It is quite fast and handles dynamic data very well. The deployment on the other hand is more complex
- So Remix should be great for bigger applications that have many pages and handle dynamic data that origins in a form of database

### Features

#### Routing

- Works like in Next.Js file-based. Each folder within `app/routes` creates a route. The index.tsx file within it is the main route like `app/routes/pokemon` would be `example.com/pokemon`
- Remix offers a new thing called Nested Routes. When a route is nested under a parent the child automatically inherit the UI of the parent. In page a Router `<Oulet />` is defined. This Outlet will be replaced wth a child component based on the url you navigate to. When there is the `pokemon(index.tsx` directory and there is another file called `app/routes/pokemon/details.tsx` within it. If a user goes to `example.com/pokemon` the index.tsx will be rendered but if a user goes to `example.com/pokemon/details` the details.tsx file will be rendered to the same Outlet. This feature allows developer to defined child nested routes and only require them to think about one small part of the UI and not the whole subpage. Error messages no longer have to affect the whole ui page but can be on a component level. So B2B plattforms or dashboards can benefit from this a lot.
- To opt out of Nested Routing for individual pages the file can be placed outside of a page directory and called with periods like this `pokemon.details.stats.tsx`.
- Dynamic Routes are files with a $ sign before it like `$id.tsx`

#### Server Side Data Fetching

- Any Remix page can return a regular React Component but can also contain a loaderFunction that will only be executed on the server side and can bring in data into the Remix App securely. This is similar to `getServerSideProps` in Next.Js
- While in Next.Js the data is provided as Props to the React component here in Remix the `useLoaderData()` hook can be used to load the server side fetched data. Remix polyfills the server side to allow the fetch() Browser API command within the server side code.
- For writing data to the backend Remix also innovates. Instead of using the `onSubmit` event and using `event.preventDefault()` on the handling function, in Remix you can use the `Form` component that handles posting like a regular old html form like this

```html
<form method="post">
  <input name="foo" type="text" />
  <input name="bar" type="text" />
</form>
```

So there is no more need to preventDefault here. But an action function on the server side is needed. This function has access to the values within the form by their name like this

```html
export let action: ActionFunction = async ({ request }) => { let formData =
await request.formData(); let foo = formData.get("foo"); let bar =
formData.get("bar); // Update your database here return redirect("/your-path");
}
```

This action response can then be accessed within the frontend UI with the `useActionData<string>()` hook. The `useTransition()` hook allows access to the state of the action and reducing asynchronicity problems.

- This approach can the data flow within the application more easy for the developer
- Using the Remix `useFetcher` hook fetched data can be turned into a form. Then this form can be mapped to an action like a backend api of `pokemon-search.tsx` in this case.

### Setup

- Installation with `npx create-remix@latest`. Here the remix app server was used.
- Installing TailwindCSS with `npm install tailwindcss @tailwindcss/aspect-ratio @tailwindcss/forms @heroicons/react concurrently`
- After that TailwindCSS needs to be configured through the `/config/tailwind.js` file.
- Replace the `build` and `dev` command within the `package.json` with:

```json
"build": "tailwindcss --output ./app/styles/tailwind.css --config ./config/tailwind.js --minify && remix build",
"dev": "concurrently \"npm:dev:tailwind\" \"npm:dev:web\"",
"dev:tailwind": "tailwindcss --output ./app/styles/tailwind.css --config ./config/tailwind.js --watch",
"dev:web": "remix dev",
```

- Next on head into `/app/routes/root.tsx` and add `import tailwindUrl from "~/styles/tailwind.css";` and remove the remixStyle imports to use TailwindCSS. Then edit the `LinksFunction` like this:

```javascript
export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindUrl }];
};
```
