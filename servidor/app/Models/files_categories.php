<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class files_categories extends Model
{
    use HasFactory, SoftDeletes ;
    protected $guarded =['deleted_at'];
    protected $fillable = [
        'categorie_id',
        'files_id',
    ];
}
