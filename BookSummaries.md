# Summary of React Key Concepts 2nd Edition

This is a short summary of **React Key Concepts: An in-depth guide to React's core features 2 Edition, by Maximillian Schwarzmueller**

Support the author by purchasing book at:

https://www.amazon.com.mx/React-Key-Concepts-depth-features-ebook/dp/B0D6N1DQRR

## 1 React – What and Why

### What Is React?

**React is a JavaScript library**. JavaScript allows you to add interactivity to your website since, you can react to user events and manipulate the page after it was loaded. JS allows you to build highly interactive web user interfaces. A library is a collection of functionalities that you can use in your code to achieve results that would normally require more code and work from your side. Libraries can help you write more concise and possibly also less error-prone code and enable you to implement certain features more quickly. React focuses on providing functionalities that help you **create interactive and reactive user interfaces**.

### The Problem with "Vanilla JavaScript"

Vanilla JavaScript refers to "JavaScript without any frameworks or libraries". Using vanilla JavaScript generally has the advantage, that visitors of a website have to download less code. The downside of relying on vanilla JavaScript is that the developer must implement all functionalities from the ground up. This can be error-prone and highly time consuming.

React simplifies the creation and management of such user interfaces by moving from an **imperative** to a **declarative** approach. Let’s look at a short code snippet that shows how you could handle the following user interface actions with vanilla JavaScript:

1. Add an event listener to a button to listen for click events.
2. Replace the text of a paragraph with new text once a click on the button occurs.

```JS
const buttonElement = document.querySelector('button');
const paragraphElement = document.querySelector('p');
function updateTextHandler() {
 paragraphElement.textContent = 'Text was changed!';
}
buttonElement.addEventListener('click', updateTextHandler);
```

In the preceding example, code is written **imperatively**, you write instruction after instruction, and you describe every step that needs to be taken in detail. The code shown above could be translated to these more human-readable instructions:

1. Look for an HTML element of type `button` to obtain a reference to the first button on the page.
2. Create a constant named `buttonElement` that holds that button reference.
3. Repeat step 1 but get a reference to the first element that is of type of `p`.
4. Store the paragraph element reference in a constant named `paragraphElement`.
5. Define a `updateTextHandler` function, and inside use the `paragraphElement` to set its `textContent` to "Text was changed!".
5. Add an event listener to the `buttonElement` that listens for click events and triggers the `updateTextHandler` function whenever such a click event occurs.

That is how most programming languages work: you define a series of steps that must be executed in order. **When controlling and manipulating web user interfaces with JavaScript**, often the majority of your code is frequently made up of DOM instructions, event listeners, HTML element operations, and UI state management. **Your core business logic** (e.g., deriving and defining the actual text that should be set after a click) therefore often **makes up only a small chunk of the overall code**. As a result, you end up describing all the steps that are required to interact with the UI technically and all the steps that are required to derive the output data (i.e., the desired final state of the UI).

Controlling all the UI elements and their different states (e.g., whether an info box is visible or not) is a challenging task and trying to create such interfaces with just JavaScript often leads to complex code that might even contain errors. That's why the **imperative** approach, wherein you must define and write down every single step, has its limits in situations like this. This is the reason why **React provides utility functionalities that allow you to write code differently: with a declarative approach**.

### React and Declarative Code

Coming back to the first, simple, code snippet from above, here's that same code snippet, this time using React:

```JS
import { useState } from 'react';
function App() {
 const [outputText, setOutputText] = useState('Initial text');
 function updateTextHandler() {
  setOutputText('Text was changed!');
 }
 return (
  <>
   <button onClick={updateTextHandler}>
    Click to change text
   </button>
   <p>{outputText}</p>
  </>
 );
}
```
1. Add an event listener to a button to listen for click events (now with some React-specific syntax: onClick={…}).
2. Replace the text of a paragraph with new text once the click on the button occurred.

The code looks very different, like **a mixture of JavaScript and HTML**, React uses a syntax extension called **JSX (JavaScript extended to include XML-like syntax)**. This JSX code will work because of a **pre-processing (or: transpilation)** step that's part of the build workflow of every React project. Pre-processing means that certain tools, which are part of React projects, analyze and transform the code before its deployed. This allows for **development-only syntax like JSX which would not work in the browser**.

What you see in the preceding example is **the core idea of React, a "declarative approach": You write your JavaScript logic (e.g., functions that should eventually be executed), and you combine that logic with the HTML code that should trigger it or that is affected by it. You don't write the instructions for selecting certain DOM elements or changing the text content of some DOM elements. Instead, with React and JSX, you focus on your JavaScript business logic and define the desired HTML output that should eventually be reached**. This output can, and typically will, contain dynamic values that are derived inside of your main JavaScript code. 

### How React Manipulates the DOM

When writing React code, you typically write it with by using the JSX syntax extension. JSX code does not run like this in browsers. It instead needs to be pre-processed before deployment. The **JSX code must be transformed to regular JavaScript code before being served to browsers**.

**The code to which JSX will be transformed will also not contain any DOM instructions. Instead, the transformed code will execute various utility methods and functions that are built-into React (in other words, those that are provided by the React package that needs to be added to every React project). Internally, React creates a virtual DOM-like tree structure that reflects the current state of the user interface**.

That’s why **React (the library)** splits its core logic across two main packages:

1. The main `react` package
2. And the `react-dom` package

**The main `react` package** is a third-party JavaScript library that needs to be imported into a project to use React's features (like JSX or state) there. It's this package that **creates this virtual DOM and derives the current UI state**. But you also need the `react-dom` package in your project if you want to manipulate the DOM with React.

**The `react-dom` package**, specifically the `react-dom/client` part of that package, acts as a "translation bridge" between your React code, the internally generated virtual DOM, and the browser with its actual DOM that needs to be updated. It's the `react-dom` package that **will produce the actual DOM instructions that will select, update, delete, and create DOM elements**.

**This split exists because you can also use React with other target environments**. A very popular and well-known alternative to the DOM (i.e., to the browser) would be React Native, which allows developers to build native mobile apps with the help of React. With React Native, you also include the `react` package into your project, but in place of `react-dom`, you would use the `react-native` package. In this book, "React" refers to both the `react` package and the "bridge" packages (like `react-dom`).

### Introducing Single Page Applications

**React can be used to simplify the creation of complex user interfaces**, and there are two main ways of doing that:

1. Manage **parts of a website** (e.g., a chat box in the bottom left corner).
2. Manage **the entire page** and all user interaction that occurs on it.

Both approaches are viable, but the more popular and common scenario is the second one. **Most websites that have complex user interfaces, have not just one, but multiple, complex elements on their pages. Complexity would actually increase if you were to start using React for some website parts without using it for other areas of the site**. 

This doesn't even stop after using React on one specific page of the site. Indeed, **React can be used to handle URL path changes and update the parts of the page that need to be updated in order to reflect the new page that should be loaded**. This functionality is called **routing** and third-party packages like `react-router-dom`, which integrate with React, allow you to create a website wherein the entire user interface is controlled via React.

A website that does not just use React for parts of its pages but instead for all subpages and for routing is often built as a **Single Page Application (SPA)** because **it’s common to create React projects that contain only one HTML file (typically named `index.html`) which is used to initially load the React JavaScript code**. Thereafter, the React library and your React code take over and control the actual user interface. This means that **the entire user interface is created and managed by JavaScript via React**.

That being said, it’s also becoming more and more popular to build fullstack React apps, where frontend and backend code are merged. Modern React frameworks like **Next.js** simplify the process of building such web apps.

### Creating a React Project with Vite

**Vite is an open-source development and build tool** that can be used to create and run web development projects based on all kinds of libraries and frameworks—React is just one of the many options.

**Vite creates projects that come with a built-in, preconfigured build process that, in case of React projects, takes care of the JSX code transpilation. It also provides a development web server that runs locally on your system and allows you to preview the React app whilst you’re working on it**.

The exact project structure (that is, the file names and folder names) may vary over time, but generally, every new Vite-based React project contains a couple of key files and folders:

- A `src/` folder that contains the main source code files for the project:
  - A `main.jsx` file which is the main entry script file that will be executed first
  - An `App.jsx` file which contains the root component of the application
  - Various styling (`*.css`) files that are imported by the JavaScript files
  - An `assets/` folder that can be used to store images or other assets that should be used in your React code
- A `public/` folder which contains static files that will be part of the final website (e.g., a favicon)
- An `index.html` file which is the single HTML page of this website
- `package.json` and `package-lock.json` are files that list and define the third-party dependencies of your project:
  - Production dependencies like `react` or `react-dom`
  - Development dependencies like `eslint` for automated code quality checks
- Other project configuration files (e.g., .`gitignore` for managing Git file tracking)
- A `node_modules` folder that contains the actual code of the installed third-party packages

It’s worth noting that `App.jsx` and `main.jsx` use `.jsx` as a file extension, not `.js`. This is a file extension that’s enforced by Vite for files that do not just contain standard JavaScript but also JSX code. When working in a Vite project, most of your project files will consequently use `.jsx` as an extension.

Almost all of the React-specific code will be written in the App.jsx file or custom component files that will be added to the project.

The `package.json` is the file in which you actually manage packages and their versions. `package-lock.json` is created automatically (by `Node.js`). It locks in exact dependency and sub-dependency versions, whereas `package.json` only specifies version ranges.

The code of the project’s dependencies is stored in the `node_modules` folder. This folder can become very big since it contains the code of all installed packages and of their dependencies. For that reason, it's typically not included if projects are shared with other developers or pushed to GitHub. The `package.json` file is all you need. By running `npm install`, the `node_modules` folder will be recreated locally.

### Summary and Key Takeaways

- React is a library, though it's actually a combination of two main packages: `react` and `react-dom`.
- Though it is possible to build non-trivial user interfaces without React, simply using vanilla JavaScript to do so can be cumbersome, error-prone, and hard to maintain.
- React simplifies the creation of complex user interfaces by providing a declarative way to define the desired end state(s) of the UI.
- **Declarative** means that you define the target user interface content and structure, combined with different states (e.g., "is a modal open or closed?"), and you leave it up to React to figure out the appropriate DOM instructions.
- The react package itself derives UI states and manages a virtual DOM. It's "bridges" like `react-dom` or `react-native` that translate this virtual DOM into actual UI (DOM) instructions.
- With React, you can build Single Page Applications (SPAs), meaning that React is used to control the entire user interface on all pages as well as the routing between pages.
- You can also use React, in combination with frameworks like Next.js, to build fullstack web applications where server and client-side code are connected.
- React projects can be created with help of the Vite package, which provides a readily configured project folder and a live preview development server.

### Test Your Knowledge!

1. What is React?
A JS library consisting of two packages `react` and `react-dom`. React is used to create complex UI's.
2. Which advantage does React offer over vanilla JavaScript projects?
With React you dont have to code the actual DOM manipualtion instructions, you can focus and the business logic, making complex web apps easier to code and maintain.
3. What's the difference between imperative and declarative code?
In the imperative approach you have to give all of the instructions to be run step by step, this could include, DOM manipualtion, event handling, amongst other things. In the Declarative way you define the target user interface content and structure, combined with different states (e.g., "is a modal open or closed?"), and you leave it up to React to figure out the appropriate DOM instructions.
4. What is a Single-Page-Application (SPA)?
Is a wep app that is entirely manage by React, that has a single html page as the point of entry, and that utilizes routing to mimic moving between pages.
5. How can you create new React projects and why do you need such a complex project setup?
You need set up like the late great create-react-app, or nowdays frameworks like Next.js or tools like Vite. This setups are required because JSX code must be transformed to regular JavaScript code before being served to browsers, so a pre-processed or transpliling step is required, and this setups come bundled with tools that help with this.

author's anwsers - https://github.com/mschwarzmueller/book-react-key-concepts-e2/blob/01-what-is-react/exercises/questions-answers.md

## 2 Understanding React Components and JSX

### What Are Components?

### Why Components?

### The Anatomy of a Component

### What Exactly Are Component Functions?

### What Does React Do with All These Components?

### Built-in Components

### Naming Conventions

### JSX vs HTML vs Vanilla JavaScript

### Using React without JSX

### JSX Elements Are Treated like Regular JavaScript Values

### JSX Elements Must Have A Closing Tag
