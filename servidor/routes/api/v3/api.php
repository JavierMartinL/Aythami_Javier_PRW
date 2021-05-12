<?php

use App\Http\Controllers\CategoriasController;
use App\Http\Controllers\ArchivosController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('/user')->group(function () {
    Route::post('/login', 'App\Http\Controllers\LoginController@login');
    Route::post('/createUser', 'App\Http\Controllers\LoginController@createUser');
    Route::post('/logout', 'App\Http\Controllers\LoginController@logout');
    Route::post('/forgot', 'App\Http\Controllers\LoginController@forgotPassword');
    Route::post('/restpassword', 'App\Http\Controllers\LoginController@resetPassword');
});

Route::prefix('/files')->group(function () {
    Route::get('/index', [ArchivosController::class, 'index']);
    Route::post('/store', [ArchivosController::class, 'store']);
    Route::get('/{id}', [ArchivosController::class, 'show']);
    Route::post('/update', [ArchivosController::class, 'update']);
    Route::post('/delete', [ArchivosController::class, 'delete']);
});
Route::prefix('/categorias')->group(function () {
    Route::get('/index', [CategoriasController::class, 'index']);
    Route::post('/store', 'App\Http\Controllers\CategoriasController@store');
    Route::get('/{id}', [CategoriasController::class, 'show']);
    Route::post('/update', [CategoriasController::class, 'update']);
    Route::post('/delete', [CategoriasController::class, 'delete']);
});

// agregamos middleware a Files para que no se pueda acceder sin estar auth
Route::middleware('auth:api')->group(function () {
    Route::resource('/files', ArchivosController::class);
    Route::resource('/categorias', CategoriasController::class);
});
