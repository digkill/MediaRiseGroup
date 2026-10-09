@extends('admin.layout')
@section('title', $project->exists ? ($project->en['title'] ?? 'Проект') : 'Новый проект')
@section('content')
<div class="toolbar"><div><a class="muted" href="{{ route('admin.projects.index') }}">← Все проекты</a><h1 style="margin-top:12px">{{ $project->exists ? $project->en['title'] : 'Новый проект' }}</h1></div>@if($project->exists && $project->published)<a class="button" href="/projects/{{ $project->slug }}" target="_blank" rel="noopener">Открыть на сайте ↗</a>@endif</div>
<form id="project-form" method="post" action="{{ $project->exists ? route('admin.projects.update', $project) : route('admin.projects.store') }}">@csrf @if($project->exists) @method('PUT') @endif
<input type="hidden" name="version" value="{{ old('version', $project->version ?? 1) }}">
<div class="card"><h2>Публикация и отображение</h2><div class="grid"><div><input type="hidden" name="published" value="0"><label class="check"><input type="checkbox" name="published" value="1" @checked(old('published', $project->published))><strong>Опубликован в портфолио</strong></label><input type="hidden" name="featured" value="0"><label class="check"><input type="checkbox" name="featured" value="1" @checked(old('featured', $project->featured))><strong>Показывать на главной</strong></label><p class="muted">Главная показывает только опубликованные проекты с этой галочкой.</p></div><div class="grid"><label class="field"><span>Порядок показа</span><input name="position" type="number" min="0" max="100000" value="{{ old('position', $project->position ?? 0) }}" required><small>Меньшее число — выше.</small></label><label class="field"><span>Адрес проекта (slug)</span><input name="slug" value="{{ old('slug', $project->slug) }}" pattern="[a-z0-9]+(-[a-z0-9]+)*" maxlength="100" required @readonly($project->exists)><small>/projects/slug</small></label></div></div><div class="grid"><label class="field"><span>Категория</span><select name="category">@foreach(\App\Models\PortfolioProject::CATEGORIES as $category)<option @selected(old('category', $project->category) === $category)>{{ $category }}</option>@endforeach</select></label><label class="field"><span>Статус разработки</span><select name="status">@foreach(\App\Models\PortfolioProject::STATUSES as $status)<option @selected(old('status', $project->status) === $status)>{{ $status }}</option>@endforeach</select></label></div></div>
@foreach(['en'=>'English', 'ru'=>'Русский', 'zh'=>'中文 — китайский (упрощённый)', 'ko'=>'한국어 — корейский', 'th'=>'ไทย — тайский', 'ja'=>'日本語 — японский'] as $locale=>$heading)
<div class="card">@if($locale !== 'en')<details><summary>{{ $heading }}</summary><p class="translation-note">Этот перевод отображается на сайте при выборе соответствующего языка. Пустые поля используют английскую версию.</p>@else<h2>{{ $heading }}</h2>@endif
<div class="grid">@foreach(['title'=>'Название', 'type'=>'Краткое назначение'] as $field=>$label)<label class="field"><span>{{ $label }}</span><input name="{{ $locale }}[{{ $field }}]" value="{{ old($locale.'.'.$field, $project->{$locale}[$field] ?? '') }}" maxlength="{{ $field === 'title' ? 160 : 240 }}" @required($locale === 'en')></label>@endforeach</div>
<label class="field"><span>Описание</span><textarea name="{{ $locale }}[description]" rows="4" maxlength="3000" @required($locale === 'en')>{{ old($locale.'.description', $project->{$locale}['description'] ?? '') }}</textarea></label>
<label class="field"><span>Для кого</span><textarea name="{{ $locale }}[audience]" rows="2" maxlength="1000" @required($locale === 'en')>{{ old($locale.'.audience', $project->{$locale}['audience'] ?? '') }}</textarea></label>
@php($features = old($locale.'.features', $project->{$locale}['features'] ?? []))
<label class="field"><span>Возможности — одна на строку</span><textarea name="{{ $locale }}[features]" rows="7">{{ is_array($features) ? implode("\n", $features) : $features }}</textarea></label>
<div class="grid"><label class="field"><span>Примечание (необязательно)</span><textarea name="{{ $locale }}[note]" maxlength="2000">{{ old($locale.'.note', $project->{$locale}['note'] ?? '') }}</textarea></label><label class="field"><span>Текст кнопки ссылки (необязательно)</span><input name="{{ $locale }}[websiteLabel]" maxlength="80" value="{{ old($locale.'.websiteLabel', $project->{$locale}['websiteLabel'] ?? '') }}"></label></div>
@if($locale !== 'en')</details>@endif</div>
@endforeach
<div class="card"><h2>Технологии и ссылки</h2><div class="grid">@foreach(['stack'=>'Технологии — одна на строку', 'platforms'=>'Платформы — одна на строку'] as $field=>$label)@php($items = old($field, $project->{$field} ?? []))<label class="field"><span>{{ $label }}</span><textarea name="{{ $field }}" rows="4">{{ is_array($items) ? implode("\n", $items) : $items }}</textarea></label>@endforeach</div><label class="field"><span>Ссылка на проект</span><input name="website" value="{{ old('website', $project->website) }}" maxlength="2048" placeholder="https://example.com"><small>Сайт, демо или репозиторий: HTTPS-ссылка или локальная страница, например /plantpal. Кнопка появится в карточке и на странице проекта. Оставьте поле пустым, чтобы скрыть её.</small></label></div>
<div class="card"><h2>Скриншоты и иллюстрации</h2><p class="muted">Первое изображение становится обложкой. JPG, PNG, WebP — до 5 МБ. Порядок и подписи сохраняются вместе с проектом.</p><label class="field" style="margin-top:18px"><span>Загрузить изображение</span><input id="upload" type="file" accept="image/jpeg,image/png,image/webp"></label><p id="upload-status" class="muted" role="status"></p>
<div id="screenshots">
@foreach(old('screenshots', $project->screenshots ?? []) as $i=>$shot)
<div class="shot"><div><img src="{{ $shot['src'] }}" alt="Предпросмотр изображения"><label class="check"><input type="checkbox" name="screenshots[{{ $i }}][remove]" value="1" @checked($shot['remove'] ?? false)>Убрать из галереи</label></div><div><label class="field"><span>Файл</span><input name="screenshots[{{ $i }}][src]" value="{{ $shot['src'] }}" readonly></label><div class="grid"><label class="field"><span>Порядок</span><input type="number" name="screenshots[{{ $i }}][position]" value="{{ $shot['position'] ?? $i*10 }}" min="0" max="10000"></label><label class="field"><span>Тип</span><select name="screenshots[{{ $i }}][kind]"><option value="screenshot" @selected(($shot['kind'] ?? 'screenshot') === 'screenshot')>Скриншот</option><option value="illustration" @selected(($shot['kind'] ?? '') === 'illustration')>Иллюстрация</option></select></label></div><label class="field"><span>Caption / alt — English</span><input name="screenshots[{{ $i }}][caption_en]" maxlength="500" value="{{ $shot['caption_en'] }}" required></label><label class="field"><span>Подпись — Русский</span><input name="screenshots[{{ $i }}][caption_ru]" maxlength="500" value="{{ $shot['caption_ru'] ?? '' }}"></label>@foreach(['zh'=>'中文', 'ko'=>'한국어', 'th'=>'ไทย', 'ja'=>'日本語'] as $code=>$captionLabel)<label class="field"><span>Подпись — {{ $captionLabel }}</span><input name="screenshots[{{ $i }}][caption_{{ $code }}]" maxlength="500" value="{{ $shot['caption_'.$code] ?? '' }}"></label>@endforeach</div></div>
@endforeach
</div></div>
<div class="savebar"><span class="muted">Все шесть языковых версий доступны на сайте</span><button class="primary" id="save-project" type="submit">Сохранить проект</button></div>
</form>
@if($project->exists)<form method="post" action="{{ route('admin.projects.destroy', $project) }}" style="margin-top:30px" onsubmit="return confirm('Убрать проект с сайта и переместить в архив? Его можно восстановить.')">@csrf @method('DELETE')<button class="danger">В архив</button></form>@endif
<template id="shot-template"><div class="shot"><div><img alt="Предпросмотр нового изображения"><label class="check"><input type="checkbox" name="screenshots[__INDEX__][remove]" value="1">Убрать из галереи</label></div><div><label class="field"><span>Файл</span><input data-src name="screenshots[__INDEX__][src]" readonly></label><div class="grid"><label class="field"><span>Порядок</span><input type="number" data-position name="screenshots[__INDEX__][position]" min="0" max="10000"></label><label class="field"><span>Тип</span><select name="screenshots[__INDEX__][kind]"><option value="screenshot">Скриншот</option><option value="illustration">Иллюстрация</option></select></label></div><label class="field"><span>Caption / alt — English</span><input data-caption name="screenshots[__INDEX__][caption_en]" maxlength="500" required></label><label class="field"><span>Подпись — Русский</span><input name="screenshots[__INDEX__][caption_ru]" maxlength="500"></label>@foreach(['zh'=>'中文', 'ko'=>'한국어', 'th'=>'ไทย', 'ja'=>'日本語'] as $code=>$captionLabel)<label class="field"><span>Подпись — {{ $captionLabel }}</span><input name="screenshots[__INDEX__][caption_{{ $code }}]" maxlength="500"></label>@endforeach</div></div></template>
@endsection
@push('scripts')
<script>
const form = document.getElementById('project-form');
let dirty = false;
form.addEventListener('input', () => { dirty = true; });
form.addEventListener('submit', () => { dirty = false; });
window.addEventListener('beforeunload', event => { if (dirty) { event.preventDefault(); event.returnValue = ''; } });
const uploader = document.getElementById('upload');
uploader.addEventListener('change', async () => {
 const file = uploader.files[0]; if (!file) return;
 const status = document.getElementById('upload-status');
 if (file.size > 5 * 1024 * 1024) { status.textContent = 'Файл больше 5 МБ.'; uploader.value = ''; return; }
 const save = document.getElementById('save-project'); save.disabled = true; uploader.disabled = true; status.textContent = 'Загружаем изображение…';
 try {
  const body = new FormData(); body.append('image', file);
  const response = await fetch('/admin/media', { method:'POST', body, credentials:'same-origin', headers:{'X-CSRF-TOKEN':document.querySelector('meta[name="csrf-token"]').content,'Accept':'application/json'} });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Не удалось загрузить изображение.');
  const target = document.getElementById('screenshots'); const index = target.children.length;
  const fragment = document.getElementById('shot-template').content.cloneNode(true);
  fragment.querySelectorAll('[name]').forEach(input => { input.name = input.name.replace('__INDEX__', index); });
  fragment.querySelector('img').src = data.src; fragment.querySelector('[data-src]').value = data.src; fragment.querySelector('[data-position]').value = index * 10;
  target.appendChild(fragment); dirty = true; status.textContent = 'Изображение загружено. Добавьте английскую подпись и сохраните проект.';
  target.lastElementChild.querySelector('[data-caption]').focus();
 } catch (error) { status.textContent = error.message || 'Ошибка загрузки. Попробуйте ещё раз.'; }
 finally { save.disabled = false; uploader.disabled = false; uploader.value = ''; }
});
</script>
@endpush
