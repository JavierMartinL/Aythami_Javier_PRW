<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\File;


class Category extends Model
{
    use HasFactory,SoftDeletes;

    protected $guarded =['deleted_at'];

    protected $fillable = [
        'name',
        'categorie_id',
        'user_id',
    ];

    public function file()
    {
        return $this->hasManyThrough(
            // required
            'App\Models\File', // the related model
            'App\Models\category_files', // the pivot model

            // optional
            'category_id', // the current model id in the pivot
            'id', // the id of related model
            'id', // the id of current model
            'file_id' // the related model id in the pivot
        );
    }
}
