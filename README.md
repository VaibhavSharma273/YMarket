# YMarket

A one-stop marketplace app that serves the buying and selling needs of Yale affliates.

## Tech Stack

- React Native
- Django
- PostgreSQL
- Imgur API

## Testing

Please look at the dev branch for the most updated version of the codebase.

### Frontend

We are using `jest` to create tests. In each directory that contains files that need to be tested, there should be a `__tests__` folder, and possibly a `__snapshots__` sub-folder. So far, we have written a few basic unittests that check if a screen's contents have loaded and snapshot tests for the authorization screens.

To run the tests, type `yarn test` into the terminal.

### Backend

We are using the `APITestCase` class from Django's REST framework. This class mirrors the existing Django test case classes, but it uses `APIClient` instead of Django's default `Client`. For each feature implemented, there should be a `tests.py` file in the appropriate feature subdirectory. Currently, there are unit tests for the post API in `/posts/tests.py` and for the user authentication system API in `/users/tests.py`. Because our post API requires authentication by nature, there is integration testing between the authentication system and the post API.

To run the tests, type `python manage.py test` into the terminal.

### CI/CD

We have set up a basic CI/CD workflow in `.github/workflows/main.yml`. On pushes and pull requests to the dev and main branches, this CI will run two jobs: `Test Server` and `Test Client`. For now, these jobs simply install the necessary dependencies for our app and run the tests that we have created.
