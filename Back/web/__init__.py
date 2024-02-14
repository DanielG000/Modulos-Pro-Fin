from fastapi import APIRouter

from web import comment, course, user

api = APIRouter()

api.include_router(
    user.router,
    prefix="/users",
    tags=["Usuarios"],
)

api.include_router(
    course.router,
    prefix="/courses",
    tags=["Cursos"],
)

api.include_router(
    comment.router,
    prefix="/comment",
    tags=["Comentarios"],
)
