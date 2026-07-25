from django.urls import path
from chat import views

urlpatterns = [
    path("chat", views.chat_endpoint, name="chat"),
]