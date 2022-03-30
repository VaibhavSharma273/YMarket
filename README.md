# YMarket

A one-stop marketplace app that serves the buying and selling needs of Yale affliates.

## Tech Stack

- React Native
- Django
- PostgreSQL
- Imgur API

## Testing

### Frontend

We're using `jest` to create tests. In each directory that contains files that need to be tested, there should be a `__tests__` folder, and possibly a `__snapshots__` sub-folder. So far, we've written a few basic unittests that check if a screen's contents have loaded and snapshot tests for the authorization screens. 

To run the tests, type `yarn test` into the terminal.  