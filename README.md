# Auth-api
### links for my work 
* this is the pull request link [pull request](https://github.com/Muradazzeh/auth-api/pull/2)
* this is the link for action page from git hub [action page](https://github.com/Muradazzeh/auth-api/actions)
* this is the link for heroku web site [ herokulink](https://auth-api-murad.herokuapp.com/)
* this is the link for main repo [ repo link ](https://github.com/Muradazzeh/auth-api)

## Introduction 
* What is RBAC : idea of assigning system access to users based on their role in an organization. It's important to remember that not every employee needs a starring role 
* what is ACl : ACL is a means of defining access rights by a given user or user group, to a specific object, such as a document
* On this lap we need to spacify a role for the users that , some users can access to read from the web site and some users have more authority like admin or editor the can access to update or delelte , so after any user sign in correctly we will give him role , on the web page 
* As start I used the starter code from lap 08 to do this task , it is contain two starter code REST API code , and Authentecation code , the requirment to take two code and combine them and get a working server , then I have to add extra routes V2 , to implemnt each role , so the user can have access , depends on his role .
* after that I have to prepare TDD , jest test for the server to make sure every thing is ok , sooooo let's start 

* first lets start with the Web request respond cycle , WRRC  , it is simple one but it will show how the flow of the data will be .

![link](./src/image/WRRC.jpeg)

* and lets do the UML sequance diagram for the authentication , also will be simple one to show us , how can we start 

![link](./src/image/Authentecation.png)

* We have to Install soms packeges to mange our server , this will be easy for us ,    
    * "base-64"
    * "bcrypt"
    * "dotenv"
    * "express"
    * "jest"
    * "jsonwebtoken"
    * "pg"
    * "sequelize"
    * "sequelize-cli"
    * "sqlite3"
    * "supertest" 
* The same as before tasks we have to do server file , and require all the routes on it , **modularity** then I mange the user sign up , so the user data will be saved in the database , for sure the password should be hashed , after that the sign in routes , so the user when he will enter username and the password , we will check the data base for the user , if we found him we will give him massage signed in successfully and we will generat token for him , 

* we have new thing added to the user schema , is the role , or we can called it Action control list , so we will add a role to each user , this role will give the user access to do some Action , on spacific routes , we will take about 

* I Add new models with routes and table schemas , for Food and Clothes , and I created for these two model to sets of routes V1 set and V2 set , on V1 set route any user can get access to these routes and he can show the data , post data , update and delete 

* the second set V2 it has 2 protections , first is to make sure that the user is logged in , so we will go throw , the bearer middle were , to make sure the user loged in and he has the generated token , the second access , is to check for permissions depends on his role , so each role has access to some methods , if the role is normal user , so he can only read from this route , and if his role is admin , he can read , post , update nad delete ,,,, and sooo on .

* now we finish talking lets see some results as shown below : 
* we start with normal sign up 

![link](./src/image/Screenshot%20(263).png)
* then we sign in with same user and we add gis role as admin , so the result as shown , with generated token 

![link](./src/image/Screenshot%20(265).png)

* then we get access to the secret page using generated token 

![link](./src/image/Screenshot%20(266).png)

* now I will do the check for V1 set off routes that any one can access , no need any role , or authentecation .

![linkk](./src/image/Screenshot%20(267).png)
![linkk](./src/image/Screenshot%20(269).png)
![linkk](./src/image/Screenshot%20(270).png)
![linkk](./src/image/Screenshot%20(271).png)
![linkk](./src/image/Screenshot%20(272).png)

* After we finished with set V1 routes all tested ok , any user can access , so we will go to V2 set of routes to check , so we need make sure that the user loged in , and to check which role has , to access. 
* first we hit the route without any loged in user so it gives access denied 

![link](./src/image/Screenshot%20(273).png)
* second we loged in with normal user , so we get the page but it is empty , and we can't post any thing , because user role is read only as shown below 

![link](./src//image/Screenshot%20(274).png)
![link](./src/image/Screenshot%20(275).png)

* now we will test loged in user , his role is admin 

![linkk](./src/image/Screenshot%20(276).png)
![linkk](./src/image/Screenshot%20(277).png)
![linkk](./src/image/Screenshot%20(278).png)
![linkk](./src/image/Screenshot%20(279).png)
![linkk](./src/image/Screenshot%20(280).png)


> Note that I used the same tables for v1 set and v2 set , but all works ok , 

* now I will start with the TDD , jest test , I prepared  basic cases test for , the server , V1 routes , V2 routes and for the both middle wares , basic authentecation and bearer authentecation , 
* As shown below all the result for the tests , 

> note : that I did all this test one by one all passed , but when I do them all togather , the test gives one or two error 
![link](./src/image/Screenshot%20(281).png)
![link](./src/image/Screenshot%20(282).png)
![link](./src/image/Screenshot%20(283).png)
![link](./src/image/Screenshot%20(284).png)
![link](./src/image/Screenshot%20(285).png)

* After test finshied now it time to uploded to GitHub , and this is the action ;





