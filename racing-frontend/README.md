Prerequisites:
    -Node
    -RethinkDB

- Install dependencies:
    - npm install
    - brew update && brew install rethinkdb

- Run project in your local:
    - BackEnd Console 1
        - rethinkdb  (start the DB)
    - BackEnd Console 2
        - npm run reql (build the DB)
        - npm run start
    - Front End Console 3
        - sudo npm start --port:80
    
