<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Files extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = ['deleted_at'];

    protected $fillable = [
        'name',
        'description',
        'file_date',
        'up_date',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function categories()
    {
        return $this->belongsToMany(Categories::class);
    }
}
