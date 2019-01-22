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
      * **styles** - Shared styles, variables and mixins folder.

### 3.2 Modules

For a faster code location, lower coupling, better performance and scalability is application divided into multiple modules placed in `src/app` folder.

e.g.

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

e.g

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

e.g.

* Authentication service should be initiated only once and may be used across different modules. 
* Header/Footer component should be here.

#### 3.2.2 Shared Module

The Shared Module should contain features that are going to be used in multiple modules (`components/pipes/directives`) and therefore be initiated multiple times.

e.g.

* LoadingOverlay component should be here.
* IBAN formatting pipe should be here.

#### 3.2.3 Feature Modules

Feature Modules contains multiple application parts and features that were logically encapsulated. Those modules should have its own routing module and therefore doesn't need to be loaded until needed. 
To create a new module with routing navigate to `app/modules` folder and run Angular CLI command `ng generate module module_name --routing`.
Any feature module should use `Shared Module`.

## 4. Principles

### 4.1 Routing

Main application routing module `AppRoutingModule` contains top-level navigation that registers routes for all feature modules.

    const routes: Routes = [
      ...,
      {
        path: AppRoutes.LOGIN,
        component: LoginPageComponent
      },     
      ...
    ];

    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
    })
    export class AppRoutingModule {}
    
From example above you can see that if we visit `AppRoutes.LOGIN` than `LoginPageComponent` should be initiated.

If we want to protect any routes from accessing we use [guards](https://angular.io/guide/router#canactivate-requiring-authentication). The easiest way to create protected section of application is by creating a base route with `canActivate` property guard and place all protected routes as its `children` routes.

    {
      path: AppRoutes.AUTH,
      component: AuthorizedLayoutComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: AppRoutes.HOME,
          loadChildren: () => HomeModule
        },
        {
          path: AppRoutes.USERS,
          loadChildren: () => UsersModule
        }
      ]
    }
    
Notice that for `AppRoutes.HOME` and `AppRoutes.USERS` we do not provide component class name, but lamba factory that references modules. This practice allows you to apply lazy-loading on modules, what basically means that `HomeModule` won't be downloaded by the client until it will access `AppRoutes.HOME` route. Moreover, routing for `HomeModule` is not specified here, but relies on the fact that module implements its own routing.

### 4.3 Dependency Injection (DI) & Dependency Inversion Principle (DIP)

#### 4.3.1 Dependency Injection (DI)

> Dependency injection (DI), is an important application design pattern. Angular has its own DI framework, which is typically used in the design of Angular applications to increase their efficiency and modularity. Dependencies are services or objects that a class needs to perform its function. DI is a coding pattern in which a class asks for dependencies from external sources rather than creating them itself.

Imagine a repository service to retrieve users from REST API. To make our application more testable, its a good practice to provide its dependencies in a `constructor`. This way you will be able to recognize all services needed by the component and easily replace/mock them. To make a class injectable, we need it to register it with DI framework built-in Angular.

1. First of all, you need to mark dependency with a `@Injectable` decorator.

        @Injectable()
        export class UsersRepositoryService {
          constructor(private http: HttpClient) {}

          getUsers(): Observable<Object> {
            return this.http.get('https://reqres.in/api/users');
          }
        }
    
2. And register dependency as a provider in its module.

        @NgModule({
          providers: [services.UsersRepositoryService]
        })
        export class UsersModule {}
        
#### 4.3.2 Dependency Inversion Principle (DIP)

> Dependency Inversion Principle is one of the commonly used [SOLID principles of object-oriented programming](https://en.wikipedia.org/wiki/SOLID) and says that classes should depend on abstractions, not concretions.

Dependency Inversion Principle helps you to decouple your application by defining abstractions of dependencies that are used instead of concrete implementations. This way you can make your software less coupled and easier to maintain, because you can easily tell to DI framework which implementation of abstraction should be injected. Also, its safer to re-implement some service, when it implements an interface.

In Angular, you won't be able to register services with interfaces, but you can create an abstract class.

1. Create an abstraction of your dependency.

        export abstract class StorageService implements Storage {
          abstract getItem(key: string): string;
          abstract setItem(key: string, value: string): void;
        }
2. Create an implementation of the abstraction and mark it with `@Injectable` decorator.

        import { StorageService } from './storage.service';

        @Injectable()
        export class LocalStorageService implements StorageService {
          private storage: Storage;

          constructor() {
            this.storage = localStorage;
          }

          getItem(key: string): string {
            return this.storage.getItem(key);
          }

          setItem(key: string, value: string): void {
            this.storage.setItem(key, value);
            this.updateLength();
          }
        }
3. Register provider, that will provide concreation when constructor asks for abstraction.

        @NgModule({
          providers: [
            // Services
            {
              provide: services.StorageService,
              useClass: services.LocalStorageService
            }
          ]
        })

## 5. Styling

To make styling easier and less boilerplate, use SCSS also known as SASS. If you are not familiar with SASS, please read [introduction](https://sass-guidelin.es/#introduction) first.

### 5.1 Global Styles

Global `styles/variables/mixins/functions` that affects whole application or will be used in application modules should be placed in `src/assets/styles` folder. Its architecture is based on [official SASS guidelines](https://sass-guidelin.es/#architecture) and is divided to following folders:

* **styles**
  * **abstracts** - Contains variables, mixins or functions that might be used across the application styles. Those files cannot contain any direct CSS code.
    * _variables.scss - Contains variables for colors, sizes, etc.
    * _mixins.scss - Contains mixins that generates CSS output based on input parameters.
    * _functions.scss - Contains functions that modifies values based on input parameters.
  * **base** - Contains what is usually called boilerplate code for the project. You might find here reset file, typography settings and other basic styles used anywhere in the application.
    * _reset.scss
    * _typography.scss
  * **vendors** - Contains all external styles like Bootstrap, Normalize, etc.
  * **_global.scss** - References all available `variables, mixins` and `functions` that can be used in any SCSS file. It is important that this file won't contain any direct CSS styles, otherwise it would copied multiple times.
  * **main.scss** - Contains references to all SCSS that should be part of the output CSS.
  
but could also contain:

  * **components**
  * **layouts**
  * **pages**
  * **themes**

folders, when styles may be used across the application.

---

**To use all defined `variables, mixins` and `functions` in any SCSS file, import the `_global.scss` as following:**

    @import 'global';

### 5.2 Scoped Styles

If you generate new component with Angular CLI command `ng generate component component-name` it will create `component-name.component.scss` file that affects only component's template. Any component related styles should be defined here, unless they are shared across the multiple components.

---

All defined `variables, mixins` and `functions` has to be imported as following:

    @import 'global';

## 6. Naming Conventions & Code Organization

Here you can find some additional conventions that should be considered.

### 6.1 Naming Conventions

1. `Class/Interface/Enum` should be `UpperCase` named and end with a type name. e.g. `LocalStorageService`.
1. `Class/Interface/Enum` file name should be `lower-case-with-dash` named and end with with a type name separated by dot. e.g. `local-storage.service.ts`
1. `Constants` should be `camelCased` named. e.g. `myConstant`
1. Do not use `var` unless you need global variable. Use `const` for single-assignable properties and `let` for scoped multi-assignable propeties.

### 6.2 Code Organization

1. Use thrid-party `imports` first and separate them with empty line.

        import { NgModule } from '@angular/core';

        import { SharedModule } from '@app/shared';
        import { HomeRoutingModule } from './home-routing.module';
    
1. All `properties/functions/attributes` are considered `public` if you won't provide any access modifier. 
Therefore, always define `public` `properties/functions/attributes` before `private`. 
1. Always mark input/output properties of components with `@Input/@Output`.

## 7. Testing

### 7.1 Unit/Integration Tests

If you generate new files with Angular CLI, they comes also with a test file with `.spec.ts` extension. Unit/Integration test follows [official documentation](https://angular.io/guide/testing#use-a-page-object).

### 7.2 End-to-End Tests

to be add..
 
## 8. Anylyzing

### 8.1 Linting

Application requires to write a code in specified formats by `tslint.json` and `.stylelintrc` files. Currently, linting is done before every build, therefore you won't be able to run the application when a single mistake in code formatting is done. For a productivity increase consider usage Visual Studio Code and extensions.

### 8.2 Optimization

Sometimes, you might accidentally import unnecessary files and encounter large size of application bundles. To examine what might be an issue, you can use `source-map-explorer` which visualizes bundle's dependencies and its sizes.

1. First of all make sure you've installed `source-map-explorer`.

        npm install -g source-map-explorer

2. Create a production build.

        npm run build:prod

3. Run `source-map-explorer` for with path of the bundle file.

        source-map-explorer dist/angular7-template/vendor.xxx.js
