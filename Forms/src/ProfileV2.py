import tornado.web
import json

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
    def get(self):
        self.render('../html/ProfileV2.html',
                    userName = "dave",
                    name = accountDatabase["dave"]['real_name'],
                    dateOfBirth = accountDatabase["dave"]['DOB'],
                    email = accountDatabase["dave"]['email'])
        
    def post(self):
        J = json.loads(self.request.body)
        accountDatabase["dave"]['real_name'] = J["realName"]
        accountDatabase["dave"]['DOB'] = J["birthDate"]
        accountDatabase["dave"]['email'] = J["email"]

        print("Name: ", accountDatabase["dave"]['real_name'])
        print("DOB: ", accountDatabase["dave"]['DOB'])
        print("email: ", accountDatabase["dave"]['email'])

        resp={"ok": True}
        self.write(json.dumps(resp))