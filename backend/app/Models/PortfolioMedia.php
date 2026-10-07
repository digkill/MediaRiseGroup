<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioMedia extends Model
{
    protected $table = 'portfolio_media';

    protected $primaryKey = 'hash';

    public $incrementing = false;

    protected $keyType = 'string';

    protected $guarded = [];

    protected $hidden = ['content'];
}
