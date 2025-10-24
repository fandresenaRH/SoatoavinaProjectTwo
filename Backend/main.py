from controller import conteController, proverbeController, soatoavinaController
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI(
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    swagger_ui_parameters={"syntaxHighlight": True}
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # à sécuriser + tard
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(conteController.router)
app.include_router(proverbeController.router)
app.include_router(soatoavinaController.router)

app.mount("/static", StaticFiles(directory="D:/Soatoavina 2.0/images"), name="static")#Pour autoriser l'image

# teste pour lancer l'APi
@app.get("/")
async def helloWorld():
    return {"Message": "Hello world"}

