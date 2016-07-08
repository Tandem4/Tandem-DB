## Tandem DB Usage ##

1.  To use, simply run in your project directory:

    ```
    npm install tandem-db
    ```

2.  See `config.js`: Add environment variables on your machine

    ```
    TANDEM_DB_HOST
    TANDEM_DB_PW
    ```

3.  Enjoy :)


## Schema Diagram

  ![Site Architecture](https://raw.githubusercontent.com/Tandem4/Tandem-Analysis/master/images/DB_schema.png)


## Tandem DB Local Setup ##

1. Initialize a mySQL server:

    ```
    $ mysql.server start
    Starting mySQL
      SUCCESS!
    ```
1. Start a mySQL server with in the terminal (by default there is no password):

    ```
    $ mysql -u root -p
    ```
2. Create a database called, `tandem`. For more information, visit this [great tutorial](https://www.digitalocean.com/community/tutorials/a-basic-mysql-tutorial):

    ```
    mysql> CREATE DATABASE tandem;
    ```
3. Open up the database:

    ```
    mysql> USE tandem;
    ```
4. Create account and specifiy privileges. Here, we will be creating a `tandem` account with a password of your choice, connection from `localhost` and all access to the database, `tandem`. More information about users and privileges can be found [here](http://dev.mysql.com/doc/refman/5.7/en/adding-users.html "mysql Docs") AND [here](https://www.digitalocean.com/community/tutorials/how-to-create-a-new-user-and-grant-permissions-in-mysql "Digital Ocean's How-to")

    ```
    mysql> CREATE USER 'tandem'@'localhost' IDENTIFIED BY 'your_password';
    mysql> GRANT ALL PRIVILEGES ON tandem.* TO 'tandem'@'localhost';
    ```
To see privileges on the account you've just created:

    ```
    mysql> SHOW GRANTS FOR 'tandem'@'localhost';
    ```

5. Save your newly created password to your machine's bash profile, to be accessed by config.js:

    ```
    export TANDEM_DB_PW='your_password'
    ```

6. To re-seed the database, run:

    ```
    npm run seed
    ```


