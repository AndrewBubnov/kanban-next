# kanban-next

**kanban-next** is a personal project created by Andrew Bubnov using Next.js 13, Prisma ORM, Material-UI, and custom drag-and-drop functionality to build a Kanban-style task management application. The authentication procedure and direct access to the database provide secure authorized access to individual user's data. Users have roles, such as administrators and regular users, allowing for different levels of control and access to the system.

## Features

- **Custom Drag-and-Drop:** The application includes a custom drag-and-drop system for moving and organizing task cards. No third-party drag-and-drop libraries are used, giving you full control over the user experience.

- **Server Actions and Prisma**: This application utilizes server actions, a feature provided by Next.js 13, for direct database access, powered by the Prisma ORM. This enables efficient data operations and interactions with the backend.

- **Task Management**: In addition to drag-and-drop functionality, users can view task details and edit them, providing a comprehensive task management experience. Administrators have the additional ability to reassign tasks to other users or delete them.

- **User Roles**: The system distinguishes between administrators and regular users. Administrators have elevated privileges, including the ability to reassign tasks and delete them, while regular users can edit tasks but not reassign them to others.

- **Filtering Tasks**: Users can filter tasks by user, allowing them to focus on their specific tasks or see all tasks at once, offering a customizable view of their workflow.

- **Material-UI Integration**: The project leverages Material-UI for a sleek and modern user interface design. Material-UI provides a wide range of components to create a consistent and responsive user experience.

- **User Authentication**: Users can register and log in using various methods, including Google, Facebook, or email and password registration.
  
- **Comment Functionality**: Users can add comments to tasks. Comments are displayed and added in the task details view, allowing for collaboration and communication within tasks. Each individual user has the ability to edit their own comments, ensuring personal control over their contributions.


## Usage

Once you have your application running, you can create tasks, drag and drop them to organize, manage your workflow, view task details, and make edits. Users can register and log in using their preferred authentication method.

## Contributing

Contributions are welcome! If you'd like to improve this project, please create an issue or submit a pull request.

## License

This project is open-source and available under the MIT License.

## Acknowledgments

Special thanks to the open-source community for the various tools and libraries used in this project.

