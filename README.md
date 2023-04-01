## Naming Rule

- Folder : camelCase
- File : camelCase
- Constants Variable : UPPER_SNAKE_CASE

## typedoc

> typedoc --entryPointStrategy expand ./src

## Structure

```
📦src
 ┣ 📂@types
 ┣ 📂common
 ┃ ┗ 📜api.tsx
 ┣ 📂components
 ┃ ┣ 📂blogList
 ┃ ┣ 📂blogListItem
 ┃ ┗ 📂pagination
 ┣ 📂constants
 ┣ 📂hooks
 ┃ ┣ 📜useGetId.ts
 ┃ ┗ 📜useInput.ts
 ┣ 📂interfaces
 ┃ ┗ 📜index.ts
 ┣ 📂layout
 ┃ ┣ 📜footer.tsx
 ┃ ┗ 📜header.tsx
 ┣ 📂mokData
 ┃ ┗ 📜dataList.ts
 ┣ 📂pages
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂detail
 ┃ ┃ ┃ ┗ 📂[postId]
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┗ 📂page
 ┃ ┃ ┃ ┗ 📂[page]
 ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂detail
 ┃ ┃ ┗ 📂[postId]
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂login
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂page
 ┃ ┃ ┗ 📂[currentPage]
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂signup
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📜_app.tsx
 ┃ ┣ 📜_document.tsx
 ┃ ┗ 📜index.tsx
 ┗ 📂styles
 ┃ ┗ 📜globalStyle.ts
```
