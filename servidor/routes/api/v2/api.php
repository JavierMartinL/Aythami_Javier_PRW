<?php

use App\Http\Controllers\FilesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PassportAuthController;


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

Route::prefix('/user')->group(function(){
    Route::post('/login', 'App\Http\Controllers\LoginController@login');
    Route::post('/createUser', 'App\Http\Controllers\LoginController@createUser');
    Route::post('/logout', 'App\Http\Controllers\LoginController@logout');
});

Route::post('register', [PassportAuthController::class, 'register']);
Route::post('login', [PassportAuthController::class, 'login']);
// agregamos middleware a Files para que no se pueda acceder sin estar auth
Route::middleware('auth:api')->group(function () {
    Route::resource('files', FilesController::class);
});