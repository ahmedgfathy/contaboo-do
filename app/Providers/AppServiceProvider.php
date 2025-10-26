<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Relations\Relation;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        
        // Automatically register permissions as gates
        Gate::before(function ($user, $ability) {
            return $user->hasPermissionTo($ability) ? true : null;
        });

        // Register morph map for polymorphic relationships
        Relation::enforceMorphMap([
            'User' => 'App\Models\User',
            'Lead' => 'App\Models\Lead',
            'Property' => 'App\Models\Property',
            'Opportunity' => 'App\Models\Opportunity',
            'Contact' => 'App\Models\Contact',
        ]);
    }
}
