<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommandeFournisseur extends Model
{
    use HasFactory;

    protected $fillable = ['date', 'statut', 'fournisseur_id'];

    public function fournisseur()
    {
        return $this->belongsTo(Fournisseur::class);
    }

    public function lignes()
    {
        return $this->hasMany(LigneCommandeFournisseur::class);
    }
}
