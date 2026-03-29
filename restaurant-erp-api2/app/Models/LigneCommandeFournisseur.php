<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LigneCommandeFournisseur extends Model
{
    use HasFactory;

    protected $fillable = [
        'commande_fournisseur_id', 'ingredient_id',
        'quantite', 'prix'
    ];

    public function commande()
    {
        return $this->belongsTo(CommandeFournisseur::class);
    }

    public function ingredient()
    {
        return $this->belongsTo(Ingredient::class);
    }
}
