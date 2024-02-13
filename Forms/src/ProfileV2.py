import tornado.web
import json
import base64

# Global variable to store the current looked at username
current_username = None

accountDatabase = {
    "alice": {
        "real_name": "Alice Smith",
        "DOB": "Jan. 1",
        "email": "alice@example.com",
        "pic": "/static/IMG/alice.png"
    },
    "bob": {
        "real_name": "Bob Jones",
        "DOB": "Dec. 31",
        "email": "bob@bob.xyz",
        "pic": "/static/IMG/bob.png"
    },
    "carol": {
        "real_name": "Carol Ling",
        "DOB": "Jul. 17",
        "email": "carol@example.com",
        "pic": "/static/IMG/carol.png"
    },
    "dave": {
        "real_name": "Dave N. Port",
        "DOB": "Mar. 14",
        "email": "dave@dave.dave",
        "pic": "/static/IMG/dave.png"
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
                        image = accountDatabase[username]['pic'],
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
            if J['realName'] != "":
                accountDatabase[username]['real_name'] = J["realName"]

            if J['birthDate'] != "":
                accountDatabase[username]['DOB'] = J["birthDate"]

            if J['email'] != "":
                accountDatabase[username]['email'] = J["email"]

            resp={"ok": True}
            self.write(json.dumps(resp))
        else:
            self.write("<h1>Invalid Request!</h1>")