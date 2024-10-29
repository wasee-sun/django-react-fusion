from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list-create"),
    # path("notes/<int:pk>/", views.NoteDetail.as_view(), name="note-detail"),
    path("notes/<int:pk>/delete/", views.NoteDelete.as_view(), name="note-delete"),
    # path("users/", views.UserListCreate.as_view(), name="user-list-create"),
    # path("users/<int:pk>/", views.UserDetail.as_view(), name="user-detail"),
]