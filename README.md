# A Full stack Netflix Clone backed by Python

A fully responsive full stack Netflix clone backed by Python and nailed in frontend by Next.js. I wanted a full control on some critical parts for me, like the user registration and the auth flow, so I didn't want to rely on "pre-made" backends.

Stars⭐
are welcome ;)

## Demo

<img src="https://netflix-fullstack.vercel.app/images/demo.png" />

Deployed the backend on a private server. The live web demo is <a href="https://netflix-fullstack.vercel.app">here</a>.

If you don't want to create a new account, you can use these credentials to login: email: main@gmail.com, password: 1234

## Built with

- Backend
  - <a href="https://mysql.com">MySQL server</a>
  - <a href="https://djangoproject.com">Django</a>
  - <a href="https://github.com/shadow3312/drf-scrud">DRF Scrud Viewset</a> (created by me, and released open source)
- Frontend
  - <a href="https://nextjs.org">Next.js</a>
  - <a href="https://themoviedb.org">TMDB API</a>
  - <a href="https://recoiljs.org">Recoil</a>
  - <a href="https://tailwindcss.com">Tailwind CSS</a>

## Running the project locally

### Backend

> If you prefer to use your own backend, just skip this part <br />

<b>Python version: 3.8</b>

<h4>Steps</h4>

Navigate to the <a href="https://github.com/shadow3312/netflix-clone/tree/master/backend">backend</a> directory, and create a virtual env

```bash
cd /backend

python -m venv env
```

Then install requirements

```bash
cd /core

pip install -r requirements.txt
```

Create a local database `netflix-clone`

> You can change this in `core/core/settings.py`, including other database variables or even the engine (`postgres`, `sqlite`, `mysql` etc...)

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'netflix-clone',
        'HOST': 'localhost',
        'USER': 'root',
        'PASSWORD': config('DB_PASS')
    }
}
```

Create a .env file in the root project folder (the one containing `manage.py`) and set the variable `DB_PASS=YOUR_DB_SERVER_USER_PASSWORD`

Once your db configuration is done,

```bash
// Activate env
// In backend/ folder

// Linux

source env/bin/activate

// Windows

\env\Scripts\activate

```

Then migrate models

```bash
cd /core
python manage.py makemigrations

python manage.py migrate
```

Finally, launch the server

```bash
python manage.py runserver
```

If you want to play with the API

```bash
python manage.py spectacular --file schema.yml
```

The API playground should be found at `localhost:8000/api/v1/schema/ui/`

<b>Testing</b>

The backend tests are in `backend/core/tests`

You can add your own and run

```bash
pytest -rP
```

### Frontend

```bash
cd /frontend/netflix

npm i --save

npm run dev
```

You're done.

## TODO:

Coming soon

- ~~Create a more mobile friendly experience (Done)~~
- Implement the like/dislike functionnality

Feel free to clone, fork, star ⭐, report a bug or <a href="https://www.linkedin.com/in/euloge-amour/">get in touch</a>.

&copy; Shuruzer.
