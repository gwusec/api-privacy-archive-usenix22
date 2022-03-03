# Django endpoint

A Django web app to receive survey data and subsequently structure it into a
database.

This web app was developed by adapting the Django tutorial here:
https://www.pyscoop.com/write-json-apis-in-pure-django-for-beginners/

## Starting a local test instance

Running this web app requires Python 3, ideally with the `virtualenv` module
installed. To set up the environment and install the required packages:

```bash
python3 -m virtualenv venv
source venv/bin/activate
pip install -r $API_PRIV_ROOT/requirements.txt  
```

After setting up the environment, create an admin user and start a local test
instance (using a SQLite backend) with:

```bash
export DJANGO_DATABASE=sqlite
./manage.py createsuperuser
./manage.py runserver
```

Access the admin console at http://localhost:8000/admin

### Generating database migrations

After making changes to `myapp/models.py`, generate and apply database migrations with:

```bash
./manage.py makemigrations myapp
./manage.py migrate
```

## API endpoints

The `myapp/urls.py` and `myapp/views.py` define the URL API endpoints and
their behaviors, respectively.

### `api/presurvey/`

Sample input data from Owen:
[presurvey.json](sample-inputs/presurvey.json) and
[presurvey-branching.html](sample-inputs/presurvey-diagram.html)

Can simulate submissions using the sample data with:

```bash
curl -X POST -H "Content-Type: application/json" -d @sample-inputs/presurvey.json http://localhost:8000/api/presurvey/
```

### `api/mainsurvey/`

Sample input data from Owen:
[mainsurvey.json](sample-inputs/mainsurvey.json)

Can simulate submissions using the sample data with:

```bash
curl -X POST -H "Content-Type: application/json" -d @sample-inputs/mainsurvey.json http://localhost:8000/api/mainsurvey/
```

### `api/heatmap/`

Sample input data from Irwin:
[heatmap.json](sample-inputs/heatmap.json)

Can simulate submissions using the sample data with:

```bash
curl -X POST -H "Content-Type: application/json" -d @sample-inputs/heatmap.json http://localhost:8000/api/heatmap/
```

### `api/feedback/`

Sample input data from Irwin:
[feedback.json](sample-inputs/feedback.json)

Can simulate submissions using the sample data with:

```bash
curl -X POST -H "Content-Type: application/json" -d @sample-inputs/feedback.json http://localhost:8000/api/feedback/
```

### Prolific demographic data

**TODO???**

Sample schema from David's Google My Activity project:
[demographics.sql](sample-inputs/demographics.sql)

