<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ManagementController extends Controller
{
    public function index()
    {
        return Inertia::render('Management/Index');
    }
}
