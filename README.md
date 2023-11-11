## kanban-next

**kanban-next** is a robust Kanban-style task management application built with Next.js 13, Prisma ORM, Atlas MongoDB, and Material-UI. The application features a custom drag-and-drop system, user authentication, and direct access to the database for efficient data operations. It supports user roles, task management, comments, column customization, task estimation, filtering, light and dark themes, and more.

### Live Demo

Please explore the live demo: [kanban-next](https://kanban-next-iota.vercel.app/)

## Features

- **Custom Drag-and-Drop:** The application includes a custom drag-and-drop system for moving and organizing task cards. No third-party drag-and-drop libraries are used, giving you full control over the user experience.

- **Server Actions and Prisma**: This application utilizes server actions, a feature provided by Next.js 13, for direct database access, powered by the Prisma ORM. This enables efficient data operations and interactions with the backend.

- **Task Management**: In addition to drag-and-drop functionality, users can view task details and edit them, providing a comprehensive task management experience. Administrators have the additional ability to reassign tasks to other users or delete them.

- **User Roles**: The system distinguishes between administrators and regular users. Administrators have elevated privileges, including the ability to reassign tasks and delete them, while regular users can edit tasks but not reassign them to others.
  
- **Comment Functionality**: Users can add comments to tasks. To edit or delete a comment, users must click on the "More" icon (three vertical dots). This functionality is available only to the author of the comment, ensuring control over contributions and fostering collaboration and communication within tasks.

- **Column Customization**: Users have the flexibility to choose which columns to display and hide. Additionally, administrators have the ability to add and delete custom columns (the relevant icon is shown on hover over the menu items). This feature enables a personalized Kanban board layout, tailored to individual preferences. The column configuration, including the available columns and their visibility status, is centrally stored on the server and remains consistent for all users.
  
- **Task Estimation and Tracking**: Users can estimate the time required to complete a task and track the remaining time until the task's completion in the task details view. Task estimation can be provided when creating a task, either by a regular user or an administrator. However, only administrators have the ability to edit this estimation. The system prevents the selection of a time period during editing that would result in a task completion date and time earlier than the current time. If the estimated time for a task has already elapsed, a warning is displayed. Administrators have the option to re-estimate the time required in case the initial estimation was incorrect or for other reasons.

- **Filtering Tasks**: Users can filter tasks by user, allowing them to focus on their specific tasks or see all tasks at once, offering a customizable view of their workflow.

- **Light and Dark Themes**: The application supports both light and dark themes, with the dark theme set as the default.
  
- **Visual Task Board Layout Saving**: Due to certain speed limitations of the free Atlas package (presumed speed limitations), a visual mode for saving the new task board layout has been added.

- **Loading State for User Tasks**: A loading state with a CSS loader is displayed when loading tasks for a selected user.
  
- **User Authentication**: Users can register and log in using various methods, including Google, Facebook, or email and password registration. Authentication is implemented using Clerk JS.

- **Atlas MongoDB Database**: The application uses Atlas MongoDB as its database solution.

- **Material-UI Integration**: The project leverages Material-UI for a sleek and modern user interface design. Material-UI provides a wide range of components to create a consistent and responsive user experience.

## Contributing

Contributions are welcome! If you'd like to improve this project, please create an issue or submit a pull request.

## License

This project is open-source and available under the MIT License.

## Acknowledgments

Special thanks to the open-source community for the various tools and libraries used in this project.

