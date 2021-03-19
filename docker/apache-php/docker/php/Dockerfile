FROM php:7.4-apache
COPY docker/php/php.ini /usr/local/etc/php/
COPY docker/apache/000-default.conf /etc/apache2/sites-enabled/000-default.conf

RUN apt-get update && \
    apt-get install -y \
      # for GD
      libjpeg-dev \
      libpng-dev \
      libfreetype6-dev \
      libicu-dev \
      # Essentials
      zlib1g-dev \
      libpq-dev \
      mariadb-client \
      unzip \
      libzip-dev \
      zip \
      # DevTools
      git \
      vim \
      g++ \
      less && \
    docker-php-ext-install pdo_mysql mysqli zip intl && \
    docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/ && \
    docker-php-ext-configure intl && \
    docker-php-ext-install -j$(nproc) gd

# Composer install
RUN cd /usr/bin && curl -s http://getcomposer.org/installer | php && ln -s /usr/bin/composer.phar /usr/local/bin/composer
RUN a2enmod rewrite

WORKDIR /var/www/html
