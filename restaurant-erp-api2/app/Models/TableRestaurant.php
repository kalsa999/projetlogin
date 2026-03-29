<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TableRestaurant extends Model
{
    use HasFactory;

    protected $fillable = ['numero', 'capacite', 'statut'];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

    public function commandes()
    {
        return $this->hasMany(Commande::class);
    }
}
