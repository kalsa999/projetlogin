<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avis extends Model
{
    use HasFactory;

    protected $fillable = [
        'note', 'commentaire', 'date', 'client_id', 'plat_id'
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function plat()
    {
        return $this->belongsTo(Plat::class);
    }
}
