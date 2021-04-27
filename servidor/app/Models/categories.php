<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Categories extends Model
{
    use HasFactory,SoftDeletes;
    protected $guarded =['deleted_at'];
    protected $fillable = [
        'name',
        'categorie_id',
        'user_id',
    ];

    public function files()
    {
        return $this->belongsToMany(Files::class);
    }

}
