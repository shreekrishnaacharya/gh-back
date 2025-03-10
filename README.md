# Task Management Backend

This is the backend service for the Task Management application. It is built using NestJS and provides APIs for managing tasks, including creating, updating, deleting, and searching tasks. The backend also integrates with a MySQL database using TypeORM.

## Features

- Create, update, and delete tasks
- Search tasks with pagination and filtering
- Task prioritization and status management

## Technologies Used

- NestJS
- TypeORM
- MySQL
- @nestjs/swagger for API documentation
- @sksharma72000/nestjs-search-page for pagination and filtering

## Getting Started

### Prerequisites

- Node.js
- npm
- MySQL database

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/shreekrishnaacharya/gh-back
   cd gh-back
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Configure the database connection in the `database.module.ts` file.

### Setting Up the Database

- Create a new PostgreSQL database and update the connection details in the `.env` file.
- Install the dependencies with `npm install`.
- Set up the database by running `npm run db:setup`.

### Setting Up the Environment

- Create a `.env` file with the following variables:

  - `DB_HOST`
  - `DB_PORT`
  - `DB_USER`
  - `DB_PASSWORD`
  - `DB_NAME`
  - `PORT`
  - `DB_SYNC`

- Example .env

  ```
    DB_HOST=localhost
    DB_NAME=ghtask
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=dbpassword
    PORT=5000
    DB_SYNC=true
  ```

### Running the Application

- Start the application in development mode:

  ```sh
  npm run start:dev
  ```

- Build the application for production:

  ```sh
  npm run build
  ```

- Start the application in production mode:

  ```sh
  npm run start:prod
  ```

### API Documentation

- API documentation is available via Swagger at `http://localhost:<port>/api`.

## Using @sksharma72000/nestjs-search-page

The [@sksharma72000/nestjs-search-page](https://github.com/shreekrishnaacharya/nestjs-search-page) package is used to simplify the implementation of pagination and filtering in the application. It provides decorators and utilities to easily manage paginated responses and apply filters based on query parameters.

### Key Features

- **Pagination**: Automatically handle paginated responses for large datasets.
- **Filtering**: Apply filters to the queries based on request parameters.
- **Integration**: Seamlessly integrates with NestJS and TypeORM.
  
### Repo and links
Github : [https://github.com/shreekrishnaacharya/nestjs-search-page](https://github.com/shreekrishnaacharya/nestjs-search-page)

Medium :[https://medium.com/towardsdev/simplify-your-nestjs-database-searches-with-nestjs-search-page-d2423ca8ba74](https://medium.com/towardsdev/simplify-your-nestjs-database-searches-with-nestjs-search-page-d2423ca8ba74)

### Example Usage

In your DTOs, use the `@PageSearch` decorator to specify which fields can be filtered:

```typescript
import { IsString, IsOptional } from 'class-validator';
import { PageSearch } from '@sksharma72000/nestjs-search-page';

export class SearchTaskDto {
  @IsString()
  @IsOptional()
  @PageSearch()
  title?: string;

  @IsString()
  @IsOptional()
  @PageSearch()
  description?: string;
}
```

In your service, utilize the `findAllByPage` method to handle paginated and filtered queries:

```typescript
import { findAllByPage } from '@sksharma72000/nestjs-search-page';

@Injectable()
export class TaskService {
  async getAll(
    searchDto: SearchTaskDto,
    pageable: PageDto,
  ): Promise<Page<Task>> {
    return findAllByPage({
      repo: this.taskRepo,
      page: pageable,
      queryDto: searchDto,
    });
  }
}
```

### Testing

- Unit tests are implemented using Jest and located in the `test` directory.
- End-to-end tests are implemented using Jest and located in the `test` directory with the `*.e2e-spec.ts` extension.
- When running end-to-end tests, a `.env.test` file is used to configure the application.

## Architecture and Decisions

The application uses a single service, responsible for managing tasks. The service is built using NestJS, a TypeScript framework for building server-side applications. The service uses TypeORM for database operations and stores the data in a MySQL database. The application also uses the `@sksharma72000/nestjs-search-page` package to simplify the implementation of pagination and filtering.

The application uses a modular approach, with each feature being implemented as a separate module. The modules are organized by feature, with each feature having its own controller, service, repository, and dtos. The controllers are responsible for handling HTTP requests and responses, the services are responsible for implementing the business logic of the application, the repositories are responsible for interacting with the database, and dtos for validation user inputs and swagger documentation.

The application also uses a number of other packages and libraries, such as `class-validator` and `class-transformer`, to validate and transform data.

The application was developed using the following architectural principles:

- **Separation of Concerns**: Each feature was implemented as a separate module, with each module being responsible for a specific feature.
- **Modularity**: The application was built using a modular approach, with each module being a separate unit of code.
- **Loose Coupling**: The modules were designed to be loosely coupled, with each module depending on as few other modules as possible.
- **High Cohesion**: The modules were designed to have high cohesion, with each module being responsible for a single feature or set of related features.

The application was developed using the following technologies:

- **NestJS**: A TypeScript framework for building server-side applications.
- **TypeORM**: An ORM for TypeScript and JavaScript.
- **MySQL**: A relational database management system.
- **@sksharma72000/nestjs-search-page**: A package for simplifying the implementation of pagination and filtering in NestJS applications.

The application was developed with the following challenges in mind:

- **Performance**: The application was designed to be performant, with optimized database queries and efficient processing of requests.
- **Scalability**: The application was designed to be scalable, with a modular architecture that allows for the easy addition of new features.


## Live application

Application is hosted live on cpanel at http://task-api.krishna-acharya.com.np/
Swagger file can ba accessed at http://task-api.krishna-acharya.com.np/api

Client application, ie frontend react app, can be accessed at http://task.krishna-acharya.com.np

## License

This project is licensed under the MIT License.
