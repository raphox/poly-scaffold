# Ruby on Rails

Ruby on Rails is a web application framework with a focus on simplicity and productivity. It allows you to write less code while accomplishing more than many other languages and frameworks.

Rails strives to provide an amazing developer experience while providing powerful features such as thorough dependency injection, an expressive database abstraction layer, queues and scheduled jobs, unit and integration testing, and more.

Whether you are new to web frameworks or have years of experience, Rails is a framework that can grow with you. We'll help you take your first steps as a web developer or give you a boost as you take your expertise to the next level. We can't wait to see what you build.

Get more information at https://guides.rubyonrails.org.

## Installing Ruby

### Install Ruby on macOS

You'll need macOS Catalina 10.15 or newer to follow these instructions.

For macOS, you'll need Xcode Command Line Tools and Homebrew to install dependencies needed to compile Ruby.

Open Terminal and run the following commands:

```bash
# Install Xcode Command Line Tools
$ xcode-select --install

# Install Homebrew and dependencies
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
$ echo 'export PATH="/opt/homebrew/bin:$PATH"' >> ~/.zshrc
$ source ~/.zshrc
$ brew install openssl@3 libyaml gmp rust

# Install Mise version manager
$ curl https://mise.run | sh
$ echo 'eval "$(~/.local/bin/mise activate)"' >> ~/.zshrc
$ source ~/.zshrc

# Install Ruby globally with Mise
$ mise use -g ruby@3
```

### Install Ruby on Ubuntu

You'll need Ubuntu Jammy 22.04 or newer to follow these instructions.

Open Terminal and run the following commands:

```bash
# Install dependencies with apt
$ sudo apt update
$ sudo apt install build-essential rustc libssl-dev libyaml-dev zlib1g-dev libgmp-dev

# Install Mise version manager
$ curl https://mise.run | sh
$ echo 'eval "$(~/.local/bin/mise activate)"' >> ~/.bashrc
$ source ~/.bashrc

# Install Ruby globally with Mise
$ mise use -g ruby@3
```

### Install Ruby on Windows

The Windows Subsystem for Linux (WSL) will provide the best experience for Ruby on Rails development on Windows. It runs Ubuntu inside of Windows which allows you to work in an environment that is close to what your servers will run in production.

You will need Windows 11 or Windows 10 version 2004 and higher (Build 19041 and higher).

Open PowerShell or Windows Command Prompt and run:

```bash
$ wsl --install --distribution Ubuntu-24.04
```

You may need to reboot during the installation process.

Once installed, you can open Ubuntu from the Start menu. Enter a username and password for your Ubuntu user when prompted.

Then run the following commands:

```bash
# Install dependencies with apt
$ sudo apt update
$ sudo apt install build-essential rustc libssl-dev libyaml-dev zlib1g-dev libgmp-dev

# Install Mise version manager
$ curl https://mise.run | sh
$ echo 'eval "$(~/.local/bin/mise activate bash)"' >> ~/.bashrc
$ source ~/.bashrc

# Install Ruby globally with Mise
$ mise use -g ruby@3
```

## Verifying Your Ruby Install

Once Ruby is installed, you can verify it works by running:

```bash
$ ruby --version
ruby 3.3.6
```

## Installing Rails

A "gem" in Ruby is a self-contained package of a library or Ruby program. We can use Ruby's `gem` command to install the latest version of Rails and its dependencies from [RubyGems.org](https://rubygems.org).

Run the following command to install the latest Rails and make it available in your terminal:

```bash
$ gem install rails
```

To verify that Rails is installed correctly, run the following and you should see a version number printed out:

```bash
$ rails --version
Rails 8.0.0
```

NOTE: If the `rails` command is not found, try restarting your terminal.

## Creating an Application

After you have installed Ruby, Bundler, and Rails, you're ready to create a new Rails application. The Rails installer will prompt you to select your preferred testing framework, database, and starter kit:

```shell
rails new example_app --api
```

Once the application has been created, you can start Rails' local development server using the following command:

```shell
cd example_app
```

## Creating the API

Here, we'll create a simple API for managing posts.

```shell
bin/rails generate scaffold Post title:string description:string content:text
bin/rails db:migrate
```

Let's complete the generated files for migration, routes, resources, models, and controllers.

```ruby
# config/routes.rb

Rails.application.routes.draw do
  scope :api do
    resources :posts
  end
end
```

You can now start the Laravel development server:

```shell
bin/rails server
```

Access the API at [http://localhost:3000/api/posts](http://localhost:3000/api/posts).

This API could be used as a backend for a frontend application built with a framework like React, Vue, or Angular.
