# *S.T.F.U < Sports Teammates For U >*
A web application that let users find or create any kinds of sport matches based on sport types, location, skill level, date and time, and easily invite other users to join. We will also offer add-ons features such as finding best venue rental and referee.

*Team Members*

1. Project Manager: Carlos Wirawan
1. Business Analyst: Albert Estevan
1. Senior System Analyst: Tiancheng Fu
1. Software Architect: Jason Kaharudin
1. Software Architect: Nikolas Jody
1. Software Development Lead: Billy Kurniawan Halim
1. Algorithm Specialist: Shih Gau Peng
1. Database Specialist: Woosung Kim
1. Quality Assurance Lead: Jason Wong
1. User Interface Specialist: Gabriela Shirley

- *UCSD CSE 110 SPRING 2020 - WOIKS TEAM*

# S.T.F.U-backend
Sports Team For U back-end repository

## Getting started

1. create a virtual environment
All the libraries will be stored in the virtual environment.
Go to the next step if the venv is created.

To make the virtual environment:

    python3 -m venv venv 

^^ here we need python 3 to be able to use the virtual environment

2. start the virtual environment (have to be done everytime starting the virtual server)
Next start the venv created by executing the following commands:

For windows:

    venv\Scripts\activate.bat

or

    source venv\Scripts\activate

For Mac:

    source venv/bin/activate

3. Install Django and other dependencies (make sure to do step 2):
    
Type in command:
    
<<<<<<< HEAD
    pip install django djangorestframework django-cors-headers pillow django-image-cropping easy-thumbnails django_mysql  django-phonenumber-field django-multiselectfield psycopg2-binary psycopg2 GDAL
=======
    pip install django djangorestframework django-cors-headers pillow django-image-cropping easy-thumbnails django_mysql  django-phonenumber-field django-multiselectfield psycopg2-binary psycopg2
>>>>>>> 46c8cdaab29208c5bad886aec48ccd7b605e3e2b

4. Change your directory:

Bash command:

    cd STFU

5. Start virtual server (Do this every time you are editing the back-end):
Make sure you are on the right directory (the directory that contains manage.py)

command:

    python manage.py runserver

or 

    python3 manage.py runserver

5. Create git branch to avoid conflict

command:

    git branch -m "ENTER BRANCH NAME"

 Do step 2, step 4, step 5 everytime you want to edit the files, test API, run the app etc!!



## Other commands:
### Start Project (You don't have to do this):
command:
    
    django-admin startproject NAME

### Start App (You don't have to do this):
command:

    django-admin startapp NAME

### Create super user:
command:

    python3 manage.py createsuperuser

###  make migrations:
command: 
    
    python manage.py makemigrations

### migrate:
command:
    
    python manage.py migrate

or

    python manage.py migrate --run-syncdb

### Checkout to other branches
command:

    git checkout BRANCHNAME

If everything seems right, and make sure before you push consult WOOSUNG:
merge the branches from your branch to master:

    git merge origin/master


