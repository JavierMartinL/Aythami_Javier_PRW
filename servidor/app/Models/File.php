<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Category;

class File extends Model
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
        return $this->hasManyThrough(
            // required
            'App\Models\Category', // the related model
            'App\Models\category_files', // the pivot model
            // optional
            'File_id', // the current model id in the pivot
            'id', // the id of related model
            'id', // the id of current model
            'category_id' // the related model id in the pivot
        );

    }
}
