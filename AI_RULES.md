# AI Development Rules for ReliablyME Dashboard

This document outlines the core technologies and guidelines for developing features within the ReliablyME Dashboard application.

## Tech Stack Overview

*   **Frontend Framework**: React.js for building interactive user interfaces.
*   **Language**: TypeScript for type safety and improved code quality.
*   **UI Component Library**: Material-UI (MUI) is the primary library for pre-built UI components and styling.
*   **Styling**: Tailwind CSS is integrated for utility-first styling, complementing MUI's styling system.
*   **Icons**: Both `@mui/icons-material` (for Material Design icons) and `lucide-react` (for general icons) are available.
*   **Build Tool**: Vite for a fast development experience and optimized builds.
*   **Routing**: React Router is used for declarative navigation within the single-page application.
*   **State Management**: Standard React hooks (`useState`, `useContext`) are preferred for local and shared component state.

## Library Usage Guidelines

*   **Material-UI (MUI)**:
    *   **Primary UI Library**: Always prioritize using Material-UI components for UI elements (buttons, cards, dialogs, inputs, navigation, etc.) to maintain consistency with the existing dashboard design.
    *   **Styling**: Utilize MUI's `sx` prop for component-specific styling and responsive adjustments, leveraging the theme's palette and typography.
    *   **Customization**: If a specific MUI component needs significant visual deviation, extend its styles or wrap it in a custom component rather than modifying the core MUI component files.
*   **Tailwind CSS**:
    *   **Utility-First**: Use Tailwind classes for general layout, spacing, flexbox, grid, and other utility-based styling where MUI's `sx` prop might be less direct or for global styles defined in `index.css`.
    *   **Complementary**: Tailwind should complement, not replace, MUI's component-level styling.
*   **Icons**:
    *   **MUI Icons**: Prefer `@mui/icons-material` for standard Material Design icons.
    *   **Lucide React**: Use `lucide-react` for any icons not available in the Material-UI set or when a different aesthetic is desired, ensuring it aligns with the overall design.
*   **React Router**:
    *   **Routing Definition**: All application routes should be defined centrally within `src/App.tsx`.
    *   **Navigation**: Use `Link` components or the `useNavigate` hook for programmatic navigation.
*   **Component Structure**:
    *   **New Files**: Every new React component or hook must be created in its own dedicated file.
    *   **Location**: Components should reside in `src/components/` and pages in `src/pages/`.
    *   **Reusability**: Design components with reusability in mind, accepting props for dynamic content and behavior.
*   **Code Style**:
    *   **TypeScript**: Adhere to TypeScript best practices, ensuring proper typing for props, state, and functions.
    *   **Readability**: Write clean, well-structured, and readable code with clear variable names and comments where necessary.
    *   **Responsiveness**: All new components and pages must be designed to be fully responsive across various screen sizes.