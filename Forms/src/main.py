import asyncio
import os, os.path
import tornado.web
import ProfileV2

HTMLDIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__),
                 "..", "html")
)

def MakeApp():
    endpoints = [
        ("/profilev2", ProfileV2.Handler)
    ]

    app = tornado.web.Application(endpoints,
        static_path = HTMLDIR
    )

    app.listen(8000)

    return app

if __name__ == "__main__":
    app = MakeApp()

    asyncio.get_event_loop().run_forever()