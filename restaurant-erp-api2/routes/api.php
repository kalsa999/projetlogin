<?php

use App\Http\Controllers\Auth\ChangePasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

Route::post('/change-password', ChangePasswordController::class);
Route::post('/login', LoginController::class);
Route::post('/register', RegisterController::class);
