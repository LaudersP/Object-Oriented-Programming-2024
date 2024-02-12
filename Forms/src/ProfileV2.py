import tornado.web

username = "dave"
name = "Dave N. Port"
dateOfBirth = "May 4, 1999"
email = "dave@dave.dave"

class Handler(tornado.web.RequestHandler):
    def get(self):
        self.render('../html/ProfileV2.html',
                    userName = username,
                    name = name,
                    dateOfBirth = dateOfBirth,
                    email = email)