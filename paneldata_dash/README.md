## Heroku CLI

You need to download the Heroku CLI which will enable us deploy and manage our application.
After installation login into the Heroku Cli by running this command in the terminal.

### `heroku login`

Open the terminal and paste in this command to clone the application. A gentle reminder that this step will only work if you have Git installed on your computer.

### `https://github.com/JohnsonCustomerAnalytics/paneldata_dash.git`

Open the folder paneldata_dash/backend/ with your favorite text editor or IDE. Create a virtual environment and install the dependencies by running.

### `pip freeze > requirements.txt`
### `pip install -r requirements.txt`

In order for us to successfully deploy any application to Heroku, we must add a Procfile to that application.
### `pip install gunicorn`
and finally
### `pip freeze > requirements.txt`
### `pip install -r requirements.txt`
Create a new file with Procfile as the name and do not add any extension. Add this line below

### `web: gunicorn app:app`

## Deployment

We are now ready to deploy our application. In the application folder run

### `heroku create name-of-your-app`

Please note that name needs to be unique globally.

After creating a heroku app you should see something like:

### `heroku create name-or-your-app`
### `Creating name-or-your-app... done`
### `https://name-or-your-app.herokuapp.com/ | https://git.heroku.com/name-or-your-app.git`


Clone this heroku git repository somewhere on your machine

### `git clone https://git.heroku.com/name-or-your-app.git`

After cloning copy all the files from panel_data/backend to cloned repository and push changes to repository

### `git add .`
### `git commit -m ""initial commit"`
### `git push heroku master`

But before committing and pushing the changes you need to create a .env file in the root folder
 .env file should look something like
###
    JWT_SECRET_KEY="JWTSCRET"
    APPLICATION_SETTINGS=default_config.py
    MAILGUN_DOMAIN = "YOUR-DOMAIN.mailgun.org"
    MAILGUN_API_KEY = "YOURP_MAIL_GUN_API"
    FEEDBACK_RECIPIENT_MAIL= "<>"
    DATABASE_URI="sqlite:///data.db"
    DB_USERNAME = "<user>"
    DB_PASSWORD = "<password>"
    APP_SECRET_KEY="<secret>"


You can check heroku logs using this command:

### `heroku logs --tail`
