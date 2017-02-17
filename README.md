# BalanceChecker

# FRONTEND Angular 2 app

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.25.5.

### Install Angular CLI globally

Run `npm install -g angular-cli`

### JIT or AOT compilation

This project is ready to use AOT compilation, which runs only once at build time. 
[JIT vs AOT comparison](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html#!#aot-jit)

To enable AOT simply add flag:

    --aot

To ng serve or build commands.

### Install NPM dependencies

Navigate to `client` directory and:

    npm install

### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Webpack

This project uses Webpack. There is no need to set file watchers for .scss to .css or .ts to .js.

PostCSS is also included, so there is no need to add compatibility prefixes to CSS.

### Running tslint for all Typescript files in the project

    tslint -c tslint.json src/**/*.ts

# BACKEND Django app

### Requirements and dependencies
* Python 3.5
* Django 1.10
* RabbitMQ
* Celery 4.0

### Setting up virtualenv (optional)
    sudo pip3 install virtualenv
    mkdir ~/.virtualenvs/
    virtualenv ~/.virtualenvs/balance.refugee.info -p <path>/python3.5

### Configuring App, set local settings
    source ~/.virtualenvs/balance.refugee.info/bin/activate      # if you installed
    pip install -r requirements.txt
    cp balance/local_settings.example.py balance/local_settings.py
    
### Setting up your Django environment
    ./manage.py migrate
    ./manage.py createsuperuser
    ./manage.py runserver    
    
### Starting celery import task

Make sure that RabbitMQ server is running (and installed in your system).

    rabbitmq-server
    
Run celery worker
    
    celery -A balance worker -l info

### Troubleshooting

* Facing connection errors in Angular app?

    Make sure that your Django app is running at same port as apiPath set in `client/src/environments/environment.ts` file.
