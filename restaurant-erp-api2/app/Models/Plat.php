<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plat extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom', 'description', 'prix', 'disponibilite', 'categorie_id'
    ];

    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }

    public function ingredients()
    {
        return $this->belongsToMany(Ingredient::class)
            ->withPivot('quantite')
            ->withTimestamps();
    }

    public function lignesCommandes()
    {
        return $this->hasMany(LigneCommande::class);
    }

    public function avis()
    {
        return $this->hasMany(Avis::class);
    }
}
