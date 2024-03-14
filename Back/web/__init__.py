from fastapi import APIRouter

from web import comment, course, user, activity

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


api.include_router(
    activity.router,
    prefix="/activity",
    tags=["Actividades"],
)
