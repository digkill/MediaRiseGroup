@extends('admin.layout')
@section('title', 'Проекты')
@section('content')
<div class="toolbar"><div><h1>{{ $archived ? 'Архив проектов' : 'Проекты' }}</h1><p class="muted">{{ $projects->count() }} проектов · Публичная версия: English · Русские тексты скрыты</p></div><div class="row-controls"><a href="{{ route('admin.projects.index', $archived ? [] : ['view'=>'archived']) }}">{{ $archived ? 'Все проекты' : 'Архив' }}</a><a class="button primary" href="{{ route('admin.projects.create') }}">+ Добавить проект</a></div></div>
<div class="card"><p class="muted">«Опубликован» управляет доступностью проекта в портфолио. «На главной» добавляет карточку в блок Featured work. Скрытый проект не появляется на главной, даже если галочка установлена.</p></div>
<div class="card table-wrap"><table><thead><tr><th>Проект</th><th>Порядок</th><th>Отображение</th></tr></thead><tbody>
@forelse($projects as $project)<tr><td><a class="title-link" href="{{ $archived ? '#' : route('admin.projects.edit', $project) }}">{{ $project->en['title'] }}</a><div class="row-meta">{{ $project->category }} · {{ $project->status }}<br>/projects/{{ $project->slug }}</div></td><td>{{ $project->position }}</td><td>
@if($archived)<form method="post" action="{{ route('admin.projects.restore', $project->id) }}">@csrf<button>Восстановить как черновик</button></form>
@else<form class="row-controls" method="post" action="{{ route('admin.projects.visibility', $project) }}">@csrf @method('PATCH')<input type="hidden" name="version" value="{{ $project->version }}"><input type="hidden" name="published" value="0"><input type="hidden" name="featured" value="0"><label class="check"><input type="checkbox" name="published" value="1" @checked($project->published)>Опубликован</label><label class="check"><input type="checkbox" name="featured" value="1" @checked($project->featured)>На главной</label><button>Сохранить</button></form>@endif
</td></tr>@empty<tr><td colspan="3">Здесь пока нет проектов.</td></tr>@endforelse
</tbody></table></div>
@endsection
