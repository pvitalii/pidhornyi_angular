# Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.3.

## How to run the solution
1. git clone https://github.com/pvitalii/pidhornyi_angular
2. cd pidhornyi_angular
3. npm install
4. ng serve
5. project will start on http://localhost:4200

## Functionality

1. App header has two navigation links: Product List and Tags, which redirect to pages with list of products and tag management accordingly;
2. Tag management page displays list of tag components which have buttons to edit and delete each tag from list and button to add a new tag. Editing takes place directly in the tag component, user can pick color for a tag and change the name of it.
3. Product List page displays component by which user can filter products by associated tags and list of products, which consists of product item components with basic information about product by click on which user can reach Product Detail Page. Also in products list there is a button to add a new product, which redirect user to the Add Product page;
4. Product Detail page displays all information about the product and has two action buttons to edit and delete product. By click on edit button user will be redirected to the Edit Product page, which displays pre-filled form with an information about appropriate product.

## Notes

### 1. Project structure
I decided to split my project on 3 folders: core, features, shared. Core folder consists of essential services, interceptors, non-reusable components, etc, that are used throughout the application. Feature folder consists of two main features of the project - product and tag, each feature has own folder, which consists of associated with a feature components, interfaces, pages, services. Shared folder groups together reusable components, directives and utils services.

### 2. HTTP
In the application I simulated server by angular in-memory-db-service, which allows to fetch data by http throughout the application. Server simulating is not an ideal solution due to absence of an opportunity to set relations between entities, so because of this sometimes it is needed to make two http requests (first to fetch tags and then to fetch products in product detail page for example), instead of making only one. Also i have two http interceptors - the first one sets isLoading to true during the request, so after every http request will be shown loading spinner, the second one - interceptor for error handling, this interceptor very basic and redirects user to a page 404 in case of appropriate error and to a 500 page in other cases.

### 3. UI
For the better user interface i used Angular Material library.

### 4. Other features
Besides the loading-spinner i have mentioned before, i also provided some additional features: 
  - tag filters are storing in url params, so after page has been reloaded user will see products with the same tags before reloading;
  - dialog to confirm action: after every action with product, such as edit, add, delete, will be shown a dialog modal, on which user should confirm his action.
  - on the main page, when screen gets narrower, filters hides in hidden sidebar which diplays after appropriate button has been pressed.   

### 5. Store
In order to prevent unnecessary http requests and store some data in memory, I provided store services for each feature using rxjs. State of each feature is stored using BehaviorSubject and after http request, state are updated by tap operator in api services.

### 6. Unsubscription
Even though we don't have to unsubscribe from HttpClient observables because they are don't lead to memory leak, it's still recommended to unsubscribe from all observables, so I provided unsubscribtions from http observables using takeUntil operator and unsubscribe method for all other subscriptions.
