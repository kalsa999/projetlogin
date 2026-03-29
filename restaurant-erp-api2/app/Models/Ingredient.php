<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom', 'unite', 'quantiteDisponible', 'seuilAlerte'
    ];

    public function plats()
    {
        return $this->belongsToMany(Plat::class)
            ->withPivot('quantite');
    }

    public function mouvements()
    {
        return $this->hasMany(MouvementStock::class);
    }
}
