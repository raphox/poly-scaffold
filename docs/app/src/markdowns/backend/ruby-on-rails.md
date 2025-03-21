# Ruby on Rails

Ruby on Rails is a web application framework with a focus on simplicity and productivity. It allows you to write less code while accomplishing more than many other languages and frameworks.

Rails strives to provide an amazing developer experience while providing powerful features such as thorough dependency injection, an expressive database abstraction layer, queues and scheduled jobs, unit and integration testing, and more.

Whether you are new to web frameworks or have years of experience, Rails is a framework that can grow with you. We'll help you take your first steps as a web developer or give you a boost as you take your expertise to the next level. We can't wait to see what you build.

Get more information at https://guides.rubyonrails.org.

## Summary

1. [Installing Ruby](#installing-ruby)
2. [Installing Rails](#installing-rails)
3. [Creating an Application](#creating-an-application)
4. [Creating the API](#creating-the-api)
5. [Hosting a Next.js application (Static Exports) in a Ruby on Rails application](#hosting-a-nextjs-application-static-exports-in-a-ruby-on-rails-application)

<a id="installing-ruby"></a>

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

<a id="installing-rails"></a>

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

<a id="creating-an-application"></a>

## Creating an Application

After you have installed Ruby, Bundler, and Rails, you're ready to create a new Rails application. The Rails installer will prompt you to select your preferred testing framework, database, and starter kit:

```shell
rails new example_app --api
```

Once the application has been created, you can start Rails' local development server using the following command:

```shell
cd example_app
```

<a id="creating-the-api"></a>

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

<a id="hosting-a-nextjs-application-static-exports-in-a-ruby-on-rails-application"></a>

# Hosting a Next.js application (Static Exports) in a Ruby on Rails application

Next.js enables starting as a static site or Single-Page Application (SPA), then later optionally upgrading to use features that require a server.

When running next build, Next.js generates an HTML file per route. By breaking a strict SPA into individual HTML files, Next.js can avoid loading unnecessary JavaScript code on the client-side, reducing the bundle size and enabling faster page loads.

Since Next.js supports this static export, it can be deployed and hosted on any web server that can serve HTML/CSS/JS static assets.

Get more information at [https://nextjs.org/docs/app/building-your-application/deploying/static-exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports).

Usually, you can host a Next.js application on a static site hosting service like Vercel, Netlify, or GitHub Pages. But if you want, you can host it in a Ruby on Rails application. If you chose to host it in a Ruby on Rails application, you don't need to have two separate applications for the frontend and backend.

> **TIP:** It could be a good choice if you want to keep everything in one place and pay for **ONLY ONE HOSTING SERVICE**.

Here's how you can host a Next.js application in a Ruby on Rails application:

1. Create your Ruby on Rails application.

```shell
rails new my-rails-app
cd my-rails-app
```

2. Create a new Next.js application inside the Ruby on Rails application.

```shell
npx create-next-app@latest frontend
cd frontend
```

3. Build the Next.js application.

   Change Next.js build settings in `next.config.js` to export the application as static HTML files.

```javascript
// Change the next.config.js
module.exports = {
  output: "export",
  trailingSlash: true,
  distDir: process.argv[2] === "build" ? "../public" : ".next",
  images: {
    unoptimized: true,
  },
  //...
};
```

4. Build the Next.js application.

```shell
npm run build
```

5. Add new routes settings on Ruby on Rails application to allow dynamic routing from Next.js.

```ruby
# config/routes.rb

Rails.application.routes.draw do
  # ...

  parameter_regex = /\[([a-zA-Z0-9_-]+)\]/
  static_files_path = Rails.root.join("public").to_s
  static_files = File.join(static_files_path, "**", "index.html")

  Dir.glob(static_files).each do |path|
    next unless path.match?(parameter_regex)

    route = path[%r{#{Regexp.escape(static_files_path)}(.*)/index.html}, 1]
    route = route.gsub(parameter_regex, ':\1')

    get route, to: "next_rails_scaffold/static_pages#index", file_path: path
  end
end
```
