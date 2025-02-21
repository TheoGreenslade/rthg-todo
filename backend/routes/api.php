<?php

/** @var \Illuminate\Routing\Router $router */

use App\Http\Controllers;

$router->get('/tasks', [Controllers\TaskController::class, 'index']);
