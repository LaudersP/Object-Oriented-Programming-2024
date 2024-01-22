import asyncio
import os, os.path
import tornado.web
import Profile

## Set the path to the HTML directory
HTMLDIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__),
                 "..","html")
)

## Function to make the application
def MakeApp():
    ## Points to the Profile class handler
    endpoints = [
        ## Get the wild card regular expression
        (r"/profile/(.*)", Profile.Handler)
    ]

    ## Construct application
    app = tornado.web.Application(endpoints,
        static_path = HTMLDIR
    )

    ## Make application listen to Port 8000
    app.listen(8000)

    ## Return the application
    return app

if __name__ == "__main__":
    ## Create application
    app = MakeApp()

    ## Run application forever
    asyncio.get_event_loop().run_forever()