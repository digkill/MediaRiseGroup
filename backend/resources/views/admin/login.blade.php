@extends('admin.layout')
@section('title', 'Вход')
@section('content')
<div class="card login"><h1>Управление портфолио</h1><p class="muted">Войдите в аккаунт администратора MediaRise.</p><hr>
<form method="post" action="{{ route('login') }}">@csrf
<label class="field"><span>Email</span><input name="email" type="email" value="{{ old('email') }}" required autocomplete="username" autofocus></label>
<label class="field"><span>Пароль</span><input name="password" type="password" required autocomplete="current-password"></label>
<button class="primary" type="submit">Войти</button>
</form></div>
@endsection
