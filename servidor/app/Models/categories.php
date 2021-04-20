<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class categories extends Model
{
    use HasFactory,SoftDeletes;
    protected $guarded =['deleted_at'];
    protected $fillable = [
        'name',
        'categorie_id',
        'user_id',
    ];
}
