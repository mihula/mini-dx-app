# Rene's Angular Demo App

This is a simple Angular application for presenting and testing UI components in a modular, demo-oriented way. The app provides a central toolbar with demo tiles, each representing a different feature or component. Each demo is accessible via its own route and is visually represented by an icon and a name.

## Application Structure

- **src/app/app.ts**: Main application component, contains the collection of available demos and generates the toolbar.
- **src/app/app.html**: Main template, displays the demo toolbar and the currently selected demo page.
- **src/app/app.css**: Styles for the main layout and demo toolbar.
- **src/app/pro-text-box-demo/**: Folder with the ProTextBox demo (custom textbox component demo).
- **src/app/empty-demo/**: Folder with the Empty Demo (template for new demos, shows "It Works!").

## Available Demos

- **ProTextBox Demo** (📝): Demonstrates a custom textbox component with data binding.
- **Empty Demo** (✨): Minimal template for creating new demos, displays a simple "It Works!" message.

## How to Add a New Demo

1. **Clone an Existing Demo**
   - Copy the `empty-demo` folder and rename it (e.g., `my-new-demo`).
   - Rename the component files and class names accordingly.

2. **Register the Demo Route**
   - In `src/app/app.routes.ts`, add a new route for your demo:
     ```typescript
     {
       path: 'my-new-demo',
       loadComponent: () => import('./my-new-demo/my-new-demo.component').then(m => m.MyNewDemoComponent)
     }
     ```

3. **Add the Demo to the Toolbar**
   - In `src/app/app.ts`, add your demo to the `demoTiles` array:
     ```typescript
     { routerLink: '/my-new-demo', emoticon: '🆕', name: 'My New Demo' },
     ```

4. **Customize the Demo**
   - Edit your new demo component's HTML, CSS, and TypeScript files to implement the desired functionality.

## Summary

This app is designed for quick prototyping and demonstration of Angular UI components. Each demo is isolated, easily accessible, and can be extended or replaced as needed. The toolbar makes navigation between demos fast and intuitive.

## How to Run the App Conveniently in Visual Studio

1. **Open the Integrated Terminal in Visual Studio**
   - Go to the top menu and select **View → Terminal** (or use the shortcut, e.g. `Ctrl+ö` or `Ctrl+`` depending on your keyboard layout).

2. **Start the Development Server**
   - In the terminal, enter:
     ```
     npm start
     ```
   - This will start the Angular dev server at [http://localhost:4200](http://localhost:4200).

3. **Launch Debugging in the Browser**
   - In the Debug/Launch menu, select the **ng serve** configuration and start it.
   - This will open the app in your browser and enable debugging tools.

This way, you can conveniently develop and debug the application directly in Visual Studio.
