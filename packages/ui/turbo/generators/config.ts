import type { PlopTypes } from "@turbo/gen";

// Learn more about Turborepo Generators at https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // A generator for creating a new React component in the internal UI library
  plop.setGenerator("react-component", {
    description: "Generates a new React component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the component?",
        validate: (value) => value ? true : "Component name is required.",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "templates/component.hbs",
        abortOnFail: true,
      },
      {
        type: "append",
        path: "src/components/index.tsx",
        pattern: /(?<insertion>\/\/ component exports)/g,
        template: 'export { default as {{pascalCase name}} } from "./{{pascalCase name}}/{{pascalCase name}}";',
        abortOnFail: true,
      },
    ],
  });
}
