<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MouvementStock extends Model
{
    use HasFactory;

    protected $fillable = ['type', 'quantite', 'date', 'ingredient_id'];

    public function ingredient()
    {
        return $this->belongsTo(Ingredient::class);
    }
}
