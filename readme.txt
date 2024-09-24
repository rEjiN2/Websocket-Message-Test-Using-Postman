# Use the Postman websocket 

run the code after 
# npm install 
# npm start

try to connect with Postman

                     ws://localhost:8080

After register with user send the request as

example 
============================
 user1  -:   { "type": "register", "username": "user1" }
 user2  -:   { "type": "register", "username": "user2" }

 # we can register as much as user we want like for group

 After register send the payload

# Now on user can contact with user according this payload

example
==============================

user1  -:      {
        "type": "message",
        "to": "user2",
        "message": "Eda Mone"
                }

user2  -:      {
        "type": "message",
        "to": "user2",
        "message": "Anna Chukamano...."
                }                

 