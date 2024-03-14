from sqlmodel import Field, SQLModel


class ActivityBase(SQLModel):
    activity_id: str
    course_id: str
    content: str
    title: str
    objective: str


    class Config:
        json_schema_extra = {
            "example": {
                "id": 123456,
                "activity_id": "activity id",
                "course_id": "course id",
                "content": "content",
                "title": "title",
                "objective": "objective",
            }
        }


class Activity(ActivityBase, table=True):
    id: int | None = Field(default=None, primary_key=True)


class ActivityCreate(ActivityBase):
    class Config:
        json_schema_extra = {
            "example": {
                "activity_id": "content id",
                "course_id": "course id",
                "content": "content",
                "title": "title",
                "objective": "objective",
            }
        }


class ActivityRead(ActivityBase):
    id: int
    activity_id: str
    course_id: str
    content: str
    title: str
    objective: str


class ActivityUpdate(ActivityBase):
    activity_id: str
    course_id: str
    content: str
    title: str
    objective: str

    class Config:
        json_schema_extra = {
            "example": {
                "activity_id": "content id",
                "course_id": "course id",
                "content": "content",
                "title": "title",
                "objective": "objective",
            }
        }
