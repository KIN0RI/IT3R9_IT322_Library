from django.urls import path, include
from rest_framework.routers import DefaultRouter

# 👇 IMPORT YOUR VIEWSETS
from .views import (
    LibraryViewSet,
    AuthorViewSet,
    BookViewSet,
    MemberViewSet,
    BorrowViewSet
)

router = DefaultRouter()
router.register('libraries', LibraryViewSet)
router.register('authors', AuthorViewSet)
router.register('books', BookViewSet)
router.register('members', MemberViewSet)
router.register('borrows', BorrowViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
