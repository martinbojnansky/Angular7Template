# Angular7Template

This application was inspired by Angular best-practices mentioned in the 
[Pluralsight course by Jim Cooper](https://app.pluralsight.com/player?course=best-practices-angular&author=jim-cooper&name=099afa72-35ee-4f15-9f26-257b10c11665&clip=2&mode=live) and author's experience in front-end development.

The main goal of this application is to create a stable infrastructure and solid foundation for a long-term Angular projects.
It proposes and showcases implementation of the following commonly used principles in front-end programming:

- Single Resposibility
- Dependency Injection
- Dependency Inversion
- Software Modularity & Lazy Loading
- Code Debugging
- Automated Testing
- Type Checking & Code Formatting shared across the development team

## 1. Angular CLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.4.

### 1.1 Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change 
any of the source files.

### 1.2 Code scaffolding

Run `ng generate component component-name` to generate a new component.
You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### 1.3 Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the 
`npm run build:prod` for a production build.

### 1.4 Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### 1.5 Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### 1.6 Further help

To get more help on the Angular CLI use `ng help` or go check out the 
[Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## 2. IDE

### 2.1 Visual Studio Code

This application was created using [Visual Studio Code](https://code.visualstudio.com/) that provides tools for:

- Syntax higlighting, type check and auto completion (IntelliSense)
- Easy Refactoring (Rename - F2, Search - Ctrl + F, Replace - Ctrl + H, ..)
- Integratated console

#### 2.1.1 Extensions

Moreover it is recommended to use Visual Studio Code with following extensions to reach the best productivity.

1. [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) enables to 
set a break point in a code and watch variables while running an application in the browser.
1. [NPM](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script) validates dependencies defined in 
package.json.
1. [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template) provides 
IntelliSense for application files.
1. [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint) displays errors in TypeScript file formatting 
as you write a code.
1. [StyleLint](https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint) displays errors in CSS/SCSS/Less file 
formatting as you write a code.
1. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) automatically fixes 
TSLint / StyleLint errors and formats code on document save. _Formatting is based on project settings and has to be 
allowed in Visual Studio Code settings.

### 2.2 WebStorm

[WebStorm](https://www.jetbrains.com/webstorm/) IDE comes with pre-installed support for Angular projects and provides good integration, refactoring, type checking
and auto completion.

#### 2.2.1 Extensions

Make sure, you have installed following extensions:

1. AngularJS
1. CSS Support
1. Javascript Debugger
1. Karma
1. Node.js
1. Sass support

To take advantage of automatic formatting errors fix add the additional extension [Prettier](https://plugins.jetbrains.com/plugin/10456-prettier) 
in `Settings -> Plugins -> Marketplace`. 

You can run code formatting by pressing `Ctrl+Shift+Alt+P` or take advantage of file watchers that will run 
formatting automatically on external changes (save). 

## 3. Architecture

### 3.1 Folders Structure

For a basic overview of folder structure see following list:

- **angular7-template** - Project folder.
  - **e2e** - End-to-End tests folder.
    - **src** - E2E test modules folder.
  - **src** - Application source folder.
    - **app** - Application modules folder.
    - **assets** - Application assets folder.
      - **scripts** - Shared script files and libraries folder.
      - **images** - Shared images files and folder.
      - **styles** - Shared styles, variables and mixins folder.

### 3.2 Modules

For a faster code location, lower coupling, better performance and scalability is application divided into multiple modules
 placed in `src/app` folder.

e.g.

- **core** - Contains single instance features shared across the whole application.
- **shared** - Contains multi-instance features shared across different modules.
- **modules** - Contains logically grouped features that represents some part of the application.
  - **users** - Application part for the user management.
  - **orders** - Application part for the orders management.
  - ...

Also, each module should implement reasonable folder structure created according to responsibility of files.

e.g:

- **module**

  - **components** - Contains control components reused across the module. This controls doesn't rely on services but 
  should be controlled by `@Input` and `@Output` properties
  - **views** - Contains components that can have state and use services. Those components can also be accessed by url,
   but it is not mandatory. Views uses components and maps its own state to inputs and outputs of controls.
  - **repositories** - Contains services used for communication with endpoints. This should be in 1:1 relationship with 
  backend controllers. Repositories does not have any state, they are used explicitly to CRUD operations.
  - **services** - Contains stateful / stateless services used to share application logic and data between components or
   modules. Services exposes actions and immutable state that can be changed only by itself. Services may inject 
   repositories and other services, as long as they don't result in circular dependency.
  - **models** - Contains models used across the components, services and other parts of the module.
  - **guards** - Contains module specific guards.
  - **pipes** - Contains module specific pipes.
  - **assets** - Contains module specific assets like scripts, images or global styles.
  - **test-doubles** - Contains dummies, fakes, spies and stubs needed for testing purposes.

Each module should define `index.ts` file (_also known as barrel files_) that re-exports all exports of its parent folder.

e.g

_module/services/index.ts_

    export * from './storage.service';
    export * from './local-storage.service';

and than we can manage export all needed services with a single `import`:

_module/module.module.ts_

    import * as services from './services';

    @NgModule({
      providers: [
          // Services
          services.StorageService,
          ...
      ]
    });

#### 3.2.1 Core Module

The Core Module takes on the role of the root AppModule , but is not the module which gets bootstrapped by Angular 
at run-time. It should contain singleton services, universal components and other features which has only one instance
 per application.

e.g.

- Authentication service should be initiated only once and may be used across different modules.
- Authentication guard should be here.
- AuthorizedView component should be here.

#### 3.2.2 Shared Module

The Shared Module should contain features that are going to be used in multiple modules (`components/pipes/directives`)
 and therefore be initiated multiple times.

e.g.

- LoadingOverlay component should be here.
- IBAN formatting pipe should be here.

#### 3.2.3 Feature Modules

Feature Modules contains multiple application parts and features that were logically encapsulated. Those modules should 
have its own routing module and therefore does not need to be loaded until needed.
To create a new module with routing navigate to `app/modules` folder and run Angular CLI command 
`ng generate module module_name --routing`.
Any feature module should use `Shared Module`.

## 4. Principles

### 4.1 Routing

Main application routing module `AppRoutingModule` contains top-level navigation that registers routes for all feature
 modules.

    const routes: Routes = [
      ...,
      {
        path: AppRoutes.LOGIN,
        component: LoginViewComponent
      },
      ...
    ];

    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
    })
    export class AppRoutingModule {}

From example above you can see that if we visit `AppRoutes.LOGIN` than `LoginViewComponent` should be initiated.

If we want to protect any routes from accessing we use [guards](https://angular.io/guide/router#canactivate-requiring-authentication). 
The easiest way to create protected section of application is by creating a base route with `canActivate` property guard 
and place all protected routes as its `children` routes.

    {
      path: AppRoutes.AUTH,
      component: AuthorizedViewComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: AppRoutes.HOME,
          loadChildren: './modules/home/home.module#HomeModule'
        },
        {
          path: AppRoutes.USERS,
          loadChildren: './modules/users/users.module#UsersModule'
        }
      ]
    }

Notice that for `AppRoutes.HOME` and `AppRoutes.USERS` we do not provide component class name, but ~~lamba factory~~ 
special path to a feature module that will be recognized and compiled as standalone dependency. This practice allows 
you to apply lazy-loading on modules, what basically means that `HomeModule` won't be downloaded by the client until it
 will access `AppRoutes.HOME` route. Moreover, routing for `HomeModule` is not specified here, but relies on the fact that 
 module implements its own routing.

> Lambda factories that reference module `() => HomeModule` can't be used anymore, because they were not included in 
production build.

### 4.3 Dependency Injection (DI) & Dependency Inversion Principle (DIP)

#### 4.3.1 Dependency Injection (DI)

> Dependency injection (DI), is an important application design pattern. Angular has its own DI framework, which is 
typically used in the design of Angular applications to increase their efficiency and modularity. Dependencies are services
 or objects that a class needs to perform its function. DI is a coding pattern in which a class asks for dependencies from
  external sources rather than creating them itself.

Imagine a repository service to retrieve users from REST API. To make our application more testable, its a good practice 
to provide its dependencies in a `constructor`. This way you will be able to recognize all services needed by the 
component and easily replace/mock them. To make a class injectable, we need it to register it with DI framework built-in  
Angular.

1.  First of all, you need to mark dependency with a `@Injectable` decorator.

        @Injectable()
        export class UsersRepositoryService {
          constructor(private http: HttpClient) {}

          getUsers(): Observable<Object> {
            return this.http.get('https://reqres.in/api/users');
          }
        }

2.  And register dependency as a provider in its module.

        @NgModule({
          providers: [services.UsersRepositoryService]
        })
        export class UsersModule {}
        
> In lazy-loaded modules use `@Injectable()` without `providedIn: root` setting, if is used by this module only. 
Otherwise, it has to specify `providedIn: root` to have single instance.

#### 4.3.2 Dependency Inversion Principle (DIP)

> Dependency Inversion Principle is one of the commonly used 
[SOLID principles of object-oriented programming](https://en.wikipedia.org/wiki/SOLID) and says that classes should depend
 on abstractions, not concretions.

Dependency Inversion Principle helps you to decouple your application by defining abstractions of dependencies that are
 used instead of concrete implementations. This way you can make your software less coupled and easier to maintain, because
  you can easily tell to DI framework which implementation of abstraction should be injected. Also, its safer to 
  re-implement some service, when it implements an interface.

In Angular, you won't be able to register services with interfaces, but you can create an abstract class.

1.  Create an abstraction of your dependency.

        export abstract class StorageService implements Storage {
          abstract getItem(key: string): string;
          abstract setItem(key: string, value: string): void;
        }

2.  Create an implementation of the abstraction and mark it with `@Injectable` decorator.

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

3.  Register a provider, that will provide concretion when constructor asks for the abstraction.

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

To make styling easier and less boilerplate, use SCSS also known as SASS. If you are not familiar with SASS, 
please read [introduction](https://sass-guidelin.es/#introduction) first.

### 5.1 Global Styles

Global `styles/variables/mixins/functions` that affects whole application or will be used in application modules 
should be placed in `src/assets/styles` folder. Its architecture is based on [official SASS guidelines](https://sass-guidelin.es/#architecture) and is divided to following folders:

- **styles**

  - **abstracts** - Contains variables, mixins or functions that might be used across the application styles. Those files 
  cannot contain any direct CSS code.
    - \_variables.scss - Contains variables for colors, sizes, etc.
    - \_mixins.scss - Contains mixins that generates CSS output based on input parameters.
    - \_functions.scss - Contains functions that modifies values based on input parameters.
  - **base** - Contains what is usually called boilerplate code for the project. You might find here reset file, typography
   settings and other basic styles used anywhere in the application.
    - \_reset.scss
    - \_typography.scss
  - **vendors** - Contains all external styles like Bootstrap, Normalize, etc.
  - **\_global.scss** - References all available `variables, mixins` and `functions` that can be used in any SCSS file. 
  It is important that this file won't contain any direct CSS styles, otherwise it would copied multiple times.
  - **main.scss** - Contains references to all SCSS that should be part of the output CSS.

but could also contain:

- **components**
- **layouts**
- **pages**
- **themes**

folders, when styles may be used across the application.

---

**To use all defined `variables, mixins` and `functions` in any SCSS file, import the `_global.scss` as following:**

    @import 'global';

### 5.2 Scoped Styles

If you generate new component with Angular CLI command `ng generate component component-name` it will create 
`component-name.component.scss` file that affects only component's template. Any component related styles should be 
defined here, unless they are shared across the multiple components.

---

All defined `variables, mixins` and `functions` has to be imported as following:

    @import 'global';

## 6. Naming Conventions & Code Organization

Here you can find some additional conventions that should be considered.

### 6.1 Naming Conventions

1. `Class/Interface/Enum` should be `UpperCase` named and end with a type name. e.g. `LocalStorageService`.
1. `Class/Interface/Enum` file name should be `lower-case-with-dash` named and end with with a type name separated by dot. 
e.g. `local-storage.service.ts`
1. `Constants` should be `camelCased` named. e.g. `myConstant`
1. Do not use `var` unless you need global variable. Use `const` for single-assignable properties and `let` for scoped 
multi-assignable propeties.
1. Observables are suffixed with `$`. e.g. `state$`

### 6.2 Code Organization

1.  Use thrid-party `imports` first and separate them with empty line.

        import { NgModule } from '@angular/core';

        import { SharedModule } from '@app/shared';
        import { HomeRoutingModule } from './home-routing.module';

1.  All `properties/functions/attributes` are considered `public` if you won't provide any access modifier.
    Therefore, always define `public` `properties/functions/attributes` before `private`.
1.  Always mark input/output properties of components with `@Input/@Output`.

## 7. Testing

### 7.1 Unit / Integration Tests

If you generate new files with Angular CLI, they comes also with a test file appended by `.spec.ts` extension. 
Unit / Integration testing follows [official documentation](https://angular.io/guide/testing#use-a-page-object).

#### 7.1.1 Test doubles

In order to be able to test all of the components and services it may be needed to replace some dependencies or make sure 
that they're doing something.

For this purposes, application uses 4 types of test-doubles:

1. **Dummies (\*.dummy.ts)** - Does nothing. (e.g. empty functions)
2. **Fakes (\*.fake.ts)** - Returns the same value every time. (e.g. fake repository that returns array of users)
3. **Stubs (\*.stub.ts)** - Simplifies implementation by overriding. (e.g. replaces access to production database by 
referencing in-memory database)
4. **Spies (\*.spy.ts)** - Used to verify behaviour by inspecting calls, its arguments. It can also provide fake calls 
and return values.

> To get more information on test-doubles take a look [here](https://www.mokacoding.com/blog/swift-test-doubles/), 
[here](https://www.javacodegeeks.com/2015/11/test-doubles-mocks-dummies-and-stubs.html) or 
[here](https://martinfowler.com/bliki/TestDouble.html).

When you test-doubles always use following structure and file extensions in your modules. Otherwise, those files might 
be included in builds and fail during running or testing, or include unnecessary dependencies in your bundles.

- **test-doubles**
  - **dummies**
    - \*.dummy.ts
    - index.ts
  - **fakes**
    - \*.fake.ts
    - index.ts
  - **stubs**
    - \*.stub.ts
    - index.ts
  - **spies**
    - \*.spy.ts
    - index.ts
  - index.ts

#### 7.1.2 No errors schema

When you are witting tests for components that uses other components you have to provide its _stub_ implementations or 
use `NO_ERRORS_SCHEMA` that will ignore errors caused by unknown component tags.

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [AuthorizedViewComponent],
        ...
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    }));

#### 7.1.3 Running tests

To run Unit / Integration tests run command `npm run test`.

### 7.2 End-to-End Tests (E2E)

End-to-End a.k.a. E2E tests simulates user interaction with a page. Unfortunately those tests are more fragile than 
basic unit / integration tests, however they might be good to verify some scenarios, even in a multiple browsers. If 
you are not familiar with writing tests in [Protractor](http://www.protractortest.org/), take a look on 
[Protractor tutorial](http://www.protractortest.org/#/tutorial).

E2E tests are located separately in `e2e/src` folder. You may create an folder structure for the tests based on the 
project needs.

e.g. You can create a folder for each feature module and its scenarios.

- e2e
  - src
    - users
    - user-selection
    - user-add
    - ...

#### 7.2.1 Running tests

To run E2E tests run command `npm run e2e`.

### 7.3 Manual Tests

To simplify manual testing you can take advantage of browser synchronization provided by 
[browser-sync module](https://www.browsersync.io/).

1. Make sure your application is up and running on `http://localhost:4200`.
2. Run `npm run browsersync` command.
3. Navigate to `http://localhost:4201` in all your browsers.
4. Now, all changes in code, clicks and manipulation with forms will reflect in all browsers simultaneously.
5. To access and change browser-sync settings, you can access `http://localhosti:4202`.

> As to date 25.1.2019, current version of browser-sync synchronizes clicks only done in Google Chrome. 
Moreover, running IE and Edge will end up in browser-sync failure.

## 8. Analyzing

### 8.1 Linting

Application requires to write a code in specified formats by `tslint.json` and `.stylelintrc` files. 
Currently, linting is done before every build, therefore you won't be able to run the application when a single 
mistake in code formatting is done. For a productivity increase consider usage of recommended 
extensions.

### 8.2 Optimization

Sometimes, you might accidentally import unnecessary files and encounter large size of application bundles. 
To examine what might be an issue, you can use `source-map-explorer` which visualizes bundle's dependencies and its sizes.

1.  First of all make sure you've installed `source-map-explorer`.

        npm install -g source-map-explorer

2.  Create a production build.

        npm run build:prod

3.  Run `source-map-explorer` for with path of the bundle file.

        source-map-explorer dist/angular7-template/vendor.xxx.js

## 9. Localization

This application implements its own localization architecture that translate components with dynamic bindings.

With `LocalizationService` and `LocalizePipe` you get:

- Static variable translations: `applicationTitle: string`
- Parametrized translation functions: `welcomeText: (name: string): string`
- Type-checking whenever there is a missing or misspelled translation.
- Single application bundle (no need to build application for each localization separately).
- No need of application change when switching a language.

However,:
- Localization can slightly effect application performance.
- Probably, won't be indexed by search engines.

### 9.1 Localization values

In `assets/localization/localization-config.ts` file you can find abstract class `LocalizationValues`. It defines an 
interface of all values and formatting functions that has to be implemented by each localization file.

      export abstract class LocalizationValues {
        abstract shortDateFormat: string;
        abstract notFoundPageText: string;
        abstract homePageText: (name: string) => string;
        ...
      }

### 9.2 Localization files

Translation files are located at `assets/localization/locales` folder, where each localization is located in separate 
file and appropriate name. Those files exports constant values by implementing `LocalizationValues` class.

import { LocalizationValues } from '../localization-config';

      export const en: LocalizationValues = {
        shortDateFormat: 'MM/dd/yyyy',
        notFoundPageText: `The page you've requested was not found.`,
        homePageText: name => `Hello ${name}. Welcome!`,
        ...
      };

### 9.3 Supported localizations

Supported locales can be added in two steps:

1.  Register new locale id in `Locale` enum of `assets/localization/localization-config` file.

        import { en, de } from './locales';

        export enum Locale {
          EN = 'en',
          DE = 'de',
          ...
        }

2.  Add implementation of `LocaleValues` and its corresponding id from `Locale` enum to `locales` constant object.

        export const locales: { [id: string]: LocalizationValues } = {
          [Locale.EN]: en,
          [Locale.DE]: de,
          ...
        };

### 9.4 Localize components

To use localized values in your components use following steps:

1. Use `localize` pipe directly in template files.

        {{ ('' | localize).notFoundPageText }}
        
1. Use `LocalizationService`.
    1.  Inject `LocalizationService` into your component as public.
    
            export class AuthorizedViewComponent implements OnInit {
              constructor(public localizationService: LocalizationService, ...) {}
            }
    
    2.  Add bindings for localized values to component's template:
    
            {{ localizationService.values.homePageText('John Doe') }}

### 9.5 Testing localized components

If you use localization in any tested components, you will need to configure `TestBed` according to pipe or service usage.

1. **Pipe** - Declare stubbed pipe `LocalizePipeStub` from `app/core/test-doubles`.

        beforeEach(async(() => {
          TestBed.configureTestingModule({
            declarations: [AuthorizedViewComponent, LocalizePipeStub],
            providers: []
          }).compileComponents();
        }));

1. **Service** - Register fake provider of `LocalizationService` with implemented spy factory 
`localizationServiceSpyFactory` from `app/core/test-doubles`.

        beforeEach(async(() => {
            TestBed.configureTestingModule({
              declarations: [AuthorizedViewComponent],
              providers: [
                ...
                {
                  provide: LocalizationService,
                  useFactory: localizationServiceSpyFactory
                }
              ]
            }).compileComponents();
          }));

### 9.6 Changing locale

To change language simply call `changeLocale` method on `LocalizationService` instance and provide `Locale` value.

    <button (click)="localizationService.changeLocale(locale.EN)">en</button>
    <button (click)="localizationService.changeLocale(locale.DE)">de</button>

## 10. State management

By default, Angular runs change detection algorithm for each component in a tree, whenever async operation like
`click`, `http` or `timer` completes. It is also important that change detection always run from top to the bottom
and in the same order. Obviously, event the change detection is quite fast, this might be not optimal for more complex
 user interfaces with many components. 
Because of this, it is recommended to use `ChangeDetectionStrategy.OnPush`.

### 10.1. OnPush change detection strategy and performance optimization with Immutable

`OnPush` tells Angular to ignore change detection for the component and its subtree if none of its `@Input` property 
reference changed. That means that if we want to run change detection while relying on vertical data flow, we need to 
update values in immutable way. 

e.g.

    this.user.name = "John Smith"; // Mutable - won't run change detection
    this.user = { ...this.user, name: 'John Smith' }; // Immutable - will run change detection

This strategy is not set by default and its manual setting is required after creation of new component.

    import { Component, ChangeDetectionStrategy } from '@angular/core';
    
    @Component({
      selector: 'app-authorized-view',
      ...
      changeDetection: ChangeDetectionStrategy.OnPush
    })

### 10.2 OnPush change detection strategy and performance optimization with Observables

Passing the single state from top to bottom of the component tree would end up in writing a lot of boilerplate and
hard-to-read source code. Therefore, the idea of increasing performance of the change detection is combined with another 
optimization principle based on subscribing to events of observable objects. Whenever an observable is changed, it notifies
its subscribers (components). When notified components has `ChangeDetectionStrategy.OnPush` we need to ask for change
detection manually, what will end up in marking a path from this component to the root component. This way change detection
will get there even the input properties of `OnPush` components did not change.

There are two ways of running change detection on observable changes:

1. Using `async` pipe in a template is the simplest way that also takes care of unsubscription.

        {{ (state$ | async).userName }}
        {{ (state$ | async).userAge }}
        
      > Using multiple `async` pipes would end up in having multiple subscriptions, therefore it's good to use `as`
      keyword to expose subscription as single property.
      
        <ng-container *ngIf="(state$ | async) as state">
          {{ state.userName }}
          {{ state.userAge }}
        </ng-container>
      
        
1. Second way is to manually subscribe and unsubscribe observable and call `markForCheck()` function of injected
`ChangeDetectorRef` service.

        private stateSubscription: Subscripiton;

        constructor(private cd: ChangeDetectorRef) {}
        
        ngOnInit() {
            this.subscription = this.state.subscribe(() => {
              this.cd.markForCheck();
            });
          }
        }
        
        ngOnDestroy() {
            this.stateSubscription.unsubscribe();
        }
       
### 10.3 Components and Views

For performance optimization and code-readability, application differentiates two types of components.

1. **Components** - Basic components with `OnPush` change detection strategy that does not use any services and relies 
on input data from parent component.

    e.g. Dummy component to display user detail.
    
       @Component({
          selector: 'app-user-detail',
          templateUrl: './user-detail.component.html',
          styleUrls: ['./user-detail.component.scss'],
          changeDetection: ChangeDetectionStrategy.OnPush
        })
        export class UserDetailComponent implements OnInit {
          @Input() user: User;
          @Output() closed: EventEmitter<User> = new EventEmitter<User>();
        
          constructor() {}
        
          ngOnInit() {}
        
          onClose() {
            this.closed.emit(this.user);
          }
        }
        
        ...
      
        <section class="user-detail" *ngIf="user">
          <img [src]="user.avatar" />
          <app-user-name [user]="user"></app-user-name>
          <button class="close-btn" (click)="onClose()">&times;</button>
        </section>

2. **Views** - Views are more sophisticated components that uses services, reacts to observable changes and maps its state
to `components` input properties.

        @Component({
          selector: 'app-users-view',
          templateUrl: './users-view.component.html',
          styleUrls: ['./users-view.component.scss'],
          changeDetection: ChangeDetectionStrategy.Default
        })
        export class UsersViewComponent implements OnInit {
          constructor(public usersService: UsersService) {}
        }
        
        ...
        
        <ng-container *ngIf="(usersService.state$ | async) as state">
              <app-user-detail
                [user]="state.selectedUser"
                (closed)="usersService.unselectUser($event)"
              ></app-user-detail>
        </ng-container>
        
     
### 10.4 Sharing application logic and state

To separate responsibility and make application more testable, it is a good idea to extract application logic and state,
that could be used in different components, to a service. However, since we defined every component to use `OnPush` 
change detection strategy, we also need to make sure of having an immutable state in our services. Because of this,
each service that contains any state that could be displayed by the components, should extend `Store<T>` base class.

#### 10.4.1 Store<T> base class

By extending `Store<T>` we can expose a an observable state of any model, subscribe to its changes
and make sure that its immutable. Also, to keep services as less coupled as possible, it prohibits any state changes from
outside the service.

    export class UsersServiceState {
      users: User[];
      selectedUser: User;
    }
    
    @Injectable()
    export class UsersService extends Store<UsersServiceState> {
      constructor(private usersRepository: UsersRepositoryService) {
        super(new UsersServiceState());
      }
    
      fetchUsers(): void {
        this.usersRepository.getAll().subscribe(r => {
          this.setState({ ...this.state, users: (<any>r).data });
        });
      }
    
      selectUser(user: User) {
        this.setState({ ...this.state, selectedUser: user });
      }
    
      unselectUser(user: User) {
        this.setState({ ...this.state, selectedUser: null });
      }
    }

This `Store<T>` could be used as base class for a `view` component as well.
