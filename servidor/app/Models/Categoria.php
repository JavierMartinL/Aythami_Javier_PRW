<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;
    protected $guarded = ['deleted_at'];

    protected $fillable = [
        'name',
        'user_id',
        'categorias'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function archivos()
    {
        return $this->belongsToMany(Archivo::class);
    }
}
