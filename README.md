# ToDo

A Web Application for securely managing a To Do List

## Business Requirements

The To Do Manager application has the following overall requirements:

- Designed to match the mock-up
  - Header, Main Section Footer
  - Use Mantine for styling and visual components
- The header should present the main menu
  - Home Link, which shows the list of To Do Items as noted below
  - A Login section
    - When a user is not logged in:
      - Show Login form
        - Require Fields:: Username, Password
    - When a user is logged in:
      - Show a “Logout” link
        - When clicked, this should remove any cookies you have set and remove access
    - Available test users:
      - username: `user`, password: `USER`
      - username: `editor`, password: `EDITOR`
      - username: `admin`, password: `ADMIN`
- In the “Main” section
  - Nothing should be visible until a user has logged in successfully
  - The list of items in the to do list
    - Based on user preferences, show listings in groups of (3, 5, etc) and provide the ability to view multiple “pages” of results
    - Each item in list should show the text of the item as well as the assignee
      - Based on user preferences, hide or show completed items
      - If shown, completed items should be styled differently making their status visually obvious
    - For users with “Update” permissions
      - When an item is clicked, toggle the “complete” status of the item.
    - For users with “Delete” permissions
      - Items should have a delete button associated with them
- When clicked, remove the item from the list
  - For users with “Create” permissions …
    - A Form where the user can add a new item to the todo list
      - Items should have the following fields:
        - To Do Item Text
        - Assigned To
        - Status (complete/incomplete)
        - Difficulty (number between 1 and 5)