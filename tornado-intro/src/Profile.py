import tornado.web

## Dictionary of loggin user info
accountDatabase = {
    "alice": {
        "real_name": "Alice Smith",
        "DOB": "Jan. 1",
        "email": "alice@example.com"
    },
    "bob": {
        "real_name": "Bob Jones",
        "DOB": "Dec. 31",
        "email": "bob@bob.xyz"
    },
    "carol": {
        "real_name": "Carol Ling",
        "DOB": "Jul. 17",
        "email": "carol@example.com"
    },
    "dave": {
        "real_name": "Dave N. Port",
        "DOB": "Mar. 14",
        "email": "dave@dave.dave"
    }
}

## Class handler to deal with HTML display
class Handler(tornado.web.RequestHandler):
    ## Grabs the username entered at the back of the URL
    def get(self, username):
        ## Check that the given username is in the database
        if username in accountDatabase:
            ## Get the user info from 'accountDatabase'
            realName = accountDatabase[username]['real_name']
            dob = accountDatabase[username]['DOB']
            email = accountDatabase[username]['email']

            ## Render the HTML webpage with data variables
            self.render("..\html\Profile.html",
                        username = username,
                        name = realName,
                        dateOfBirth = dob,
                        email = email)
        else:
            self.write("<h1>USER NOT FOUND!</h1>")