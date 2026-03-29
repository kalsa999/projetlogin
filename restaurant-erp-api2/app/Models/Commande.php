<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;

    protected $fillable = [
        'statut', 'type', 'dateCreation', 'total',
        'client_id', 'table_restaurant_id'
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function lignes()
    {
        return $this->hasMany(LigneCommande::class);
    }

    public function paiement()
    {
        return $this->hasOne(Paiement::class);
    }
}
