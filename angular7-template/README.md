# Angular7Template

This template was inspired by Angular best-practices mentioned in the [Pluralsight course by Jim Cooper](https://app.pluralsight.com/player?course=best-practices-angular&author=jim-cooper&name=099afa72-35ee-4f15-9f26-257b10c11665&clip=2&mode=live) and author's experience with front-end development.

The main goal of this template is to create a stable infrastructure and solid foundation for a long-term Angular projects. 
It proposes and showcases implementation of the following commonly used principles in front-end programming:

* Single Resposibility
* Dependency Injection
* Dependency Inversion
* Software Modularity & Lazy Loading
* Code Debugging
* Type Checking & Code Formatting shared across the development team

## 1. Angular CLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.4.

### 1.1 Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### 1.2 Code scaffolding

Run `ng generate component component-name` to generate a new component. 
You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### 1.3 Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `npm run build:prod` for a production build.

### 1.4 Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### 1.5 Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### 1.6 Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## 2. Visual Studio Code

This template was created using [Visual Studio Code](https://code.visualstudio.com/) that provides tools for:

* Refactoring (rename, search, replace, ..)
* Type-checking
* Syntax higlighting and autocomplete (IntelliSense)
* Integratated console

### 2.1 Extensions

Moreover it is recommended to use Visual Studio Code with following extensions to reach the best productivity.

1. [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) enables to set break point and watch variables while running an application.
1. [NPM](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script) validates dependencies defined in package.json.
1. [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint) displays errors in TypeScript file formatting as you write a code.
1. [StyleLint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint) displays errors in CSS/SCSS/Less file formatting as you write a code.
1. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) automatically fixes TSLint/StyleLint errors and formats code on document save. Formatting is based on project settings and has to be allowed in Visual Studio Code settings.

## 3. Architecture

### 3.1 Folders Structure

For a basic overview of folder structure see following list:

* **angular7-template** - Project folder.
  * **e2e** - End-to-End tests folder.
    * **src** - E2E test modules folder.
  * **src** - Application source folder.
    * **app** - Application modules folder.
    * **assets** - Application assets folder.
      * **scripts** - Shared script files and libraries folder.
      * **images** - Shared images files and folder.
      * **styles** - Shared styles, variables and mixins folder. Architecture of global styles is based on [official SASS guidelines](https://sass-guidelin.es/#architecture).

### 3.2 Modules

For a faster code location, lower coupling, better performance and scalability is application divided into multiple modules placed in `src/app` folder.

e.g.:
* **core** - Contains single instance features shared across the application.
* **shared** - Contains features shared across different modules.
* **modules** - Contains logically grouped features that represents some part of the application.
  * **users** - Application part for the user management.
  * **orders** - Application part for the orders management.
  * ...
  
Also, each module should implement reasonable folder structure created according to responsibility of files.

e.g:
* **module**
  * **components** - Contains control components reused across the module. This controls doesn't rely on services but should be controlled by `@Input` and `@Output` properties.
  * **layouts** - Contains layout components that wraps multiple navigation pages with the same HTML structure.
  * **pages** - Contains page components that can be accessed by url. Pages may be displayed in the layouts and may use components.
  * **services** - Contains services and providers.
  * **models** - Contains models used across the components, services and other parts of the module.
  * **guards** - Contains module specific guards.
  * **pipes** - Contains module specific pipes.
  * **assets** - Contains module specific assets like scripts, images or global styles.
  
Each module should define `index.ts` file that re-exports all exports of the its folder.

e.g:

*module/services/index.ts*


  
    export * from './storage.service';  
    export * from './local-storage.service';
   


and than we can manage export all needed services with a single `@import`:

*module/module.module.ts*


    
    import * as services from './services';

    @NgModule({
      providers: [
          // Services
          services.StorageService,
          ...
      ]
    });
    


#### 3.2.1 Core Module

The Core Module takes on the role of the root AppModule , but is not the module which gets bootstrapped by Angular at run-time. It should contain singleton services, universal components and other features which has only one instance per application.

e.g.:
* Authentication service should be initiated only once and may be used across different modules. 
* 

#### 3.2.2 Shared Module

#### 3.2.3 Feature Modules

#### 3.2.4 Lazy Loading

## 4. Principles

### Dependency Injection & Dependency Inversion

### Localization

### SCSS Structure

## 5. Naming Conventions & Code Organization

Here you can find some additional conventions that should be considered.

### 5.1 Naming Conventions

1. `Class/Interface/Enum` should be `UpperCase` named and end with a type name. e.g. `LocalStorageService`.
1. `Class/Interface/Enum` file name should be `lower-case-with-dash` named and end with with a type name separated by dot. e.g. `local-storage.service.ts`
1. `Constants` should be `camelCased` named. e.g. `myConstant`
1. Do not use `var` unless you need global variable. Use `const` for single-assignable properties and `let` for scoped multi-assignable propeties.

### 5.2 Code Organization

1. Use thrid-party `imports` first and separate them with empty line.

        import { NgModule } from '@angular/core';

        import { SharedModule } from '@app/shared';
        import { HomeRoutingModule } from './home-routing.module';
    
1. All `properties/functions/attributes` are considered `public` if you won't provide any access modifier. 
Therefore, always define `public` `properties/functions/attributes` before `private`. 
1. Always mark input/output properties of components with `@Input/@Output`.

 





