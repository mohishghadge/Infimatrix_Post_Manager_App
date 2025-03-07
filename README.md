A simple and responsive Post Manager web app built with React.js, displaying posts with pagination functionality. It fetches posts from a public API and lets you navigate through batches of posts seamlessly.

## 🛠️ Tech Stack

- React.js
- Tailwind CSS
- JSONPlaceholder API

## ✨ Features

- Fetch and display posts from the API
- Pagination with next and previous buttons
- Highlight the current page
- Smooth UI with responsive grid layout
- Error handling and loading states

## 🖥️ Setup & Installation

**Clone the repository:**
```bash
git clone https://github.com/your-username/PostManagerApp.git
```
Navigate to the project directory:
```cd PostManagerApp```

Install dependencies:
``` npm install ```

Run the app:
```npm start```


##📝 Usage

- The app fetches posts from [JSONPlaceholder API](https://jsonplaceholder.typicode.com/posts).
- You’ll see posts displayed in a grid layout.
- Use the pagination buttons (◀ and ▶) to navigate through the pages.
- Current page number is highlighted.
- Handles loading and error states.

## API Reference
```Endpoint:
 https://jsonplaceholder.typicode.com/posts
```
Query Parameters:
- _limit - Number of posts per page
- _page - Current page number

## 🚀 Future Enhancements

- Search functionality
- Sorting and filtering
- Add post feature
