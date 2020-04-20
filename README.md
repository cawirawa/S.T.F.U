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
    
    pip install django djangorestframework django-cors-headers pillow django-image-cropping easy-thumbnails django_mysql  django-phonenumber-field[phonenumberslite] django-multiselectfield psycopg2

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



Disregard this:
"""
ssh -i '/c/Users/carlo/Documents/STFU/LightsailDefaultKey-us-west-2 (1).pem' ubuntu@34.216.76.189
"""