from django.db import models

# Create your models here.

class Library(models.Model):
    library_name = models.CharField(max_length=100)
    address = models.CharField(max_length=150)

    def __str__(self):
        return self.library_name


class Author(models.Model):
    author_name = models.CharField(max_length=100)

    def __str__(self):
        return self.author_name


class Book(models.Model):
    title = models.CharField(max_length=150)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    library = models.ForeignKey(Library, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Member(models.Model):
    contact_number = models.CharField(max_length=20)
    library = models.ForeignKey(Library, on_delete=models.CASCADE)

    def __str__(self):
        return f"Member {self.id}"


class Borrow(models.Model):
    borrow_date = models.DateField()
    return_date = models.DateField(null=True, blank=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)

    def __str__(self):
        return f"Borrow {self.id}"
