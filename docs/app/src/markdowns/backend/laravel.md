# Laravel

Laravel is a web application framework with expressive, elegant syntax. A web framework provides a structure and starting point for creating your application, allowing you to focus on creating something amazing while we sweat the details.

Laravel strives to provide an amazing developer experience while providing powerful features such as thorough dependency injection, an expressive database abstraction layer, queues and scheduled jobs, unit and integration testing, and more.

Whether you are new to PHP web frameworks or have years of experience, Laravel is a framework that can grow with you. We'll help you take your first steps as a web developer or give you a boost as you take your expertise to the next level. We can't wait to see what you build.

Get more informations at [https://laravel.com/docs](https://laravel.com/docs).

## Installing PHP and the Laravel Installer

Before creating your first Laravel application, make sure that your local machine has [PHP](https://php.net), [Composer](https://getcomposer.org), and [the Laravel installer](https://github.com/laravel/installer) installed. In addition, you should install either [Node and NPM](https://nodejs.org) or [Bun](https://bun.sh/) so that you can compile your application's frontend assets.

If you don't have PHP and Composer installed on your local machine, the following commands will install PHP, Composer, and the Laravel installer on macOS, Windows, or Linux:

```shell
# macOS
/bin/bash -c "$(curl -fsSL https://php.new/install/mac/8.4)"

# Windows PowerShell (Run as administrator)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://php.new/install/windows/8.4'))

# Linux
/bin/bash -c "$(curl -fsSL https://php.new/install/linux/8.4)"
```

After running one of the commands above, you should restart your terminal session. To update PHP, Composer, and the Laravel installer after installing them via `php.new`, you can re-run the command in your terminal.

If you already have PHP and Composer installed, you may install the Laravel installer via Composer:

```shell
composer global require laravel/installer
```

## Creating an Application

After you have installed PHP, Composer, and the Laravel installer, you're ready to create a new Laravel application. The Laravel installer will prompt you to select your preferred testing framework, database, and starter kit:

```shell
laravel new example-app
```

Once the application has been created, you can start Laravel's local development server, queue worker, and Vite development server using the `dev` Composer script:

```shell
cd example-app
```

## Creating the API

Here, we'll create a simple API for managing posts.

```
php artisan install:api
php artisan make:model Post -m
php artisan make:resource Post
php artisan make:controller Post --api --model=Post
```

Let's complete the generated files for migration, routes, resources, models, and controllers.

```php
// database/migrations/<DATETIME>_create_posts_table.php

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description');
            $table->text('content');
            $table->timestamps();
        });
    }


// routes/api.php

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Post as PostController;

Route::middleware('api')->group(function () {
    Route::apiResource('posts', PostController::class);
});


// app/Models/Post.php

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['title', 'description', 'content'];
}


// app/Http/Controllers/Post.php

<?php

namespace App\Http\Controllers;

use App\Models\Post as PostModel;
use App\Http\Resources\Post as PostResource;
use Illuminate\Http\Request;

class Post extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return PostResource::collection(PostModel::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'string',
            'published_at' => 'nullable|date',
        ]);

        $post = PostModel::create($request->all());

        return new PostResource($post);
    }

    /**
     * Display the specified resource.
     */
    public function show(PostModel $post)
    {
        return new PostResource($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PostModel $post)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'content' => 'string',
            'published_at' => 'nullable|date',
        ]);

        $post = PostModel::update($request->all());

        return new PostResource($post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PostModel $post)
    {
        $post->delete();

        return response()->json(null, 204);
    }
}
```

After to change the migration file adding the columns `title`, `description`, and `content`. You need to run the migration to create the `posts` table:

```shell
php artisan migrate
```

You can now start the Laravel development server:

```shell
php artisan serve
```

Access the API at [http://localhost:8000/api/posts](http://localhost:8000/api/posts).

This API could be used as a backend for a frontend application built with a framework like React, Vue, or Angular.
