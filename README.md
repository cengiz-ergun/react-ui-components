# Table Of Content

- [Summary](#summary)
- [Technology](#technology)
- [Data fetching](#data-fetching)
- [Features](#features)

## Summary

Live app: https://react-ui-components-cengiz.vercel.app/

It is a multi-select component. It is using rickyandmortyapi(https://rickandmortyapi.com/api) for demonstration purposes in the live app. 

## Technology

React(Next), Typescript, Tailwind, Zustand, Jest

## Data fetching

All data fetching happens on the server side. Client side never directly connected to the external API. 

- The initial data is fetched server-side, and Zustand state begins based on that data.
- When scroll hit the bottom of the items list, data is fetched on the server side via server actions.
- When query via input field, again data is fetched on the server side via server actions.

## Features

- :heavy_check_mark: Query against restful api via text into input field and list items
- :heavy_check_mark: Every list item contains image, name, detail
- :heavy_check_mark: Emphasize the queried word
- :heavy_check_mark: Selection and deletion of selected words
- :heavy_check_mark: Support keyword navgiation for all actions for accessibility purposes
- :heavy_check_mark: Exception handling and error state

[Top](#table-of-content)



