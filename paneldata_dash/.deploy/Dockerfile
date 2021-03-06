FROM tiangolo/uwsgi-nginx:python3.6
#ARGS_SECTION
# By default, allow unlimited file sizes, modify it to limit the file sizes
# To have a maximum of 1 MB (Nginx's default) change the line to:
# ENV NGINX_MAX_UPLOAD 1m
ENV NGINX_MAX_UPLOAD 0

# By default, Nginx listens on port 80.
# To modify this, change LISTEN_PORT environment variable.
# (in a Dockerfile or with an option for `docker run`)
ENV LISTEN_PORT 80

# Which uWSGI .ini file should be used, to make it customizable
ENV UWSGI_INI /app/uwsgi.ini

# URL under which static (not modified by Python) files will be requested
# They will be served by Nginx directly, without being handled by uWSGI
ENV STATIC_URL /app/static
# Absolute path in where the static files wil be
ENV STATIC_PATH /app/static

# If STATIC_INDEX is 1, serve / with /static/index.html directly (or the static URL configured)
# ENV STATIC_INDEX 1
ENV STATIC_INDEX 0

# Install backend dependencies
RUN apt update && apt install -y libxmlsec1-dev xmlsec1

RUN rm -rf /app

COPY uwsgi.ini /app/uwsgi.ini

COPY start.sh /app/start.sh

COPY entrypoint.sh /app/entrypoint.sh

COPY nginx.conf /app/nginx.conf

COPY backend /app/

COPY backend/saml/settings.local-pre-prod.json /app/saml/settings.json

COPY frontend/build /app/static/

WORKDIR /app

RUN pip install --upgrade pip setuptools wheel

RUN pip install -r requirements.txt

COPY supervisord.ini  /etc/supervisor/conf.d/supervisord.conf

# Copy the entrypoint that will generate Nginx additional configs
COPY  entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

# Copy start.sh script that will check for a /app/prestart.sh script and run it before starting the app
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Run the start script, it will check for an /app/prestart.sh script (e.g. for migrations)
# And then will start Supervisor, which in turn will start Nginx and uWSGI
CMD ["/start.sh"]
