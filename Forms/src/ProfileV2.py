import tornado.web
import json

# Global variable to store the current looked at username
current_username = None

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

class Handler(tornado.web.RequestHandler):
    def get(self, username):
        # Create global variable instance
        global current_username

        if username in accountDatabase:
            # Get global variable value
            current_username = username

            self.render('../html/ProfileV2.html',
                        userName = username,
                        name = accountDatabase[username]['real_name'],
                        dateOfBirth = accountDatabase[username]['DOB'],
                        email = accountDatabase[username]['email'])
        else:
            self.write("<h1>USER NOT FOUND!</h1>")
        
    def post(self):
        # Create global variable instance
        global current_username

        # Check that 'current_username' is not empty
        if current_username is not None:
            # Get global variable value
            username = current_username

            J = json.loads(self.request.body)

            # Check for filled responses
            if J['realName'] is not "":
                accountDatabase[username]['real_name'] = J["realName"]

            if J['birthDate'] is not "":
                accountDatabase[username]['DOB'] = J["birthDate"]

            if J['email'] is not "":
                accountDatabase[username]['email'] = J["email"]

            resp={"ok": True}
            self.write(json.dumps(resp))
        else:
            self.write("<h1>Invalid Request!</h1>")