<?php

/** @var \Illuminate\Routing\Router $router */

use App\Http\Controllers;

$router->get('/tasks', [Controllers\TaskController::class, 'index']);
$router->post('/tasks', [Controllers\TaskController::class, 'store']);
$router->get('/tasks/{task}', [Controllers\TaskController::class, 'show']);
$router->patch('/tasks/{task}', [Controllers\TaskController::class, 'update']);
