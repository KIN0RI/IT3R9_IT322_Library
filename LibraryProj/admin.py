from django.contrib import admin

# Register your models here.
from .models import Library, Author, Book, Member, Borrow

@admin.register(Library)
class LibraryAdmin(admin.ModelAdmin):
    list_display = ('id', 'library_name', 'address')
    search_fields = ('library_name',)


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'author_name')
    search_fields = ('author_name',)


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'author', 'library')
    list_filter = ('library', 'author')
    search_fields = ('title',)


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ('id', 'contact_number', 'library')
    list_filter = ('library',)
    search_fields = ('contact_number',)


@admin.register(Borrow)
class BorrowAdmin(admin.ModelAdmin):
    list_display = ('id', 'book', 'member', 'borrow_date', 'return_date')
    list_filter = ('borrow_date', 'return_date')

