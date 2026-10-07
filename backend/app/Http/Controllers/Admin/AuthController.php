<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function create()
    {
        return response()->view('admin.login')->header('Cache-Control', 'private, no-store')->header('X-Robots-Tag', 'noindex, nofollow');
    }

    public function store(Request $request)
    {
        $input = $request->validate(['email' => ['required', 'email', 'max:254'], 'password' => ['required', 'string', 'max:1024']]);
        $key = 'admin-login:'.hash('sha256', strtolower($input['email']).'|'.$request->ip());
        if (RateLimiter::tooManyAttempts($key, 5)) {
            throw ValidationException::withMessages(['email' => 'Too many attempts. Please try again in a minute.']);
        }
        if (! Auth::attempt([...$input, 'is_admin' => true])) {
            RateLimiter::hit($key, 60);
            throw ValidationException::withMessages(['email' => 'The email or password is incorrect.']);
        }
        RateLimiter::clear($key);
        $request->session()->regenerate();

        return redirect()->intended(route('admin.projects.index'));
    }

    public function destroy(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
